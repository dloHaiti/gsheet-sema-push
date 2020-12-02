
// API base url
// const API_BASE_URL = "http://162.243.83.79:81";
const API_BASE_URL = "https://api.haiti.semawater.mooo.com";
// Sale endpoint
var API_POST_SALE_ENDPOINT = '/sema/site/receipts/bulk';
var API_GET_SALE_ENDPOINT = '/sema/site/receipts';
// Expense endpoint
var API_POST_EXPENSE_ENDPOINT = '/sema/site/expenses/bulk';
var API_GET_EXPENSE_ENDPOINT = '/sema/site/expenses';

var USER_ID = 7;

// KIOSK To ID
var KIOSK_IDS_MAP = {
  "saintard": 1,
  "corail": 2,
  "cabaret": 4,
  "santo19": 5,
  "bois9": 6,
  "quartier morin": 7,
  "quartier-morin": 7,
  "limonade": 8,
  "ouanaminthe": 9
};
// Default user properties: list of kiosks to pull data for and for between what date.
var DEFAULT_PROPERTIES = {
  "sale_line_between": [0, 0],
  "sorties_line_between": [0, 0],
  "kiosk_id_or": Object.values(KIOSK_IDS_MAP),
  "created_at_between": [new Date(0), new Date()],
};

// Sheet
var ss = SpreadsheetApp.getActiveSpreadsheet();
// UI
var ui = SpreadsheetApp.getUi();
// Use the `LOG` sheet for code output log
var logSheet = SpreadsheetApp.getActive().getSheetByName('LOG');