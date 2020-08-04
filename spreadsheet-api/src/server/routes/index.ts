import * as HomeRouter from './route-home';
import express from 'express';

export default function(app: express.Application) {
    app.use('/stock', HomeRouter);
}