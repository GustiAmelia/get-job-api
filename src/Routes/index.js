const express = require("express");

const authRouter = require('./auth')
const jobRouter = require('./job')
const checkToken = require('../Helpers/checkToken')

const indexRouter = express.Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/',checkToken.isValidToken, jobRouter)



module.exports = indexRouter;