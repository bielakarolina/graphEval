const cors = require("cors");
const indexRouter = require("./routes/index")
const express = require('express');
const bodyParser  = require('body-parser');

const port = 3800;
const router = express.Router();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

app.use('/', indexRouter);


module.exports = app;
