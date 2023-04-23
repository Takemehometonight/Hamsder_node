const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

console.log("swipe api request received")

const swipeRight = (pool) => async (req, res) => {
    try{
        pool.query("INSERT INTO swipes (id, user_id, swiped_user_id, is_like) VALUES (1, 1,2, true)");
        res.json({ msg: 'swipe right successfully recorded' });
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }



};


// Export functions
module.exports = router;
module.exports = {
    swipeRight
  };
