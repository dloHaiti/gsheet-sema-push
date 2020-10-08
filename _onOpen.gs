

// Create `SEMA` menu.
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Add `SEMA` menu
  ui.createMenu('SEMA - push')
  .addItem('Upload sale range', 'uploadSaleRange')
  .addSeparator()
  .addItem('Upload expense range', 'uploadSortiesRange')
  .addToUi();
}
