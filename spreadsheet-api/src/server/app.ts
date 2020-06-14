import express from 'express';
import * as dotenv from 'dotenv';
import IControllerBase from './interfaces/IControllerBase.interface';

export default class App {
    public app: express.Application;
    public port: number = parseInt(process.env.PORT) || 10001;

    constructor(controllers: IControllerBase[]) {
        dotenv.config();
        this.app = express();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
    }

    private initializeControllers(controllers: IControllerBase[]) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}