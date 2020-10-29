
// Create `SEMA` menu.
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Add `SEMA` menu
  ui.createMenu('SEMA - push')
    .addItem('Upload sale range', 'uploadSaleRange')
    .addSeparator()
    .addItem('Upload sale range', 'uploadSaleRange')
    .addItem('For what kiosk', 'setWhatKiosks')
    .addToUi();

  // Add `SEMA` menu
  ui.createMenu('SEMA -pull')
  .addItem('Refresh data', 'refreshData')
  .addSeparator()
  .addSubMenu(ui.createMenu('Configure')
                  .addItem("For what kiosks?", 'setWhatKiosks')
                  .addItem("Between which dates?", 'setBetweenDate')
                  .addItem("Reset!", 'resetProperty')) 
  .addToUi();
}