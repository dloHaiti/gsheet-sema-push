
// KIOSK To ID
var KIOSK_IDS_MAP = {
  "saintard": 1,
  "corail": 2,
  "cabaret": 4,
  "santo19": 5,
  "bois9": 6,
  "quartier morin": 7,
  "limonade": 8,
  "ouanaminthe": 9
};
// Sheet
var ss = SpreadsheetApp.getActiveSpreadsheet();
// UI
var ui = SpreadsheetApp.getUi(); 
// API base url
var API_BASE_URL = "https://api.haiti.semawater.mooo.com";
// Sale endpoint
var API_SALE_ENDPOINT = '/sema/site/receipts/bulk';
// Expense endpoint
var API_EXPENSE_ENDPOINT = '/sema/site/expenses/bulk';
// Use the `LOG` sheet for code output log
var logSheet = SpreadsheetApp.getActive().getSheetByName('LOG');
// Default user properties: list of kiosks to pull data for and for between what date.
var _getDefaultProporties = {
  "kiosk_ids" : Object.keys(KIOSK_IDS_MAP),
  "created_at.between" : [0, Date.now()],
  "sale_line.between": [0, 0],
  "sorties_line.between": [0, 0]
};

function submitToSema(endpoint, data, sheet, uuidIndex, updatedAtIndex){
  try {
    // Define request parameters
    var options = {
      "sync": true,
      "crossDomain": true,
      "contentType": "application/json",
      "method" : "POST",
      "headers" : {
        "cache-control": "no-cache"
      },
      'payload' : JSON.stringify(data)
    };
    // Execute request
    var url = API_BASE_URL + endpoint;
    var response = UrlFetchApp.fetch(url, options);
    response = JSON.parse(response.getContentText());
    // Log uuid and update_at in sheet.
    response.forEach(function(receipt, index, array){
      sheet.getRange(data[index].lineNumber, uuidIndex).setValue(receipt.uuid);
      sheet.getRange(data[index].lineNumber, updatedAtIndex).setValue(receipt.updated_at);
    });
    _toast("SEMA submission succeeded");
  } catch(err){
    // Something went wrong!
    var error = err;
    _toast(err.message);
  }
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
  logSheet.getRange(2,1).setValue(msg);
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
  properties = Object.assign({}, _getDefaultProporties, properties);
  PropertiesService.getUserProperties().setProperty('properties', JSON.stringify(properties));
};