
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




// // Update expenses
// function expenses() {
//     // Expense endpoint
//     var API_EXPENSE_ENDPOINT = '/sema/site/expenses';
//     // Expenses sheet
//     var sheet = SpreadsheetApp.getActive().getSheetByName('AllExpenses');
//     // Get expenses from sema
//     var expenses = _fetch('get', API_EXPENSE_ENDPOINT, null);
//     // normalize expenses to expense line
//     expenses = expenses.map(function(exp, ind, arr){
//       return [
//         // 1. kiosk 
//         exp.kiosk.name,
//         // 2. date
//         new Date(exp.created_at),
//         // 3. no account id
//         " ",
//         // 4. amount
//         parseInt(exp.total, 10),
//         // 5. description/note
//         exp.note || "", 
//         // 6. sub-category
//         exp.expense_account.category,
//         // 7. category
//         exp.expense_account.name
//       ];
//     });
//     // Add header to expenses
//     expenses.unshift([
//       "Kiosk",
//       "Date",
//       "Account #",
//       "Total",
//       "Description",
//       "Category",
//       "Sub Category"
//     ]);
//     // Get range for updated expenses; getRange(LINE, COLUMN)
//     var range = sheet.getRange(1, 1, expenses.length, (expenses[0]).length);
//     // update range
//     range.setValues(expenses);
//   }
  