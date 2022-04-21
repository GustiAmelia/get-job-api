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
            const
            {
                page=1,
                limit=2,
                description = "",
                location="",
                full_time=false
            } = query
            const offset = (page-1)*limit
            const req = http.request({...defaultConfig, path:'/api/recruitment/positions.json'}, (res)=>{
                let data = ''
                res.setEncoding('utf8')
                res.on('data', (chunk) => {
                    data += chunk
                  });
                  res.on('end', () => {
                    let dataFiltered =  JSON.parse(data).filter(item => item.location.includes(location) && item.description.includes(description) && (
                        full_time ? item.type.includes("Full Time") : item.type.includes("")
                    ))
                    let newdata = [...dataFiltered]
                    let result = newdata.splice(offset, limit)

                    resolve({
                        data : result,
                        page,
                        limit,
                        count : result.length,
                        totalData:dataFiltered.length,
                        
                    })
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