import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';
import * as util from 'util';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const TOKEN_PATH = path.resolve(__dirname, 'token.json');

function authorize(credentials): Promise<OAuth2Client> {
    return new Promise((resolve, reject) => {
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) {
                console.error(err);
                return getNewToken(oAuth2Client);
            }
            oAuth2Client.setCredentials(JSON.parse(token.toString()));
            resolve(oAuth2Client);
        });
    });
}

function getNewToken(oAuth2Client: OAuth2Client, callback?: Function): Promise<OAuth2Client> {
    return new Promise((resolve, reject) => {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err) {
                    console.error('Error while trying to retrieve access token', err)
                    return reject(err);
                }
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                    if (err) return console.error(err);
                    console.log('Token stored to', TOKEN_PATH);
                });
                resolve(oAuth2Client);
            });
        });
    })
}

/**
 * Sample function to test the functionality of promise-index.js
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get({
        spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
        range: 'Class Data!A2:E',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows.length) {
            console.log('Name, Major:');
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map((row) => {
                console.log(`${row[0]}, ${row[4]}`);
            });
        } else {
            console.log('No data found.');
        }
    });
}

export namespace AuthHelper {
    
    export async function perform() {
        const readFile = util.promisify(fs.readFile);
        const CRED_PATH = path.resolve(__dirname, 'credentials.json');
        return readFile(CRED_PATH)
            .then(content => authorize(JSON.parse(content.toString())))
            .catch(err => {
                console.log('Error loading client secret file:', err);
                return Promise.reject(err);
            });
    }

    export function list(auth) {
        listMajors(auth);
    }
}