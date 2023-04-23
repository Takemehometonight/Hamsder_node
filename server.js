const express = require('express');
const app = express();
const mysql = require('mysql2');
const fs = require('fs');

console.log("initializing connection to mysql");
const connection = mysql.createConnection({
    host: '172.18.0.1',
    user: 'root',
    password: 'password',
    database: 'hamsder'
});

console.log("attempting to connect ...")

connection.connect((error) => {
    if (error) {
      console.error('Failed to connect to MySQL server:', error);
    } else {
      console.log('Connected to MySQL server.');
    }
});

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello, World from Eric!');
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
