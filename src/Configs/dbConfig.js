const mySql = require('mysql');

const connection = mySql.createConnection({
    host :process.env.HOST,
    user :process.env.USER,
    database :process.env.DATABASE,
    password :process.env.PASSWORD,
    multipleStatements : true
}); 
connection.connect((err)=>{
    if(err) throw err;
    console.log('Database Connected');
});

module.exports = connection;