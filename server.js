const express = require('express');
const app = express();
// const mysql = require('mysql');


// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host:'34.83.75.189',
//     user:'root',
//     password:'',
//     database:'hamsder'
// });

// pool.query('SELECT * FROM matches', (err, res) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log("yes");
//   });


//==============test===================
const mysql = require('mysql');
const fs = require('fs');

// createTcpPool initializes a TCP connection pool for a Cloud SQL
// instance of MySQL.
const createTcpPool = async config => {
  // Note: Saving credentials in environment variables is convenient, but not
  // secure - consider a more secure solution such as
  // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
  // keep secrets safe.
  const dbConfig = {
    host: '34.83.75.189', // e.g. '127.0.0.1'
    port: '3306', // e.g. '3306'
    user: 'root', // e.g. 'my-db-user'
    password: '', // e.g. 'my-db-password'
    database: 'hamsder', // e.g. 'my-database'
    // ... Specify additional properties here.
    ...config,
  };
  // Establish a connection to the database.
  return mysql.createPool(dbConfig);
};

// const pool = createTcpPool();

// const stuff = pool.query('SELECT * FROM entries');

// function getQuery() {
//   console.log(stuff);
// }

// getQuery();

//================end test==================

// Import routes
// const registerUser = require('./routes/user/register');
// const loginUser = require('./routes/user/login');
// const logoutUser = require('./routes/user/logout');
// const getProfile = require('./routes/user/getProfile');
// const updateProfile = require('./routes/user/updateProfile');
// const deleteUser = require('./routes/user/deleteUser');

// const getRecommendations = require('./routes/swipe/getRecommendations');
// const swipeRight = require('./routes/swipe/swipeRight');
// const swipeLeft = require('./routes/swipe/swipeLeft');

// const getMatches = require('./routes/match/getMatches');
// const getMessages = require('./routes/match/getMessages');
// const sendMessage = require('./routes/match/sendMessage');

// const getConversations = require('./routes/chat/getConversations');
// const getChatMessages = require('./routes/chat/getChatMessages');
// const sendChatMessage = require('./routes/chat/sendChatMessage');

// Set up middleware
app.use(express.json());

// Set up routes
// app.use('/api/users', registerUser);
// app.use('/api/users', loginUser);
// app.use('/api/users', logoutUser);
// app.use('/api/users', getProfile);
// app.use('/api/users', updateProfile);
// app.use('/api/users', deleteUser);

// app.use('/api/users', getRecommendations);
// app.use('/api/swipes', swipeRight);
// app.use('/api/swipes', swipeLeft);

// app.use('/api/matches', getMatches);
// app.use('/api/matches/:match_id/messages', getMessages);
// app.use('/api/matches/:match_id/messages', sendMessage);

// app.use('/api/conversations', getConversations);
// app.use('/api/conversations/:conversation_id/messages', getChatMessages);
// app.use('/api/conversations/:conversation_id/messages', sendChatMessage);

app.get('/', (req, res) => {
    res.send('Hello, World from Eric!');
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
