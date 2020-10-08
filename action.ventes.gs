
function uploadSaleRange() {
    // Request line range
    var betweenLine = _prompt("What range, or lines, to upload?", "Fomat: [START_LINE, END_LINE]").split(",");
    // sales data
    var data = spreadsheetToJson({
      sheetName: "VENTES",
      rowBetween: [parseInt(betweenLine[0], 10), parseInt(betweenLine[1], 10)]
    });
    // Getting our sales into receipt
    var receipts = data.map((sale) => _createReceiptFromVentes(sale));
    // Upload receipts to sema
    var result = _fetch("POST", API_SALE_ENDPOINT, receipts);
    // Log uuid of each receipt on success
    data.forEach(function(receipt, index){
        data[index]['receiptUuid'] = receipt.uuid;
        data[index]['receiptUuid'] = receipt.updated_at; 
    });
  }
  