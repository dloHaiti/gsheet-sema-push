
var COLUMN_MAX = 26;

var spreadsheetToJson = function(options){
    var {
        sheetName,
        rowBetween = [0, 0],
        columnMax = COLUMN_MAX
    } = options;

    // Our working sheet
    var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
    // Header for our json
    var header = sheet.getRange(1, 1, 1, columnMax).getValues()[0];
    // Data to output in json
    var data = sheet.getRange(rowBetween[0], 1, rowBetween[1]-rowBetween[0], columnMax).getValues();
    // our json result
    var jsonArr = [];
    // rows loop
    for(var i=0,iLen=data.length; i<iLen; i++){
        var json = {};
        // columns loop
        for(var j=0, jLen=header.length; j<jLen; j++){
            json[header[j]] = data[i][j];
        }
        jsonArr.push(json);
    }

    return jsonArr;
}