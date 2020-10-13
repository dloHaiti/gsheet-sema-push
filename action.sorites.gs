
function uploadSortiesRange() {

    // Request line range
    var betweenLine = _prompt("What range, or lines, to upload?", "Fomat: [START_LINE, END_LINE]").split(",");
    // sales data
    var data = spreadsheetToJson({
        sheetName: "SORTIES",
        rowBetween: betweenLine
    });

    console.log(data);
    
}


// Update expenses
function updateExpenseFromSema() {
  var expenses = _fetch('GET', API_GET_EXPENSE_ENDPOINT, null);
  // normalize expenses to expense line
  expenses = expenses.map(function(expense, ind, arr){
    return [
      expense.kiosk.name, new Date(expense.created_at),  " ", parseInt(expense.total, 10), expense.note || "", expense.expense_account.category, expense.expense_account.name
    ];
  });
  // Add header to expenses
  expenses.unshift([
    "Kiosk", "Date", "Account #", "Total", "Description", "Category", "Sub Category"
  ]);
  // Update expenses in Expenses sheet
  jsonToSpreadsheet({
    sheetName: "Test",
    data: expenses
  });
  
}
