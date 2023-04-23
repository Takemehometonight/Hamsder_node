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

const getRecommendedUsers = (pool) => async (req, res) => {
    const { id } = req.params;
    temp_id = id;
    console.log(temp_id)
    try{


    const [rows] = await pool.execute('SELECT * FROM swipes WHERE user_id = ?', [id]);
    if (rows.length > 0) {
        console.log(temp_id)
        const user = rows[rows.length - 1];
        console.log(user)
        cur_id = user.swiped_user_id;
        console.log(cur_id)
        //console.log("trouble incoming")
        // var prev_id;
        // pool.query('SELECT MAX(swiped_user_id) FROM swipes WHERE user_id = ?', [temp_id], function (err, result, fields) {
        //     if (err) throw err;
        //     console.log(result.rows[0]);
        //     prev_id = result.rows[0];
        //   });
        //   console.log("not bad")
   
        // //const user_temp = rows_2[0];
        // //final_id = user_temp.id;    // get the max swiped_user_id
        //console.log("query go")

        const [rows_2] = await pool.execute('SELECT * FROM users WHERE id = ?', [cur_id+1]);
        const user_2 = rows_2[0];
                // Return user profile
        res.json({
          id: user_2.id,
          name: user_2.name,
          email: user_2.email,
          createdAt: user_2.createdAt
          // add any other properties you want to return
        });
        // var final_id = cur_id + 1;
        // console.log(final_id)
        // pool.query('SELECT * FROM users WHERE id = ?', [final_id], function (err, result, fields) {
        //     if (err) throw err;
        //     console.log(result);
        //     res.json({
        //         id: result.id,
        //         name: result.name,
        //         email: result.email,
        //         createdAt: result.createdAt
        //         // add any other properties you want to return
        //       });
        //   });

    }
    else{



          const [rows] = await pool.execute('SELECT * FROM users WHERE id = 1');
          console.log("here we are")
          const user = rows[0];
                // Return user profile
        res.json({
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt
          // add any other properties you want to return
        });
    }
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }

  
    // try {
    //     //console.log("trying to get prev highest swipe id")
    //   // Get the id of the highest previously swiped_user_id

    //     const [prev_id] = await pool.execute('SELECT MAX(swiped_user_id) FROM swipes WHERE user_id = ?', [id]);
    //     console.log("trying to get prev highest swipe id")
    //   if (prev_id[0] == 0) { //start from user_1 && not this_user_id  
    //     const [rows] = await pool.execute('SELECT * FROM users WHERE id = 1');
    //     console.log("here we are")
    //     const user = rows[0];
    //           // Return user profile
    //   res.json({
    //     id: user.id,
    //     name: user.name,
    //     email: user.email,
    //     createdAt: user.createdAt
    //     // add any other properties you want to return
    //   });
    //   }
    //   else{
    //     const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [prev_id+1]);
    //     const user = rows[0];
    //           // Return user profile
    //   res.json({
    //     id: user.id,
    //     name: user.name,
    //     email: user.email,
    //     createdAt: user.createdAt
    //     // add any other properties you want to return
    //   });
    //   }
  
      
    // } catch (error) {
    //   console.error(error.message);
    //   res.status(500).send('Server Error');
    // }
  };



// Export functions
module.exports = router;
module.exports = {
    swipeRight,
    swipeLeft,
    getRecommendedUsers
  };
