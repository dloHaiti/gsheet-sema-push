
// Create `SEMA` menu.
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Add `SEMA` menu
  ui.createMenu('SEMA - push')
    .addItem('Upload sale range', 'uploadSaleRange')
    .addSeparator()
    .addItem('Upload sale range', 'uploadSaleRange')
    .addItem('Set kiosks', 'setWhichKiosks')
    .addToUi();

  // Add `SEMA` menu
  ui.createMenu('SEMA -pull')
  .addItem('Refresh data', 'refreshData')
  .addSeparator()
  .addSubMenu(ui.createMenu('Configure')
                  .addItem("Set kiosks.", 'setWhichKiosks')
                  .addItem("Set date range.", 'setBetweenDate')
                  .addItem("Reset to default settings.", 'resetProperty')) 
  .addToUi();
}