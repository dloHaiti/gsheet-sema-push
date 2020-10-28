
function refreshData() {
    // Update sales and expenses from kiosks
    try {
        loadSaleRangeFromSema();
        // loadExpenseRangeFromSema();
    } catch (err) {
        _log(err.message);
        _toast(err.message);
    }
}

// Update expenses
function loadExpenseRangeFromSema() {
    const properties = { ...DEFAULT_PROPERTIES, ..._getUserProperties() };
    let expenses = _fetch('GET', API_GET_EXPENSE_ENDPOINT, properties);
    // normalize expenses to expense line
    expenses = expenses.map(function (expense, ind, arr) {
        return [
            expense.kiosk.name, new Date(expense.created_at), " ", parseFloat(expense.total, 10), expense.note || "", expense.expense_account.category, expense.expense_account.name
        ];
    });
    expenses.unshift(
        ["Kiosk", "Date", "Account #", "Total", "Description", "Category", "Sub Category"]
    );
    const data = { sheetName: "testAllExpenses", data: expenses };
    jsonToSpreadsheet(data);
}

// Update sales
function loadSaleRangeFromSema() {
    const API_SALE_ENDPOINT = '/sema/site/receipts';
    const sheet = SpreadsheetApp.getActive().getSheetByName('AllSales');
    const getSalesFromReceipt = function (receipt) {
        const sales = [];
        const items = receipt.receipt_line_items;
        for (var i = 0, len = items.length; i < len; i++) {
            let item = items[i];
            sales[i] = [
                receipt.kiosk.name,
                new Date(receipt.created_at).toDateString(),
                receipt.customer_account.id,
                receipt.customer_account.name,
                item.product.sku,
                parseFloat(item.quantity,10) || 0,
                parseFloat((item.gallons,10) || 0,
                parseFloat(item.total, 10) || 0,
                (item.product.sku=="LOANPAYOFF") ? parseFloat(receipt.amount_cash, 10) : 0
            ];
        }
        return sales;
    }

    try {
        const properties = { ...DEFAULT_PROPERTIES, ..._getUserProperties() };
        const receipts = _fetch('get', API_SALE_ENDPOINT, properties);
        // normalize from receipts to sale lines
        const sales = [];
        receipts.forEach(function (receipt, ind, arr) {
            // Make sales line from receipt line items sales
            let sale = getSalesFromReceipt(receipt);
            if (sale) {
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
        // update sale range
        range.setValues(sales);
        // toast success
        _toast("Done");
    } catch (err) {
        console.log(err.message);
    }
}

