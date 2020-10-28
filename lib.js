

function _createReceiptFromVentes(line) {
  var receipt = {};

  receipt.created_at = line.date
  receipt.customer_id = line.customer_id;
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
  receipt.uuid = line.receipt_uuid;
  receipt.line_number = parseInt(line.line_number, 10) || 0;

  return receipt;
}


function _createExpenseFromSorties(line) {
  var expense = {};

  expense.created_at = line.date;
  expense.notes = line.notes;
  expense.total = line.total;
  expense.expense_account_id = line.expense_account_id;
  expense.kiosk_id = KIOSK_ID;
  expense.user_id = USER_ID;
  expense.uuid = line.expense_uuid;
  // expense.line_number = line.line_number;

  return expense;
}

function saveToDrive(filename, data) {
  data = JSON.stringify(data);
  DriveApp.createFile(filename + ": " + (new Date()).toString() + '.json', data);
  _toast(filename + " saved to drive!");
}

function _log(msg) {
  logSheet.getRange(1, 1).setValue(msg);
}

function _toast(msg) {
  ss.toast(msg);
}

function _hello() {
  ss.toast("HELLO");
}

function _prompt(title, msg) {
  // prompt(title, prompt, buttons)
  var response = ui.prompt(title, msg, ui.ButtonSet.OK_CANCEL);
  if (response.getSelectedButton() == ui.Button.OK) {
    return response.getResponseText();
  } else if (response.getSelectedButton() == ui.Button.CANCEL) {
    _toast('Canceled.');
    return false;
  } else {
    _toast('Closed');
    return false;
  }
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
      const search = new URLSearchParams(properties);
      url = `${url}/?${search.toString()}`;
    } else {
      option.contentType = 'application/json';
      options.payload = JSON.stringify(data);
    }
  }
  return JSON.parse(UrlFetchApp.fetch(url, options).getContentText());
}

// Get user properties
function _getUserProperties() {
  return PropertiesService.getUserProperties().getProperty('properties') || {};
}

// Update user properties
function _setUserProperties(properties) {
  const userProperties = _getUserProperties();
  properties = {...userProperties, ...properties};
  return PropertiesService.getUserProperties().setProperty('properties', JSON.stringify(properties));
}

