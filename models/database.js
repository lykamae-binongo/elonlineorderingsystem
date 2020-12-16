const mysql = require('mysql');
require('dotenv').config()

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

con.connect(error=>{
    if(error) throw error;
    console.log("Successfully connected to database");
})

module.exports = con;