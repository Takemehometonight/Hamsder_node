// require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/uploads', express.static('uploads'));

console.log("initializing connection to mysql");
const pool = mysql.createPool({
    host: '172.18.0.1',
    // for tracy
    // host: '127.0.0.1
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
const matchHandlers = require('./handlers/matchHandlers');

// User Management API endpoints
app.post('/api/users', userHandlers.upload.single('profile_picture'), userHandlers.createUser(pool));
// app.post('/api/users', userHandlers.createUser(pool));
app.post('/api/users/login', userHandlers.loginUser(pool));
app.get('/api/users/:id', userHandlers.getUserProfile(pool));

//swipe management API endpoints
app.post('/api/swipes/right', swipeHandlers.swipeRight(pool));
app.post('/api/swipes/left', swipeHandlers.swipeLeft(pool));
app.get('/api/swipes/recommendations/:id', swipeHandlers.getRecommendedUsers(pool));

//match management API endpoints
app.get('/api/matches', matchHandlers.getAllMatches(pool));

// Serve uploaded files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API endpoint to get the image data for a given filename
app.get('/api/images/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, 'uploads', filename);

  // Check if the file exists
  if (!fs.existsSync(imagePath)) {
    return res.status(404).send('File not found');
  }

  // Read the file data and send it as a response
  const fileStream = fs.createReadStream(imagePath);
  fileStream.pipe(res);
});

// Start the server
const PORT = process.env.PORT || 5000;
// for tracy
// const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
