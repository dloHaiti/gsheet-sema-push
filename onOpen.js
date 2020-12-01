
// Create `SEMA` menu.
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  
  
  // Add `SEMA` menu
  ui.createMenu('SEMA - push')
    .addItem('1. Upload sale range', 'uploadSaleRange')
    .addItem('2. Upload expense range', 'uploadSortiesRange')
    .addToUi();




  // Add `SEMA` menu
  ui.createMenu('SEMA -pull')
  .addItem('1. Refresh data', 'refreshData')
  .addSeparator()
  .addSubMenu(ui.createMenu('Configure')
                  .addItem("1.  Set kiosks.", 'setWhichKiosks')
                  .addItem("2. Set date range.", 'setBetweenDate')
                  .addItem("3. Reset to default settings.", 'resetProperty')) 
  .addToUi();
  
  
  
}