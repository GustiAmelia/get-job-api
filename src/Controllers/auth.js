const formResponse = require('../Helpers/formResponse')
const authModel = require('../Models/auth')

const authController = {
    register:(req,res)=>{
        authModel
        .postNewUser(req.body)
        .then((results)=>{
          formResponse.success(res,results,200);
          }).catch((error)=>{
              formResponse.err(res,error,500);
          })
      },
      login:(req,res)=>{
          authModel
          .loginUser(req.body)
          .then((results)=>{
          formResponse.success(res,results,200);
          }).catch((error)=>{
              formResponse.err(res,error,500);
          })
      },
}

module.exports = authController