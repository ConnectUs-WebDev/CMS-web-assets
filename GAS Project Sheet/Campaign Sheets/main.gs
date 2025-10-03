function onOpen(e) {
  const ui = SpreadsheetApp.getUi(); // Or DocumentApp.getUi() or FormApp.getUi()
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(); // Or getActiveDocument(), getActiveForm()
  const ownerEmail = activeSpreadsheet.getOwner().getEmail();
  const userEmail = Session.getActiveUser().getEmail();

  // Add owner-specific items conditionally
  if (true/*ownerEmail === userEmail*/) {
    const menu = ui.createMenu('Run');
    menu.addItem('Initialize Sheets', 'initializeSheets');
    menu.addToUi();
  }
}

function initializeSheets(){
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
  const newDate = new Date(currentYear, month-1, 5);
  
  // Get dates of the current month arranged as a calendar grid
  const calendar = getDatesThisMonth(newDate.getFullYear(), newDate.getMonth());

  const sheetList = getSheetsInFolder();
  if (sheetList) {
    sheetList.forEach(function(sheet) {
      Logger.log("Name: " + sheet.name + ", ID: " + sheet.id);
      const spreadsheet = SpreadsheetApp.openById(sheet.id);
      try {
        populateWeeklySheet(spreadsheet, newDate, calendar);
      } catch (e) {
        Logger.log(`Skipped due to Error: ${e}`);
      }
    });
  }
}

function populateWeeklySheet(activeSheet, date, calendar) {
  const teamHoursSheet = activeSheet.getSheetByName("Team Hours"); // Check for trailing space in name
  const projectSheet = activeSheet.getSheets()[0];

  const newSheetName = rewriteName_(projectSheet.getName(),date, Session.getScriptTimeZone());
  projectSheet.setName(newSheetName);

  if (teamHoursSheet){
    // Update sheet coverage
    const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    const monthText = Utilities.formatDate(date, Session.getScriptTimeZone(), "MMM");
    const coverage = `${monthText} 1-${lastDay}`;
    teamHoursSheet.getRange("B2").setValue(coverage);

    let weeks = [];
    const startCol = 2; // Column B
    const endCol = 8;  // Column H

    for (let week = 1; week <= 5; week++){
      if (week != 5){
        weeks.push({startRow: findRowByValue("Week "+String(week), teamHoursSheet)+1, endRow: findRowByValue("Week "+String(week+1), teamHoursSheet)-1});
      }
      else {
        weeks.push({startRow: findRowByValue("Week 5", teamHoursSheet)+1, endRow: findLastEmptyRowInColumn(teamHoursSheet, 1)})
      }
    }

    let tables = [activeSheet.getSheets()[0].getName()];

    let weekCounter = 0; // Index counter for the dates array

    for (const range of weeks){
      const headerRow = range.startRow-1;

      // Set date values of the week
      const dateHeaders = teamHoursSheet.getRange(headerRow, 2, 1, 7);
      dateHeaders.setValues([calendar[weekCounter]]);
      dateHeaders.setNumberFormat("MMM d");
      weekCounter++;

      for (let row = range.startRow; row <= range.endRow; row++) {
        const nameRef = `A${row}`;
        for (let col = startCol; col <= endCol; col++) {
          const dateRef = `${colToLetter(col)}${headerRow}`;
          const cell = teamHoursSheet.getRange(row, col);

          const formulaParts = tables.map(table =>
            `SUMIFS('${table}'!E:E, '${table}'!C:C, ${nameRef}, '${table}'!D:D, ${dateRef})`
          );
          const formula = `=${formulaParts.join(" + ")}`;

          cell.setFormula(formula);
        }
    }
    }

    SpreadsheetApp.flush(); // Ensures formulas are calculated/rendered
  }
}
