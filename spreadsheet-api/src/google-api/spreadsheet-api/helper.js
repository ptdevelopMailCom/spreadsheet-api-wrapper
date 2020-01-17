import {google} from 'googleapis';
import * as moment from 'moment';

export async function updateStockByStockCode(auth, code) {
    const sheet = google.sheets('v4');
    const now = moment().local().format('YYYY,MM,DD');
    const init = moment.unix(0).format('YYYY,MM,DD');

    const request = {
        spreadsheetId: process.env.SPREADSHEET_ID,
        auth: auth,
        range: 'A1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            range: 'A1',
            values: [
                [`=GOOGLEFINANCE("${code}", "All", DATE(${init}), DATE(${now}), "DAILY")`]
            ]
        }
    }
    return sheet.spreadsheets.values.update(request);
}

export async function getStockByStockCode(auth, code) {
    const sheet = google.sheets('v4');

    const request = {
        spreadsheetId: process.env.SPREADSHEET_ID,
        auth: auth,
        ranges: ["A1:F"],
        valueRenderOption: 'FORMATTED_VALUE',
        dateTimeRenderOption: 'SERIAL_NUMBER'
    }
    return sheet.spreadsheets.values.batchGet(request);
}
