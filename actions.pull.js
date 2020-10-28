
function refreshData() {
    loadExpenseRangeFromSema();
}

// Update expenses
function loadExpenseRangeFromSema() {
    const properties = {...DEFAULT_PROPERTIES, ..._getUserProperties()};
    let expenses = _fetch('GET', API_GET_EXPENSE_ENDPOINT, properties);
    // normalize expenses to expense line
    expenses = expenses.map(function (expense, ind, arr) {
      return [
        expense.kiosk.name, new Date(expense.created_at), " ", parseFloat(expense.total, 10), expense.note || "", expense.expense_account.category, expense.expense_account.name
      ];
    });
    expenses.unshift(
        [ "Kiosk", "Date", "Account #", "Total", "Description", "Category", "Sub Category"]
    );
    const data = {sheetName: "testAllExpenses",data: expenses};
    jsonToSpreadsheet(data);
  }  

// Update sales
function loadSaleRangeFromSema() {
  const API_SALE_ENDPOINT = '/sema/site/receipts';
  const sheet = SpreadsheetApp.getActive().getSheetByName('AllSales');
  
  try {
    const properties = _getUserProperties();
    const receipts = _fetch('get', API_SALE_ENDPOINT, properties);
    // normalize from receipts to sale lines
    const sales = [];
    const sale = null;
    receipts.forEach(function(receipt, ind, arr){
      // Make sales line from receipt line items sales
      sale = getSalesFromReceipts(receipt);
      if(sale){
        sales.push(sale);
      }
    });
    // Add header to sales output
    sales.unshift([
        "Kiosk", "Date", "Customer ID", "Customer Name", "Sales Channel", "SKU", "Qty", "Gallons", "Total", "Credit"
    ]);
    // Clear and get range from sheet
    // getRange(LINE, COLUMN)
    var range = sheet.clear().getRange(1, 1, sales.length, (sales[0]).length);
    // save to drive
    saveToDrive("sales.json", sales);
    // update sale range
    range.setValues(sales);
    // toast success
    _toast("Done");
  }catch(err){
    console.log(err.message);
  }
}

function getSalesFromReceipts(receipt){
  // Skip empty receipt
  if((receipt.receipt_line_items && receipt.receipt_line_items.length)){
    // Get sale data from line item
    var formattedLineItem = formatReceiptLineItem(receipt, 0);
    // Create sale line for receipt
    return [
      // 1. kiosk
      receipt.kiosk.name,
      // 2. date
      new Date(receipt.created_at).toDateString(),
      // 3. customer id
      receipt.customer_account.id,
      // 4. customer name
      receipt.customer_account.name,
      // 5. sales channel
      receipt.sales_channel.name, 
      // 6. sku // TODO: Should print all line items form receipt
      formattedLineItem.sku,
      // 7. quantity
      formattedLineItem.quantity,
      // 8. gallons
      formattedLineItem.gallons,
      // 10. total
      formattedLineItem.total,
      // 9. credit
      formattedLineItem.credit
    ];
  };
}

function formatReceiptLineItem(receipt, ind) {
  // Reference to current index line on receipt
  const receipt_line_item = receipt.receipt_line_items[ind];
  const formattedReceiptLineItem = {};
  
  formattedLineItem.sku = receipt_line_item.product.sku;
  if(formattedReceiptLineItem.sku && (formattedReceiptLineItem.sku=="LOANPAYOFF")){
    formattedReceiptLineItem.quantity = 0;
    formattedReceiptLineItem.gallons = 0;
    formattedReceiptLineItem.total = 0;
    formattedReceiptLineItem.credit = receipt.amount_cash ? parseFloat(receipt.amount_cash, 10) : 0;
  }
  else{
    formattedReceiptLineItem.quantity = parseFloat((receipt_line_item).quantity, 10);
    formattedReceiptLineItem.gallons = parseFloat(receipt_line_item.product.unit_per_product, 10) * parseFloat(receipt_line_item.quantity, 10);
    formattedReceiptLineItem.total = parseFloat(receipt_line_item.price_total, 10);
    formattedReceiptLineItem.credit = receipt.amount_loan ? parseFloat(receipt.amount_loan, 10) : 0;
  }
  return formattedReceiptLineItem;
}