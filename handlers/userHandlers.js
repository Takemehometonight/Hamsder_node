const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

console.log("user api request received")
const createUser = (pool) => async (req, res) => {
    // Extract fields from request body
    let { name, email, password, profile_picture } = req.body;
    name = name || null;
    email = email || null;
    password = password || null;
    profile_picture = profile_picture || null;
    console.log(`user email: ${email}` );
    try {
      // Check if user already exists
      const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length > 0) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      // Create new user
      await pool.execute('INSERT INTO users (name, email, password, profile_picture) VALUES (?, ?, ?, ?)', [name, email, password, profile_picture]);
  
      res.json({ msg: 'User created successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
};

const loginUser = (pool) => async (req, res) => {
    console.log("login handler called")
    let { email, password } = req.body;
    email = email || null;
    password = password || null;
    try {
      // Check if user exists
      const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length === 0) {
        return res.json({ success: false });
      }
  
      // Check if password is correct
      const user = rows[0];
      // const isMatch = await bcrypt.compare(password, user.password);
      if (password != user.password) {
        return res.json({ success: false });
      }
  
      res.json({ success: true });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };


  const getUserProfile = (pool) => async (req, res) => {
    const { id } = req.params;
  
    try {
      // Get user by ID
      const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      const user = rows[0];
  
      // Return user profile
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
        // add any other properties you want to return
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };



// Export functions
module.exports = router;
module.exports = {
    createUser,
    loginUser,
  };
