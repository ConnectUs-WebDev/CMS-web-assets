function onOpen(e) {
  const ui = SpreadsheetApp.getUi(); // Or DocumentApp.getUi() or FormApp.getUi()
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(); // Or getActiveDocument(), getActiveForm()
  const ownerEmail = activeSpreadsheet.getOwner().getEmail();
  const userEmail = Session.getActiveUser().getEmail();

  // Add owner-specific items conditionally
  if (ownerEmail === userEmail) {
    const menu = ui.createMenu('Run');
    menu.addItem('Initialize Sheet', 'initializeSheets');
    menu.addToUi();
  }
}

function initializeSheets() {
  const ui = SpreadsheetApp.getUi(); 
  const monthPrompt = ui.prompt(
      'Enter the Month to Initialize',
      'Please type the month as a number:',
      ui.ButtonSet.OK_CANCEL);

  if (monthPrompt.getSelectedButton() != ui.Button.OK || !monthPrompt.getResponseText()){
    return false
  }

  const yearPrompt = ui.prompt(
      'Enter the Year to Initialize',
      'Please type the FULL YEAR:',
      ui.ButtonSet.OK_CANCEL);

  if (yearPrompt.getSelectedButton() != ui.Button.OK || !yearPrompt.getResponseText()){
    return false
  }

  const month = parseInt(monthPrompt.getResponseText());
  const currentYear = parseInt(yearPrompt.getResponseText());
  const newDate = new Date(currentYear, month-1, 1);

  const sheetList = SpreadsheetApp.getActiveSpreadsheet().getSheets();

  populateMonthlySheet(newDate, sheetList);
  populateWeeklySheet(newDate, sheetList);
  setProjectCoverage(newDate, sheetList);
}

function populateMonthlySheet(date, sheetList) {
  const sheet = sheetList[0];
  const startRow = 3; // Row where names start (e.g., Kazz)
  const endRow = 62; // Row where Name50 is located
  const startCol = 3; // Column C (first Epi column)
  const endCol = 12; // Column L (last PTA column)
  const totalHoursCol = 2; // Column B for Total Hours
  const headerRow = 2; // Row containing CAI, CMS, etc.

  // Update Name
  const newSheetName = rewriteName_(sheet.getName(), date, Session.getScriptTimeZone());
  sheet.setName(newSheetName);

  // Loop through each row for each name
  for (let row = startRow; row <= endRow; row++) {
    // Set the formula for "Total Hours" (column B)
    const totalHoursFormula = `=SUM(C${row}:L${row})`;
    sheet.getRange(row, totalHoursCol).setFormula(totalHoursFormula);

    // Loop through each column for Epi to PTA
    for (let col = startCol; col <= endCol; col++) {
      const tableNameCell = sheet.getRange(headerRow, col).getA1Notation(); // e.g., $C$3
      const nameCell = sheet.getRange(row, 1).getA1Notation(); // e.g., $A$4
      const targetCell = sheet.getRange(row, col).getA1Notation(); // Target cell for the formula

      // Create the SUMIFS formula
      const formula = `=SUMIFS(INDIRECT("'" & ${tableNameCell} & "'!E:E"), INDIRECT("'" & ${tableNameCell} & "'!C:C"), ${nameCell})`;

      // Set the formula in the target cell
      sheet.getRange(targetCell).setFormula(formula);
    }
  }
}

function populateWeeklySheet(date, sheetList) {
  const sheet = sheetList[1]; // Get Sheet in 2nd position

  // Update sheet Name
  const newSheetName = rewriteName_(sheet.getName(),date, Session.getScriptTimeZone());
  sheet.setName(newSheetName);

  // Update sheet coverage
  const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
  const monthText = Utilities.formatDate(date, Session.getScriptTimeZone(), "MMM");
  const coverage = `${monthText} 1-${lastDay}`;
  sheet.getRange("B2").setValue(coverage);
  
  // Get all campaign names
  let tables = [];
  for (let i=2; i<sheetList.length; i++) {
    tables.push(sheetList[i].getName());
  }
  
  // Set starting and ending rows of each week
  let weeks = [];
  const startCol = 2; // Column B
  const endCol = 8;  // Column H
  for (let week = 1; week <= 5; week++){
    if (week != 5){
      weeks.push({startRow: findRowByValue("Week "+String(week), sheet)+1, endRow: findRowByValue("Week "+String(week+1), sheet)-1});
    }
    else {
      weeks.push({startRow: findRowByValue("Week 5", sheet)+1, endRow: findLastEmptyRowInColumn(sheet, 1)})
    }
  }

  // Get dates of the current month arranged as a calendar grid
  const dates = getDatesThisMonth(date.getFullYear(), date.getMonth());
  let weekCounter = 0; // Index counter for the dates array

  for (const range of weeks){
    const headerRow = range.startRow-1; // Get date row of the week

    // Set date values of the week
    const dateHeaders = sheet.getRange(headerRow, 2, 1, 7);
    dateHeaders.setValues([dates[weekCounter]]);
    dateHeaders.setNumberFormat("MMM d");
    weekCounter++;

    // Set formulas for each team member for the week
    for (let row = range.startRow; row <= range.endRow; row++) {
      const nameRef = `A${row}`;
      for (let col = startCol; col <= endCol; col++) {
        const dateRef = `${String.fromCharCode(64 + col)}${headerRow}`; // Convert column number to letter
        const cell = sheet.getRange(row, col);
        
        const formulaParts = tables.map(table =>
          `SUMIFS(${table}!E:E, ${table}!C:C, ${nameRef}, ${table}!D:D, ${dateRef})`
        );
        const formula = `=${formulaParts.join(" + ")}`;

        cell.setFormula(formula);
      }
    }
  }

  SpreadsheetApp.flush(); // Forces Sheets to render and recalculate
}

function setProjectCoverage(date, sheetList) {
  const month = Utilities.formatDate(date, Session.getScriptTimeZone(), "MMMM")
  const coverage = `${month} ${date.getFullYear()}`;
  for (let i=2; i < sheetList.length; i++) {
    sheetList[i].getRange("B4").setValue(coverage);
  }
}
