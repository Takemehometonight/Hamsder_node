const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

console.log("match api request received")

const getAllMatches = (pool) => async (req, res) => {
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
    getAllMatches
  };
