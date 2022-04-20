//IMPORT
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require('./src/Routes/index');

const app = express();

app.listen(process.env.PORT,()=>{
    console.log(`Server is Running at ${process.env.PORT}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(logger("dev"));
app.use(cors());
app.use(express.static("public"));

app.use(indexRouter);