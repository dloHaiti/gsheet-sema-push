
// API base url
var API_BASE_URL = "http://162.243.83.79:81";
// Sale endpoint
var API_POST_SALE_ENDPOINT = '/sema/site/receipts/bulk';
var API_GET_SALE_ENDPOINT = '/sema/site/receipts';
// Expense endpoint
var API_POST_EXPENSE_ENDPOINT = '/sema/site/expenses/bulk';
var API_GET_EXPENSE_ENDPOINT = '/sema/site/expenses';

var USER_ID = 7;
var KIOSK_ID = null;

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
// Default user properties: list of kiosks to pull data for and for between what date.
var DEFAULT_PROPERTIES = {
  "kiosk_id.or": Object.keys(KIOSK_IDS_MAP),
  "created_at.between": [0, Date.now()],
  "sale_line.between": [0, 0],
  "sorties_line.between": [0, 0]
};

// Sheet
var ss = SpreadsheetApp.getActiveSpreadsheet();
// UI
var ui = SpreadsheetApp.getUi();
// Use the `LOG` sheet for code output log
var logSheet = SpreadsheetApp.getActive().getSheetByName('LOG');