const express = require('express');
const cors = require('cors');
const path = require('path');


const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 10001;

app.use(express.json());

require('./routes')(app);

app.listen(PORT, () => console.info(`Spreadsheet-api listening on port ${PORT}`));