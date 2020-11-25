
function uploadSortiesRange() {
  // Request line range
  const betweenLine = _prompt("What range, or lines, to upload?", "Format: [START_LINE, END_LINE]").split(",");
  // sales data
  const sorties = spreadsheetToJson({
    sheetName: "SORTIES",
    rowBetween: betweenLine
  });
  // TODO: Use _createExpenseFromSorties

  console.log(data);

}
