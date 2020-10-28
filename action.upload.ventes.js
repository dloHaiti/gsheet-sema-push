
// Upload sales
function uploadSaleRange() {
  try {
    // Request line range
    var betweenLine = _prompt("What range, or lines, to upload?", "Format: [START_LINE, END_LINE]").split(",");
    // sales data
    var data = spreadsheetToJson({
      sheetName: "VENTES",
      rowBetween: [parseInt(betweenLine[0], 10), parseInt(betweenLine[1], 10)]
    });
    // Getting our sales into receipt
    var receipts = data.map((sale) => _createReceiptFromVentes(sale))
      // filter empty sale lines.
      .filter((receipt) => {
        return (receipt.customer_id && receipt.customer_id.length) || (receipt.quantity && receipt.total) || (receipt.receipt_uuid && receipt.receipt_uuid.length);
      });
    // Upload receipts to sema
    var result = _fetch("POST", API_POST_SALE_ENDPOINT, receipts);
    // TODO: Test Log uuid of each receipt on success
    result.forEach(function (receipt, index) {
      // update uuid
      updatePosition({
        sheetName: "VENTES",
        data: receipt.uuid,
        x: receipts[index].line_number,
        y: 16
      });
      // update updated_at
      updatePosition({
        sheetName: "VENTES",
        data: receipt.updated_at,
        x: receipts[index].line_number,
        y: 17
      });
    });
    console.log(data);
  } catch (err) {
    _log(err.message);
    _toast(err.message);
  }
}
