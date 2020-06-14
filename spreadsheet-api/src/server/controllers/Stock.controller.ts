import * as express from 'express';
import {Request, Response} from 'express';
import IControllerBase from '../interfaces/IControllerBase.interface';
import * as spreadSheetApi from '../../google-api/spreadsheet-api/promise-index';
import { updateStockByStockCode, getStockByStockCode } from '../../google-api/spreadsheet-api/helper';

export class StockController implements IControllerBase {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();    
    }
    
    public initializeRoutes(): void {
        this.router.get('/stock', this.index);
        this.router.get('/stock/:stockCode', this.getStockByStockCode);
    }

    private index(req: Request, res: Response): void {
        spreadSheetApi.perform()
            .then(auth => updateStockByStockCode(auth, 'APPL'))
            .then(res => console.log(res))
            .catch(err => console.error(err));
        res.json('asda');   
    }

    private async getStockByStockCode(req: Request, res: Response): Promise<any> {
        try {
            const stockCode = req.params.stockCode;
            const dailyStockResult = await spreadSheetApi.perform().then(auth => getStockByStockCode(auth, stockCode));
            return res.json(dailyStockResult);
        } catch(e) {
            console.error(e);
            return e;
        }
    }
}
