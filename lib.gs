  

   function _createReceiptFromVentes(line) {
    var receipt = {};

    receipt.created_at = line.date
    receipt.customer_id = line.customer_id;
    receipt.amount_cash = line.cash;
    receipt.amount_mobile = 0;
    receipt.amount_loan = line.credit;
    receipt.amount_card = 0;
    receipt.sponsor_amount = 0;
    receipt.currency_code = "HTG";
    receipt.payment_type = "Cash";
    receipt.total = line.total;
    receipt.sponsor_id = null;
    receipt.is_sponsor_selected = false;
    receipt.delivery_id  = null;
    receipt.receipt_line_items = [
        {
          sku: line.sku,
          quantity: line.quantity,
          price_total: linne.total,
          currency_code: "HTG",
          receipt_id: line.receipt_id
        }
      ];
    receipt.user_id = USER_ID;
    receipt.uuid = line.receipt_id;

    return receipt;
  }


  function _createExpenseFromSorties(line) {
    var expense = {};

    expense.created_at= line.date;
    expense.notes= line.notes;
    expense.total= line.total;
    expense.expense_account_id= line.expense_account_id;
    expense.kiosk_id= KIOSK_ID;
    expense.user_id= USER_ID;
    expense.uuid= line.expense_uuid;

    return expense;
  }

  function saveToDrive(filename, data){
    data = JSON.stringify(data);
    DriveApp.createFile( filename + ": " + (new Date()).toString() + '.json', data);
    _toast( filename + " saved to drive!");
  };
  
  function _log(msg){
    logSheet.getRange(1,1).setValue(msg);
  };
  
  function _toast(msg){
    ss.toast( msg);
  };
  
  function _hello(){
    ss.toast("HELLO");
  };
  
  function _prompt(title, msg){
    // prompt(title, prompt, buttons)
    var response = ui.prompt(title, msg, ui.ButtonSet.OK_CANCEL);
    if (response.getSelectedButton() == ui.Button.OK) {
      return response.getResponseText();
    } else if (response.getSelectedButton() == ui.Button.CANCEL) {
      _toast('Canceled.');
    } else {
      _toast('Closed');
    }
    return null;
  };
  
  // Print message in dialog alert
  function _alert(message){
    ui.alert(message);
  };
  
  // Make a query from sema
  function _fetch (verb, endpoint, data) {
    // TODO: Add payload to endpoint for GET request.
    
    // url
    url = API_BASE_URL + endpoint;
    // Define request parameters
    var options = {
      "sync": true,
      "method" : verb, // setting verb
      'payload' : data && JSON.stringify(data), // setting data
      
      "crossDomain": true,
      "contentType": "application/json",
      "headers" : {
        "cache-control": "no-cache"
      },
    };
    // Query -->
    return JSON.parse(UrlFetchApp.fetch(url, options).getContentText());
  };
  
  // Get user properties
  function _getUserProperties(){
    return PropertiesService.getUserProperties().getProperty('properties') || _getDefaultProporties;
  };
  
  // Update user properties
  function _setUserProperties(properties){
    // TODO: Merge default with new propertie sets.
    properties = Object.assign({}, DEFAULT_PROPERTIES, properties);
    PropertiesService.getUserProperties().setProperty('properties', JSON.stringify(properties));
  };

