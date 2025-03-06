const mysql = require('mysql');
require("dotenv").config();

const connection_final = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  })
  // kuad var connec dai br 
  connection_final.connect((err) => {
    if (err) {
      console.log("Error connecting to MySQL database = ", err)
      return;
    }
    console.log("MySQL Successfully connected to database gee_stocks !");
  })


  module.exports = connection_final;