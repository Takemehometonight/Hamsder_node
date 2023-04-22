const express = require('express');
const app = express();

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
