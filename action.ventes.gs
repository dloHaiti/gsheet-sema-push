
function uploadSaleRange() {
    // Request line range
    var betweenLine = _prompt("What range, or lines, to upload?", "Fomat: [START_LINE, END_LINE]").split(",");
    // sales data
    var data = spreadsheetToJson({
      sheetName: "VENTES",
      rowBetween: [parseInt(betweenLine[0], 10), parseInt(betweenLine[1], 10)]
    });
  
    console.log(data);
  }
  