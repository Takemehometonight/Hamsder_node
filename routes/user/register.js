const express = require('express');
const router = express.Router();
const mysql = require('mysql');

console.log("attempting to connect to mysql");

// // Create MySQL connection
// const connection = mysql.createConnection({
//   host: '34.83.75.189', // replace with your database host
//   user: 'root', // replace with your database username
//   database: 'hamsder', // replace with your database name
// });

// // Connect to MySQL database
// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL database');
// });

router.post('/', function(req, res) {
    console.log(req.body);
    res.send('POST request received');
  }); 

console.log("connection secured");



// Export router
module.exports = router;
