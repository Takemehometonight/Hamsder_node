// require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const fs = require('fs');


console.log("initializing connection to mysql");
const pool = mysql.createPool({
    host: '172.18.0.1',
    user: 'root',
    password: 'password',
    database: 'hamsder'
});

if (pool) {
    console.log('Connection pool created successfully');
  } else {
    console.error('Failed to create connection pool');
  }

app.use(express.json());

// mount routing for api/user
const userHandlers = require('./handlers/userHandlers');
const swipeHandlers = require('./handlers/swipeHandlers');

// User Management API endpoints
app.post('/api/users', userHandlers.createUser(pool));
app.post('/api/users/login', userHandlers.loginUser(pool));
app.get('/api/users/:id', userHandlers.getUserProfile(pool));

//swipe management API endpoints
app.post('/api/swipes/right', swipeHandlers.swipeRight(pool));


// app.get('/', (req, res) => {
//     res.send('Hello, World from Eric!');
// });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
