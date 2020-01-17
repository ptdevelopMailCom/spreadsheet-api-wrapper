const homeRouter = require('./route-home');

module.exports = (app) => {
    app.use('/stock', homeRouter);
}