
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

// Update sales
// function loadSaleRangeFromSema(properties) {
//   // Sales endpoint
//   const API_SALE_ENDPOINT = '/sema/site/receipts';
//   // Sale sheet
//   const sheet = SpreadsheetApp.getActive().getSheetByName('AllSales');
  
//   try {
//     // Get receipts from sema
//     properties = Object.assign({}, DEFAULT_PROPERTIES, properties);
//     const receipts = _fetch('get', API_SALE_ENDPOINT, properties);
//     // normalize from receipts to sale lines
//     const sales = [];
//     const sale = null;
//     receipts.forEach(function(receipt, ind, arr){
//       // Make sales line from receipt line items sales
//       sale = getSalesFromReceipts(receipt);
//       if(sale){
//         sales.push(sale);
//       }
//     });
//     // Add header to sales output
//     sales.unshift(getHead());
//     // Clear and get range from sheet
//     // getRange(LINE, COLUMN)
//     var range = sheet.clear().getRange(1, 1, sales.length, (sales[0]).length);
//     // save to drive
//     saveToDrive("sales.json", sales);
//     // update sale range
//     range.setValues(sales);
//     // toast success
//     _toast("Done");
//   }catch(err){
//     console.log(err.message);
//   }
// }


// function getHead(){
//   return [
//       "Kiosk",
//       "Date",
//       "Customer ID",
//       "Customer Name",	
//       "Sales Channel",
//       "SKU",
//       "Qty",
//       "Gallons",
//       "Total",
//       "Credit",
//     ];
// }

// function getSalesFromReceipts(receipt){
//   // Skip empty receipt
//   if((receipt.receipt_line_items && receipt.receipt_line_items.length)){
//     // Get sale data from line item
//     var formattedLineItem = formatReceiptLineItem(receipt, 0);
//     // Create sale line for receipt
//     return [
//       // 1. kiosk
//       receipt.kiosk.name,
//       // 2. date
//       new Date(receipt.created_at).toDateString(),
//       // 3. customer id
//       receipt.customer_account.id,
//       // 4. customer name
//       receipt.customer_account.name,
//       // 5. sales channel
//       receipt.sales_channel.name, 
//       // 6. sku // TODO: Should print all line items form receipt
//       formattedLineItem.sku,
//       // 7. quantity
//       formattedLineItem.quantity,
//       // 8. gallons
//       formattedLineItem.gallons,
//       // 10. total
//       formattedLineItem.total,
//       // 9. credit
//       formattedLineItem.credit
//     ];
//   };
// }

// function formatReceiptLineItem(receipt, ind) {
//   // Reference to current index line on receipt
//   const receipt_line_item = receipt.receipt_line_items[ind];
//   const formattedReceiptLineItem = {};
  
//   formattedLineItem.sku = receipt_line_item.product.sku;
//   if(formattedReceiptLineItem.sku && (formattedReceiptLineItem.sku=="LOANPAYOFF")){
//     formattedReceiptLineItem.quantity = 0;
//     formattedReceiptLineItem.gallons = 0;
//     formattedReceiptLineItem.total = 0;
//     formattedReceiptLineItem.credit = receipt.amount_cash ? parseFloat(receipt.amount_cash, 10) : 0;
//   }
//   else{
//     formattedReceiptLineItem.quantity = parseFloat((receipt_line_item).quantity, 10);
//     formattedReceiptLineItem.gallons = parseFloat(receipt_line_item.product.unit_per_product, 10) * parseFloat(receipt_line_item.quantity, 10);
//     formattedReceiptLineItem.total = parseFloat(receipt_line_item.price_total, 10);
//     formattedReceiptLineItem.credit = receipt.amount_loan ? parseFloat(receipt.amount_loan, 10) : 0;
//   }
//   return formattedReceiptLineItem;
// }