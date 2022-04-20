const formResponse ={
    success:(res,results,status)=>{
        const response={
            isSuccess : true,
            status : status,
            results : results
        }
        res.json(response);
    },
    err : (res,error,status)=>{
        const response={
            isSuccess : false,
            status : status,
            results : error
        }
        res.json(response);
    },
  }
  
  module.exports = formResponse;