
  function uploadSaleRange() {
    try {
      // Request line range
      var betweenLine = [2105, 2108];
      // var betweenLine = _prompt("What range, or lines, to upload?", "Fomat: [START_LINE, END_LINE]").split(",");
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
      result.forEach(function(receipt, index){
        data[betweenLine[0] + index]['receipt_uuid'] = receipt.uuid;
        data[betweenLine[0] + index]['updated_at'] = receipt.updated_at; 
      });
    console.log(data);
    } catch(err){
      _log(err.message);
      _toast(err.message);
    }
    }
    
  
  

//   // Update sales
// function sales(properties) {
  
//   // Sales endpoint
//   var API_SALE_ENDPOINT = '/sema/site/receipts';
//   // Sale sheet
//   var sheet = SpreadsheetApp.getActive().getSheetByName('AllSales');
  
//   try {
//     // Get receipts from sema
//     var receipts = _fetch('GET', API_GET_SALE_ENDPOINT, properties);
//     // clear sale sheet
//     sheet.clear();
//     // normalize from receipts to sale lines
//     var sales = [];
//     receipts.forEach(function(receipt, ind, arr){
//       // Make sales line from receipt line items sales
//       sales.push(getSalesFromReceipts(receipt));
//     });
//     // Add header to sales output
//     sales.unshift(getHead());
//     // Clear and get range from sheet
//     // getRange(LINE, COLUMN)
//     var range = sheet.clear().getRange(1, 1, sales.length, (sales[0]).length);
//     // update sale range
//     range.setValues(sales);
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

// function getSalesFromReceipts(){
//   // Skip empty receipt
//   if((receipt.receipt_line_items && receipt.receipt_line_items.length)){
//     // Get sale data from line item
//     var formattedLineItem = formatLineItem(receipt, 0);
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

// function formatLineItem(receipt, ind) {
//   // Reference to current index line on reeceipt
//   var receipt_line_item = receipt.receipt_line_items[ind];
//   // Resulted formatted receipt
//   var formattedLineItem = {};
//   // ouput sku
//   formattedLineItem.sku = receipt_line_item.product.sku;
//   if(formattedLineItem.sku && (formattedLineItem.sku=="LOANPAYOFF")){
//     // ouput qty
//     formattedLineItem.quantity = 0;
//     // output gallon
//     formattedLineItem.gallons = 0;
//     // output price total
//     formattedLineItem.total = 0;
//     // output credit
//     formattedLineItem.credit = receipt.amount_cash ? parseInt(receipt.amount_cash, 10) : 0;
//   }
//   else{
//     // ouput qty
//     formattedLineItem.quantity = parseInt((receipt_line_item).quantity, 10);
//     // output gallon
//     formattedLineItem.gallons = parseInt(receipt_line_item.product.unit_per_product, 10) * parseInt(receipt_line_item.quantity, 10);
//     // output price total
//     formattedLineItem.total = parseInt(receipt_line_item.price_total, 10);
//     // output credit
//     formattedLineItem.credit = receipt.amount_loan ? parseInt(receipt.amount_loan, 10) : 0;
//   }
//   return formattedLineItem;
// }  