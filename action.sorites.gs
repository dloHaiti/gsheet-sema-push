
function uploadSortiesRange() {

    // Request line range
    var betweenLine = [2105, 2108];
    // var betweenLine = _prompt("What range, or lines, to upload?", "Fomat: [START_LINE, END_LINE]").split(",");
    // sales data
    var data = spreadsheetToJson({
        sheetName: "SORTIES",
        rowBetween: betweenLine
    });

    console.log(data);
    
}


// Update expenses
function updateExpenseFromSema() {
  var expenses = _fetch('GET', API_EXPENSE_ENDPOINT, null);
  // normalize expenses to expense line
  expenses = expenses.map(function(expense, ind, arr){
    return [
      // 1. kiosk 
      expense.kiosk.name,
      // 2. date
      new Date(expense.created_at),
      // 3. no account id
      " ",
      // 4. amount
      parseInt(expense.total, 10),
      // 5. description/note
      expense.note || "", 
      // 6. sub-category
      expense.expense_account.category,
      // 7. category
      expense.expense_account.name
    ];
  });
  // Add header to expenses
  expenses.unshift([
    "Kiosk",
    "Date",
    "Account #",
    "Total",
    "Description",
    "Category",
    "Sub Category"
  ]);
  // Get range for updated expenses; getRange(LINE, COLUMN)
  var range = sheet.getRange(1, 1, expenses.length, (expenses[0]).length);
  // update range
  range.setValues(expenses);
}
