const jobRouter = require("express").Router();

const jobController = require('../Controllers/job')

jobRouter.get('/jobs', jobController.jobs)

module.exports = jobRouter