const formResponse = require('../Helpers/formResponse')
const jobModel = require('../Models/job')

const jobController = {
    jobs : (req, res) => {
        jobModel
        .getAllJob(req.query)
        .then((results) =>{
            formResponse.success(res,results,200);
        })
        .catch((error) => {
            formResponse.err(res,error,500);
        })
    }
}

module.exports = jobController