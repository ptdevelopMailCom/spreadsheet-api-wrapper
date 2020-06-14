export class Config {
    url: string = <string><any>null;
    method: string = <string><any>null;
    headers: HttpHeader = <HttpHeader><any>null;
    params: Params = <Params><any>null;
    responseType: string = <string><any>null;
}

export class HttpHeader {
    'Accept-Encoding': string = <string><any>null;
    'User-Agent': string = <string><any>null;
    'Authorization': string = <string><any>null;
    'Accept': string = <string><any>null;
}

export class Params {
    ranges: string[] = [];
    valueRenderOption: string = <string><any>null;
    dateTimeRenderOption: string = <string><any>null;
}

export class Data {
    valueRanges: ValueRange[] = [];
}

export class ValueRange {
    range: string = <string><any> null;
    majorDimension: string = <string><any> null;
    values: number[] = [];
}

export class Headers {
    'alt-svc': string = <string><any>null;
    'cache-control': string = <string><any>null;
    'connection': string = <string><any>null;
    'content-encoding': string = <string><any>null;
    'content-type': string = <string><any>null;
    'date': string = <string><any>null;
    'server': string = <string><any>null;
    'transfer-encoding': string = <string><any>null;
    'vary': string = <string><any>null;
    'x-frame-options': string = <string><any>null;
    'x-xss-protection': string = <string><any>null;
}


export class StockPayload {
    config: Config = <Config><any>null;
    data: Data = <Data><any>null;
    headers: Headers = <Headers><any>null;
    status: number = <number><any>null;
    statusText: string = <string><any>null;
}
