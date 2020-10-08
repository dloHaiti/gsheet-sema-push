
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
  return PropertiesService.getUserProperties().getProperty('properties') || _defaultProporties;
};

// Update user properties
function _setUserProperties(properties){
  properties = Object.assign({}, _defaultProporties, properties);
  PropertiesService.getUserProperties().setProperty('properties', JSON.stringify(properties));
};