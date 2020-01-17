const router = require('express').Router();
const spreadSheetApi = require('../../google-api/spreadsheet-api/promise-index');
const { updateStockByStockCode, getStockByStockCode } = require('../../google-api/spreadsheet-api/helper');


router.get('/', (req, res) => {
    spreadSheetApi.perform()
        .then(auth => updateStockByStockCode(auth, "GOOG"))
        .then(res => console.log(res))
        .catch(err => console.error(err));
    res.json('asda');
});

router.get('/:stockId', async (req, res) => {
    let dailyStockResult;
    await spreadSheetApi.perform()
        .then(auth => getStockByStockCode(auth))
        .then(res => dailyStockResult = res)
        .catch(err => console.error(err));
    res.json(dailyStockResult);
});

module.exports = router;