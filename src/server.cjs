// src/server.cjs
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const routes = require('./routes/routes.cjs'); // Adjust path as necessary
const { generateToken, verifyToken } = require('./jwtUtils.cjs'); // Import JWT utils

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Serve static files from the 'dist' directory
const buildPath = path.join(__dirname, '../dist');
app.use(express.static(buildPath));

// Use the routes defined in routes.cjs
app.use('/api', routes); // Prefix all routes with '/api'

// Serve index.html for all other routes (client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Connect to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to db.', err.stack);
    return;
  }
  console.log('Connected to db as id', connection.threadId);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
