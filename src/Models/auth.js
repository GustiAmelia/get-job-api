const connection =require('../Configs/dbConfig');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authModel = {
    postNewUser : (body)=>{
        return new Promise((resolve,reject)=>{
          const querySelect='SELECT * FROM users WHERE username=?';
          connection.query(querySelect,[body.username],(error,results)=>{
            if(!results){
              reject(error)
            }
            if(results.length){
              reject({
                msg:'username already registered'
              })
            }else{
              const querySelectEmail ='SELECT * FROM users WHERE email=?';
              connection.query(querySelectEmail,[body.email],(error,results)=>{
                if(!results){
                  reject(error);
                }
                if(results.length){
                  reject({
                    msg:'Email already registered'
                  });
                }else{
                  bcrypt.genSalt(10,(error,salt)=>{
                    if(error){
                      reject(error);
                    }
                    const{password}=body;
                    bcrypt.hash(password,salt,(error,hashedPassword)=>{
                      if(error){
                        reject(error);
                      }
                      const newBody={...body, password:hashedPassword};
                      const qs = 'INSERT INTO users SET ?';
                      connection.query(qs,newBody,(error,results)=>{
                        if(!error){
                          resolve({
                              msg:'Register Successful'
                          });
                        }else{
                            reject(error);
                        }
                      });
                    });
                  });
                }
              });
            }  
          })
        });
    },
    loginUser :(body)=>{
        return new Promise((resolve,reject)=>{
          const qs ='SELECT * FROM users WHERE username=?';
          connection.query(qs,body.username,(error,results)=>{
            if(error){
              reject(error)
            }
            if(!results.length){
              reject('User Not Found');
            }
            else{
              bcrypt.compare(body.password, results[0].password,(error,isSame)=>{
                if(isSame){
                  const {username}=body;
                  const data = {...results[0]};
                  delete data.password
                  const payload={
                    username,
                  };
                  const token = jwt.sign(payload,process.env.SECRET_KEY,{
                  });
                  const msg ='Login Successful';
                  resolve({msg,token,data});
                }
                if(!isSame){
                  reject({msg:'Wrong Password'});
                }
                if(error){
                  reject(error);
                }
              });
            }
          })
        })
      },
}

module.exports = authModel