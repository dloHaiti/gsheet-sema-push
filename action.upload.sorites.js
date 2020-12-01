
function uploadSortiesRange() {
  // Request line range
  const betweenLine = _prompt("What range, or lines, to upload?", "Format: [START_LINE, END_LINE]").split(",");
  // sales data
  const data = spreadsheetToJson({
    sheetName: "SORTIES",
    rowBetween: betweenLine
  });
  // Getting our sales into receipt
  const expenses = data.map((expense) => _createExpenseFromSorties(expense));
  // Upload receipts to sema
  var _expenses = _fetch("POST", API_POST_EXPENSE_ENDPOINT, expenses);
  // TODO: Test Log uuid of each receipt on success
  _expenses.forEach(function (expense, index) {
    // update uuid
    updatePosition({
      sheetName: "SORTIES",
      data: expense.uuid,
      x: data[index].line_number,
      y: 8
    });
    // update updated_at
    updatePosition({
      sheetName: "SORTIES",
      data: expense.updated_at,
      x: data[index].line_number,
      y: 9
    });
  });

  console.log(data);

}