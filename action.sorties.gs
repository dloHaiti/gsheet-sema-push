
function uploadSortiesRange() {
  
  // Request line range
  var INPUT = _prompt("What range, lines, to upload?", "Fomat: [START_LINE, END_LINE]");
  
  var START_LINE = INPUT[0];
  var END_LINE = INPUT[1];
  
  _toast("START_LINE: " + START_LINE);
  _toast("END_LINE: " + END_LINE);
  
  var sheet = SpreadsheetApp.getActive().getSheetByName('SORTIES');
  
  // Date (1) | Description/Note (2) | Total (3) | Notes (4) | Expense_id (6) | Uuid (7)
  
  var SCRIPT = "SORTIES";
  var DATE_INDEX = 1;
  var DESCRIPTION_INDEX = 2;
  var TOTAL_INDEX = 3;
  var NOTE_INDEX = 4;
  var EXPENSE_ID_INDEX = 6;
  var EXPENSE_UUID_INDEX = 7;
  var UPDATED_AT_INDEX = 8;
  var KIOSK_ID = 1; // Saintard
  var USER_ID = 7;
  
  var API_ENDPOINT = "https://api.haiti.semawater.mooo.com" + '/sema/site/expenses/bulk'
  var FILE_BASE_NAME = SpreadsheetApp.getActiveSpreadsheet().getName() + " " + sheet;
  var FILE_NAME =  FILE_BASE_NAME + ", SORTIES: " + START_LINE +": " + END_LINE;
  
  // Get Soties lines range 
  var sorties = getSortieRange(START_LINE, END_LINE);
  // Get Sorties to Expenses (spported by sema)
  var expenses = sorties.map(function(sortie){
    return createExpenseFromSorties(sortie);
  });
  // Save in expenses format
  // saveToDrive(FILE_NAME, expenses);
  // submitToSema(API_ENDPOINT, expenses, sheet, EXPENSE_UUID_INDEX, UPDATED_AT_INDEX);
  _log(JSON.parse(expenses));
  
  
  function createExpenseFromSorties(sortie) {
    return {
      created_t: sortie.date,
      notes: sortie.notes,
      total: sortie.total,
      expense_account_id: sortie.expenseId,
      kiosk_id: KIOSK_ID,
      user_id: USER_ID,
      uuid: sortie.expenseUuid,
      lineNumber: sortie.lineNumber
    };
  }
  
  
  // sema sales export
  function getSortieRange(START_LINE, END_LINE){
    // Row count
    var lineCount = END_LINE - START_LINE;
    // Get working range as array
    var range = sheet.getRange(START_LINE, 1, lineCount, 26).getValues();
    // result to be returned
    var result = [];
    for(var i=0,len=range.length; i<len; i++){
      var sortieLine = getSortieDataLine(range[i]);
      // Add sortie to result IF it is valid
      if(sortieLine){
        result.push(sortieLine);
      }
      // Log progress
      var log = (i + 1).toString() + " / " + (lineCount).toString();
      _log(log);
    }
    return result;
  }
  
  
  function getSortieDataLine(row)
  {
    var sortieLine = {
      date: row[DATE_INDEX-1],   // sheet.getRange(lineNumber, DATE_INDEX).getValues()[0][0],
      notes: row[DESCRIPTION_INDEX - 1],   //sheet.getRange(lineNumber, DESCRIPTION_INDEX).getValues()[0][0] + ": " + sheet.getRange(lineNumber, NOTE_INDEX).getValues()[0][0],
      expenseId: row[EXPENSE_ID_INDEX - 1], //sheet.getRange(lineNumber, EXPENSE_ID_INDEX).getValues()[0][0],
      expenseUuid: row[EXPENSE_UUID_INDEX - 1], // sheet.getRange(lineNumber, EXPENSE_UUID_INDEX).getValues()[0][0],
      total: row[TOTAL_INDEX - 1], // sheet.getRange(lineNumber, TOTAL_INDEX).getValues()[0][0],
      lineNumber: lineNumber
    };
    // Reformat date
    sortieLine.date = sortieLine.date ? new Date(sortieLine.date.toDateString()) : null;
    // Validate line if line has 'customerName', `quantity`, `total` OR `receiptId`.
    var validLine = (sortieLine.date && sortieLine.date.length) || (sortieLine.total) || (sortieLine.expenseId && sortieLine.expenseId.length) || (sortieLine.expenseUuid && sortieLine.expenseUuid.length);
    // returned valid line or null
    return (validLine ? sortieLine : null);
  };

}
