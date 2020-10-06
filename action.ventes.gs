
function uploadSaleRange() {

  // Request line range
  var INPUT = _prompt("What range, lines, to upload?", "Fomat: [START_LINE, END_LINE]").split(",");

  if(INPUT[0] && INPUT[1])
  {
    var START_LINE = parseInt(INPUT[0], 10);
    var END_LINE = parseInt(INPUT[1], 10);
    
    _toast("START_LINE: " + START_LINE);
    _toast("END_LINE: " + END_LINE);
    
    var sheet = SpreadsheetApp.getActive().getSheetByName('VENTES');
    
    // Date(1) ||	Nom client(2) ||	SKU(3) ||	Quantite(4)	|| Prix Unitaire(5) || Credit (6) || Cash (8) || Total (9) || Gallons (10) || totalCredit (11) || totalCash (12) || saleChannel (14) || customerId (15) ||  receiptId (16) 
    
    var SCRIPT = "action.ventes.gs";
    var DATE_INDEX = 1;
    var CUSTOMER_NAME_INDEX = 2;
    var SKU_INDEX = 3;
    var QTY_INDEX = 4;
    var CREDIT_INDEX = 6;
    var CASH_INDEX = 8;
    var TOTAL_INDEX = 9;
    var CUSTOMER_ID_INDEX = 15;
    var RECEIPT_UUID_INDEX = 16;
    var UPDATED_AT_INDEX = 17;
    // File base and name
    var FILE_BASE_NAME = SpreadsheetApp.getActiveSpreadsheet().getName();
    var FILE_NAME =  FILE_BASE_NAME + ", VENTES: "+ START_LINE +": " + END_LINE;
    
    // Get sale lines
    var sales = getSaleRange(START_LINE, END_LINE);
    // Create receipts from sale lines
    var receipts = sales.map(function(sale){
      return createReceiptFromSale(sale);
    });
    
    // Submit receipts for/to SEMA
    // saveToDrive(FILE_NAME, receipts);
    submitToSema(API_SALE_ENDPOINT, receipts, sheet, RECEIPT_UUID_INDEX, UPDATED_AT_INDEX);  
  }
  
  
  function createReceiptFromSale(sale) {
      return {
        created_at: sale.date,
        customer_id: sale.customerId,
        amount_cash: sale.cash,
        amount_mobile: 0,
        amount_loan: sale.credit,
        amount_card: 0,
        sponsor_amount: 0,
        currency_code: "HTG",
        payment_type: "Cash",
        total: sale.total,
        sponsor_id: null,
        is_sponsor_selected: false,
        delivery_id : null,
        receipt_line_items: [
          {
            sku: sale.sku,
            quantity: sale.quantity,
            price_total: sale.total,
            currency_code: "HTG",
            receipt_id: sale.receiptId
          }
        ],
        user_id: USER_ID,
        uuid: sale.receiptUuid,
        lineNumber: sale.lineNumber
      };
    }
    
    // sema sales export
    function getSaleRange(START_LINE, END_LINE){
      // Row count
      var lineCount = END_LINE - START_LINE;
      // Get working range as array
      var range = sheet.getRange(START_LINE, 1, lineCount, 26).getValues();
      // returned result
      var result = [];
      for(var i=0,len=range.length; i<len; i++){
        var saleLine = getSaleDataLine(range[i]);
        // Add sale to result IF it is valid
        if(saleLine){
          // Convert 'DLM5' SKU to 'EB5G' to be supported in SEMA
          if(saleLine.sku=="DLM5"){
            saleLine.sku="EB5G";
          }
          // Keep reference of this line number
          saleLine.lineNumber = START_LINE + i;
          result.push(saleLine);
        }
        // Log progress
        var log = (i + 1).toString() + " / " + (lineCount).toString();
        _log(log);
      }
      return result;
    }
    
    function getSaleDataLine(row)
    {
      var saleLine = {
        date: row[DATE_INDEX - 1],
        customerName: row[CUSTOMER_NAME_INDEX - 1],
        customerId: row[CUSTOMER_ID_INDEX - 1],
        sku: row[SKU_INDEX - 1],
        quantity: parseInt(row[QTY_INDEX - 1], 10),
        credit: parseInt(row[CREDIT_INDEX - 1], 10) || 0,
        cash: parseInt(row[CASH_INDEX - 1], 10),
        total: parseInt(row[TOTAL_INDEX - 1], 10),
        receiptUuid : row[RECEIPT_UUID_INDEX - 1]
      };
      // Reformat date
      saleLine.date = saleLine.date ? new Date(saleLine.date.toDateString()) : null;
      // Validate line if line has 'customerName', `quantity`, `total` OR `receiptId`.
      var validLine = (saleLine.customerName && saleLine.customerName.length) || (saleLine.quantity && saleLine.total) || (saleLine.receiptId && saleLine.receiptId.length);
      // returned valid line or null
      return (validLine ? saleLine : null);
    };
}
