// Create a new user
const createUser = (pool) => async (req, res) => {
    // Extract fields from request body
    const { name, email, password } = req.body;
  
    try {
      // Check if user already exists
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length > 0) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      // Create new user
      await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
  
      res.json({ msg: 'User created successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };
  