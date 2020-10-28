

// var DEFAULT_PROPERTIES = {
//     "kiosk_id.or": Object.keys(KIOSK_IDS_MAP),
//     "created_at.between": [0, Date.now()],
// };

// var KIOSK_IDS_MAP = {};


function setWhatKiosks() {
    try {
        // Request line range
        var kioskNameList = _prompt("For what kiosks to pull data?", "Format: [Saintard, Corail, ... ]").split(",");
        var kiosk_ids_or = kioskNameList.map(name => {
            const kiosk_ids = KIOSK_IDS_MAP[name];
            if (!kiosk_id) {
                throw 'Cannot validate kiosk list.'
            }
            return kiosk_ids;
        });
        const properties = {};
        properties['kiosk_id.or'] = kiosk_ids_or;
        return _setUserProperties(properties);
    } catch (err) {
        _log(JSON.stringify(err));
        _toast(JSON.stringify(err));
    }
}

function setBetweenDate() {
    try {
        // Request line range
        const betweenDates = _prompt("For what date range?", "Format: [MM/DD/YYYY, MM/DD/YYYY]").split(",");
        const created_at_between = [
            new Date(betweenDates[0]),
            new Date(betweenDates[1])
        ];
        const properties = {};
        properties['created_at.between'] = created_at_between;
        return _setUserProperties(properties);
    } catch (err) {
        _log(JSON.stringify(err));
        _toast(JSON.stringify(err));
    }
}