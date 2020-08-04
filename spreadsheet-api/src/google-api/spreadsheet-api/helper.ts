import { google, sheets_v4 } from 'googleapis';
import moment from 'moment';
import { StockPayload } from '../payload/StockPayload';
import { GaxiosPromise } from 'gaxios';
import { OAuth2Client } from 'google-auth-library';

export function updateStockByStockCode(auth: OAuth2Client, code: string): GaxiosPromise<sheets_v4.Schema$UpdateValuesResponse> {
    const sheet = google.sheets('v4');
    const now = moment().local().format('YYYY,MM,DD');
    const init = moment.unix(0).format('YYYY,MM,DD');

    const request: sheets_v4.Params$Resource$Spreadsheets$Values$Update = {
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
    };
    return sheet.spreadsheets.values.update(request);
}

export async function getStockByStockCode(auth: OAuth2Client, code?: string): GaxiosPromise<sheets_v4.Schema$BatchGetValuesResponse> {
    const sheet = google.sheets('v4');
    
    if(code != undefined) {
        await updateStockByStockCode(auth, code);
    }

    const request: sheets_v4.Params$Resource$Spreadsheets$Values$Batchget = {
        spreadsheetId: process.env.SPREADSHEET_ID,
        auth: auth,
        ranges: ['A1:F'],
        valueRenderOption: 'FORMATTED_VALUE',
        dateTimeRenderOption: 'SERIAL_NUMBER'
    };
    return sheet.spreadsheets.values.batchGet(request);
}
