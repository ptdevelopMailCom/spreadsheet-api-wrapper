import '@babel/polyfill';

import App from './app';
import IControllerBase from './interfaces/IControllerBase.interface';
import { StockController } from './controllers/Stock.controller';

const controllers: IControllerBase[] = [
    new StockController()
];
const app: App = new App(controllers);

app.listen();