
String.prototype.addQuery = function(obj) {
  return this + Object.keys(obj).reduce(function(p, e, i) {
    return p + (i == 0 ? "?" : "&") +
      (Array.isArray(obj[e]) ? obj[e].reduce(function(str, f, j) {
        return str + e + "=" + encodeURIComponent(f) + (j != obj[e].length - 1 ? "&" : "")
      },"") : e + "=" + encodeURIComponent(obj[e]));
  },"");
}

// Create sale line data from receipts
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
  // Add header to sales output
  sales.unshift([
    "Kiosk", "Date", "Customer ID", "Customer Name", "Sales Channel", "SKU", "Qty", "Gallons", "Total", "Credit"
  ]);

  return sales;
}

function _createReceiptFromVentes(line) {
  var receipt = {};

  receipt.created_at = line.date
  receipt.customer_account_id = line.customer_account_id;
  receipt.amount_cash = parseFloat(line.cash, 10) || 0;
  receipt.amount_mobile = 0;
  receipt.amount_loan = parseFloat(line.credit, 10) || 0;
  receipt.amount_card = 0;
  receipt.sponsor_amount = 0;
  receipt.currency_code = "HTG";
  receipt.payment_type = "Cash";
  receipt.total = parseFloat(line.total, 10) || 0;
  receipt.sponsor_id = null;
  receipt.is_sponsor_selected = false;
  receipt.delivery_id = null;
  receipt.receipt_line_items = [
    {
      sku: (line.sku === "DLM5") ? "EB5G" : line.sku,
      quantity: parseFloat(line.quantity, 10) || 0,
      price_total: parseFloat(line.total, 10) || 0,
      currency_code: "HTG",
      receipt_id: line.receipt_id
    }
  ];
  receipt.user_id = USER_ID;
  receipt.uuid = (line.receipt_uuid && line.receipt_uuid.length) ? 
  line.receipt_uuid : null;
  receipt.line_number = parseInt(line.line_number, 10) || 0;

  return receipt;
}


function _createExpenseFromSorties(line) {
  var expense = {};

  expense.created_at = line.created_at;
  expense.notes = line.notes;
  expense.total = line.total;
  expense.expense_account_id = line.expense_account_id;
  expense.kiosk_id = line.kiosk_id;
  expense.user_id = USER_ID;
  expense.uuid = line.uuid;
  expense.line_number = line.line_number;

  return expense;
}

function saveToDrive(filename, data) {
  data = JSON.stringify(data);
  DriveApp.createFile(filename + ": " + (new Date()).toString() + '.json', data);
  _toast(filename + " saved to drive!");
}

function _log(msg) {
  if(logSheet){
    return logSheet.getRange(1, 1).setValue(msg);
  }else{
    return _alert(msg);
  }
}

function _toast(msg) {
  ss.toast(msg);
}

function _hello() {
  ss.toast("HELLO");
}

function _prompt(title="Title", msg="") {
  // prompt(title, prompt, buttons)
  const response = ui.prompt(title, msg, ui.ButtonSet.OK_CANCEL);
  const data = response.getResponseText();
  const btn = response.getSelectedButton().toString().trim().toLowerCase();
  if (btn.includes("cancel")) {
    return null;
  }
  return data;
}

// Print message in dialog alert
function _alert(message) {
  ui.alert(message);
}

// Make a query from sema
function _fetch(verb, endpoint, data) {
  var url = API_BASE_URL + endpoint;
  var options = {
    "sync": true,
    "method": verb.trim().toUpperCase(), // setting verb
    "crossDomain": true,
    "headers": {
      "cache-control": "no-cache"
    },
  };
  if (data) {
    if (options.method === 'GET') {
      url += '/';
      url = url.addQuery(data);
    } else {
      options.contentType = 'application/json';
      options.payload = JSON.stringify(data);
    }
  }
  return JSON.parse(UrlFetchApp.fetch(url, options).getContentText());
}

// Get user properties
function _getUserProperties() {
  const userProperties = JSON.parse( PropertiesService.getUserProperties().getProperty('properties') );
  return userProperties || {};
}

// Update user properties
function _setUserProperties(properties) {
  const userProperties = _getUserProperties();
  properties = {...userProperties, ...properties};
  return PropertiesService.getUserProperties().setProperty('properties', JSON.stringify(properties));
}

// Reset property
function _resetProperty() {
  return PropertiesService.getUserProperties().setProperty('properties', JSON.stringify(DEFAULT_PROPERTIES));
}
