
<<<<<<< HEAD
// kiosk id on sema database
var KIOSK_ID = null; 
var USER_ID = 7;
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
// Use the `LOG` sheet for code output log
var logSheet = SpreadsheetApp.getActive().getSheetByName('LOG');
// API base url
var API_BASE_URL = "https://api.haiti.semawater.mooo.com";
// Sale endpoint
var API_SALE_ENDPOINT = '/sema/site/receipts/bulk';
// Expense endpoint
var API_EXPENSE_ENDPOINT = '/sema/site/expenses/bulk';
// Default user properties: list of kiosks to pull data for and for between what date.
var _defaultProporties = {
  "kiosk_ids" : Object.keys(KIOSK_IDS_MAP),
  "created_at.between" : [0, Date.now()],
  "sale_line.between": [0, 0],
  "sorties_line.between": [0, 0]
};
=======
  var KIOSK_ID = null; // Saintard
  var USER_ID = 7;
>>>>>>> 6cc9189d81b7a01046451b2d66223f37bc310579
