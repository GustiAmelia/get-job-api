const http = require('http')
const defaultConfig = {
    hostname :`dev3.dansmultipro.co.id`,
    method : 'GET',
    headers : {
        'Content-Type': 'application/json',
    }
}

const jobModel = {
    getAllJob : (query) =>{
        return new Promise((resolve, reject) => {
            const req = http.request({...defaultConfig, path:'/api/recruitment/positions.json'}, (res)=>{
                // res.setEncoding('utf8')
                res.setEncoding('utf-8')
                res.on('data', (chunk) => {
                    resolve({
                        data : chunk
                    })
                  });
                  res.on('end', () => {
                    console.log('No more data in response.');
                  });
            })

            req.on('error', (e) => {
                console.error(`problem with request: ${e.message}`);
              });

            req.end()
        })
    }
}

module.exports = jobModel