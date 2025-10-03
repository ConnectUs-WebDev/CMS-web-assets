function findRowByValue(searchValue, sheet) {
  if (!sheet) {
    Logger.log("Sheet not found: " + sheetName);
    return null;
  }

  const textFinder = sheet.createTextFinder(searchValue);
  const foundRange = textFinder.findNext(); // Finds the first occurrence

  if (foundRange) {
    return foundRange.getRow(); // Returns the row number
  } else {
    Logger.log("Value '" + searchValue + "' not found in sheet '" + sheetName + "'.");
    return null;
  }
}

function findLastEmptyRowInColumn(sheet, columnNumber) {
  if (!sheet) {
    Logger.log("Sheet not found: " + sheetName);
    return -1; // Indicate an error or sheet not found
  }

  const lastRow = sheet.getLastRow(); // Get the last row with content
  const columnRange = sheet.getRange(1, columnNumber, lastRow, 1);
  const values = columnRange.getValues();

  // Iterate from the bottom up to find the last empty cell
  for (let i = values.length - 1; i >= 0; i--) {
    if (values[i][0] === "") { // Check if the cell is empty
      return i + 1; // Return the row number (1-indexed)
    }
  }
}

function getSheetsInFolder() {
  const ui = SpreadsheetApp.getUi(); 
  const folderId = ui.prompt(
      'Enter the Folder ID',
      'Please type Gdrive folder ID in the box below:',
      ui.ButtonSet.OK_CANCEL);

  if (folderId.getSelectedButton() != ui.Button.OK){
    return false
  }

  // Get the folder by its ID.
  const folder = DriveApp.getFolderById(folderId.getResponseText());

  // Get all files within the folder.
  const files = folder.getFiles();

  // Create an array to store the names and IDs of the Google Sheets.
  let sheetInfo = [];

  // Iterate through the files.
  while (files.hasNext()) {
    const file = files.next();

    // Check if the file is a Google Sheet (MIME type for Google Sheets).
    if (file.getMimeType() === MimeType.GOOGLE_SHEETS) {
      sheetInfo.push({
        name: file.getName(),
        id: file.getId()
      });
    }
  }

  // Log the information about the found Google Sheets.
  Logger.log("Google Sheets in folder '" + folder.getName() + "':");
  sheetInfo.forEach(function(sheet) {
    Logger.log("Name: " + sheet.name + ", ID: " + sheet.id);
  });

  return sheetInfo;
}

function getSheetNameByIndex(index){
  
}

// Converts a column number to its Excel-style letter (e.g., 2 → B)
function colToLetter(col) {
  let temp = "";
  while (col > 0) {
    let remainder = (col - 1) % 26;
    temp = String.fromCharCode(65 + remainder) + temp;
    col = Math.floor((col - 1) / 26);
  }
  return temp;
}

function getDatesThisMonth(year, monthIndex) {
  // Prepare a 6x7 matrix
  const grid = Array.from({ length: 6 }, () => Array(7).fill("-"));

  const first = new Date(year, monthIndex, 1);
  const firstDow = first.getDay(); // 0=Sun..6=Sat
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  Logger.log(daysInMonth);
  Logger.log(monthIndex);

  let r = 0, c = firstDow;
  for (let d = 1; d <= daysInMonth; d++) {
    grid[r][c] = Utilities.formatDate(new Date(year, monthIndex, d), Session.getScriptTimeZone(), "M/d/yyyy");
    c++;
    if (c === 7) { c = 0; r++; if (r === 6) break; }
  }

  return grid;
}

function rewriteName_(name, now, tz) {
  const monthPattern = '(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)';
  const yearPattern = '(19\\d{2}|20\\d{2})';
  const re = new RegExp(monthPattern + '\\s+' + yearPattern, 'gi');

  return name.replace(re, function (match, m, y) {
    const abbr = (m.length <= 3) || /^sept?$/i.test(m); // "Sep" or "Sept"
    const fmt = abbr ? 'MMM yyyy' : 'MMMM yyyy';
    return Utilities.formatDate(now, tz, fmt);
  });
}