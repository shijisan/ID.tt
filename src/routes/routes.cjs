const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { generateToken, verifyToken } = require('../jwtUtils.cjs');

dotenv.config();

const saltRounds = 10;
const secret = process.env.JWT_SECRET;

// Create MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Middleware to parse JSON bodies
router.use(express.json()); 

// Helper functions
const hashPassword = (password) => bcrypt.hash(password, saltRounds);
const comparePassword = (plainPassword, hashedPassword) => bcrypt.compare(plainPassword, hashedPassword);



// Register route
router.post('/register', async (req, res) => {
  const { first_name, last_name, email, lrn, school_id, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    connection.query(
      'INSERT INTO students (first_name, last_name, email, lrn, school_id, password) VALUES (?, ?, ?, ?, ?, ?)',
      [first_name, last_name, email, lrn, school_id, hashedPassword],
      (err, result) => {
        if (err) {
          console.error('Error inserting user:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.status(201).json({ message: 'User created successfully' });
        }
      }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  connection.query(
    'SELECT id, password FROM students WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) {
        console.error('Error querying user:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (results.length === 0) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }

      const userId = results[0].id;
      const hashedPassword = results[0].password;
      try {
        const isMatch = await comparePassword(password, hashedPassword);

        if (isMatch) {
          const token = generateToken(userId);
          res.status(200).json({ message: 'Login successful', token });
        } else {
          res.status(401).json({ error: 'Invalid email or password' });
        }
      } catch (error) {
        console.error('Error comparing passwords:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  );
});

// Logout route (for token invalidation)
router.post('/logout', (req, res) => {
  // logout function on client side
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
