const express = require('express');
const router = express.Router();
const mysql = require('mysql');

console.log("user api request received")
router.post('/', function(req, res) {
    console.log(req.body);
    res.send('POST request received');
  }); 

console.log("connection secured");



// Export router
module.exports = router;
