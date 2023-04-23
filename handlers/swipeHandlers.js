const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

console.log("swipe api request received")

const swipeRight = (pool) => async (req, res) => {
    // Extract fields from request body
    let { user_id, swiped_user_id} = req.body;
    user_id = user_id;
    swiped_user_id = swiped_user_id;


    try{
        pool.query("INSERT INTO swipes (user_id, swiped_user_id, is_like) VALUES (?, ?, true) ", [user_id, swiped_user_id]);
        res.json({ msg: 'swipe right successfully recorded' });
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }



};

const swipeLeft = (pool) => async (req, res) => {
    // Extract fields from request body
    let { user_id, swiped_user_id} = req.body;
    user_id = user_id;
    swiped_user_id = swiped_user_id;


    try{
        pool.query("INSERT INTO swipes (user_id, swiped_user_id, is_like) VALUES (?, ?, false) ", [user_id, swiped_user_id]);
        res.json({ msg: 'swipe left successfully recorded' });
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }


};


// Export functions
module.exports = router;
module.exports = {
    swipeRight,
    swipeLeft
  };
