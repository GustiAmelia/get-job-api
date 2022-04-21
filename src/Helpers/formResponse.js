const formResponse ={
    success:(res,results,status)=>{
        const response={
            isSuccess : true,
            status : status,
            data : results
        }
        res.json(response);
    },
    err : (res,error,status)=>{
        const response={
            isSuccess : false,
            status : status,
            data : error
        }
        res.json(response);
    },
  }
  
  module.exports = formResponse;