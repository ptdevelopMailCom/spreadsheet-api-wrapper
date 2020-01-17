"use strict";

var express = require('express');

var cors = require('cors');

var path = require('path');

var app = express();

require('dotenv').config();

var PORT = process.env.PORT || 10001;
app.use(express.json());

require('./routes')(app);

app.listen(PORT, function () {
  return console.info("Spreadsheet-api listening on port ".concat(PORT));
});
