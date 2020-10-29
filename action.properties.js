

// var DEFAULT_PROPERTIES = {
//     "kiosk_id.or": Object.keys(KIOSK_IDS_MAP),
//     "created_at.between": [0, Date.now()],
// };
// var KIOSK_IDS_MAP = {};

function resetProperty() {
    _toast("Reset user properties.");
    return _resetProperty();
  }
  
  
  function setWhatKiosks() {
      try {
          // Request line range
          var kioskNameList = _prompt("For what kiosks to pull data?", "Format: [Saintard, Corail, ... ]").split(",");
          var kiosk_ids_or = kioskNameList.map(name => {
              name = name.trim().toLowerCase();
              const kiosk_id = KIOSK_IDS_MAP[name];
              if (!kiosk_id) {
                  throw 'Cannot validate kiosk list.'
              }
              return kiosk_id;
          });
          const properties = {};
          properties['kiosk_id_or'] = kiosk_ids_or;
          return _setUserProperties(properties);
      } catch (err) {
          _log(JSON.stringify(err));
          _toast(JSON.stringify(err));
      }
  }
  
  function setBetweenDate() {
      try {
          // Request line range
          const betweenDates = _prompt("For what date range?", "Format: [MM/DD/YYYY] or [MM/DD/YYYY, MM/DD/YYYY]").split(",");
          const created_at_between = [
              new Date(betweenDates[0]),
              (betweenDates[1]) ? new Date(betweenDates[1]) : new Date()
          ];
          const validDate = created_at_between[0] * created_at_between[1];
          if(!validDate){
            throw "Cannot validate the date.";
          }
          const properties = {};
          properties['created_at_between'] = created_at_between;
          return _setUserProperties(properties);
      } catch (err) {
          const msg = "Cannot validate the date.";
          _log(msg);
          _toast(msg);
      }
  }