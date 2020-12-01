
function uploadSortiesRange() {
  // Request line range
  const betweenLine = _prompt("What range, or lines, to upload?", "Format: [START_LINE, END_LINE]").split(",");
  // sales data
  const sorties = spreadsheetToJson({
    sheetName: "SORTIES",
    rowBetween: betweenLine
  });
  // TODO: Use _createExpenseFromSorties
  const expenses = _createExpenseFromSorties(sorties);
  // Upload receipts to sema
  var _expenses = _fetch("POST", API_POST_SALE_ENDPOINT, expenses);
  // TODO: Test Log uuid of each receipt on success
  _expenses.forEach(function (expense, index) {
    // update uuid
    updatePosition({
      sheetName: "SORTIES",
      data: expense.uuid,
      x: sorties[index].line_number,
      y: 8
    });
    // update updated_at
    updatePosition({
      sheetName: "SORTIES",
      data: expense.updated_at,
      x: sorties[index].line_number,
      y: 9
    });
  });

  console.log(data);

}