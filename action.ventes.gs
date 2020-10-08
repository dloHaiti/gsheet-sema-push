
function uploadSaleRange() {
  // Request line range
  var betweenLine = _prompt("What range, lines, to upload?", "Fomat: [START_LINE, END_LINE]").split(",");
  // sales data
  var data = spreadsheetToJson({
    sheetName: "VENTES",
    rowBetween: [0, 10]
  });

  console.log(data);
}
