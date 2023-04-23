const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

// Import handlers
const userHandlers = require('./handlers/userHandlers');
const swipeHandlers = require('./handlers/swipeHandlers');
const matchHandlers = require('./handlers/matchHandlers');
const chatHandlers = require('./handlers/chatHandlers');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
});


// User Management API endpoints
app.post('/api/users', userHandlers.createUser(pool));
app.post('/api/users/login', userHandlers.loginUser(pool));
app.post('/api/users/logout', userHandlers.logoutUser(pool));
app.get('/api/users/:id', userHandlers.getUserProfile(pool));
app.patch('/api/users/:id', userHandlers.updateUserProfile(pool));
app.delete('/api/users/:id', userHandlers.deleteUser(pool));

// Swipe API endpoints
app.get('/api/users/recommendations', swipeHandlers.getRecommendedUsers(pool));
app.post('/api/swipes/right', swipeHandlers.swipeRight(pool));
app.post('/api/swipes/left', swipeHandlers.swipeLeft(pool));

// Match API endpoints
app.get('/api/matches', matchHandlers.getAllMatches(pool));
app.get('/api/matches/:match_id/messages', matchHandlers.getAllMessages(pool));
app.post('/api/matches/:match_id/messages', matchHandlers.sendMessage(pool));

// Chat API endpoints
app.get('/api/conversations', chatHandlers.getAllConversations(pool));
app.get('/api/conversations/:conversation_id/messages', chatHandlers.getAllMessages(pool));
app.post('/api/conversations/:conversation_id/messages', chatHandlers.sendMessage(pool));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
