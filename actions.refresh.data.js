

function refreshData() {
    // Update sales and expenses from kiosks
    try {
        const properties = { ...DEFAULT_PROPERTIES, ..._getUserProperties() };
        loadSaleRangeFromSema(properties);
        loadExpenseRangeFromSema(properties);
    } catch (err) {
        _log(err.message);
        _toast(err.message);
    }
}

// Update expenses
function loadExpenseRangeFromSema(properties) {
    const sheet = SpreadsheetApp.getActive().getSheetByName('AllExpenses');

    let expenses = _fetch('GET', API_GET_EXPENSE_ENDPOINT, properties);
    // normalize expenses to expense line
    expenses = expenses.map(function (expense, ind, arr) {
        return [
            expense.kiosk.name, new Date(expense.created_at), " ", parseFloat(expense.total, 10), expense.notes || "", expense.expense_account.category, expense.expense_account.name
        ];
    });
    expenses.unshift(
        ["Kiosk", "Date", "Account #", "Total", "Description", "Category", "Sub Category"]
    );
    // TODO: Make use of `jsonToSpreadsheet` instead
    var range = sheet.clear().getRange(1, 1, expenses.length, (expenses[0]).length);
    // update sale range
    range.setValues(expenses);
    // toast success
    _toast("Updated expenses data.");
}

// Update sales
function loadSaleRangeFromSema(properties) {
    const sheet = SpreadsheetApp.getActive().getSheetByName('AllSales');

    const receipts = _fetch('get', API_GET_SALE_ENDPOINT, properties);
    // normalize from receipts to sale lines
    const sales = getSalesFromReceipts(receipts);
    // Add header to sales output
    sales.unshift([
      "Kiosk", "Date", "Customer ID", "Customer Name", "Sales Channel", "SKU", "Qty", "Gallons", "Total", "Credit"
    ]);
    // Clear and get range from sheet
    // getRange(LINE, COLUMN)
    var range = sheet.clear().getRange(1, 1, sales.length, (sales[0]).length);
    // update sale range
    range.setValues(sales);
    // toast success
    _toast("Updated sales data.");
}

const getSalesFromReceipts = function (receipts) {
  const sales = [];
  receipts.forEach((receipt) => {
      receipt.receipt_line_items.forEach((lineItem) => {
          sales.push([
              receipt.kiosk.name,
              new Date(receipt.created_at).toDateString(),
              receipt.customer_account.id,
              receipt.customer_account.name,
              receipt.sales_channel.name,
              lineItem.product.sku,
              (lineItem.product.sku == "LOANPAYOFF") ? 0 : (parseFloat(lineItem.quantity, 10)||0),
              (lineItem.product.sku == "LOANPAYOFF") ? 0 : (parseFloat(lineItem.quantity, 10) * lineItem.product.unit_per_product)||0,
              (lineItem.product.sku == "LOANPAYOFF") ? 0 : (parseFloat(lineItem.price_total, 10)||0),
              (lineItem.product.sku == "LOANPAYOFF") ? (-1 * parseFloat(receipt.amount_cash, 10)) : parseFloat(receipt.amount_loan, 10)
          ]);
      });
  });

  return sales;
}
