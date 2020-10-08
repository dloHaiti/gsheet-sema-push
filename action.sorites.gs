
function uploadSortiesRange() {

    // Request line range
    var betweenLine = _prompt("What range, or lines, to upload?", "Fomat: [START_LINE, END_LINE]").split(",");
    // sales data
    var data = spreadsheetToJson({
        sheetName: "SORTIES",
        rowBetween: betweenLine
    });

    console.log(data);
    
}