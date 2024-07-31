const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const multer = require('multer');
const routes = require('./routes/routes.cjs');
const { generateToken, verifyToken } = require('./jwtUtils.cjs');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Serve static files from the build directory
const buildPath = path.join(__dirname, '../dist');
app.use(express.static(buildPath));

// Serve static files from the uploads directory
const uploadsPath = path.join(__dirname, './uploads');
app.use('/uploads', express.static(uploadsPath));

// Database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Function to get LRN from the database using user ID
function getLRN(userId, callback) {
  connection.query('SELECT lrn FROM students WHERE id = ?', [userId], (err, results) => {
    if (err) return callback(err);
    if (results.length > 0) {
      callback(null, results[0].lrn);
    } else {
      callback(new Error('LRN not found for this user'));
    }
  });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    if (!req.userId) {
      return cb(new Error('User not authenticated'), false);
    }

    getLRN(req.userId, (err, lrn) => {
      if (err) return cb(err);
      cb(null, `${lrn}${path.extname(file.originalname)}`);
    });
  }
});

const upload = multer({ storage: storage });

// Upload route
app.post('/upload', verifyToken, upload.single('userImage'), (req, res) => {
  res.send('File uploaded and overwritten successfully.');
});

// Route to get profile picture URL
app.get('/api/profilepic', verifyToken, (req, res) => {
  getLRN(req.userId, (err, lrn) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    // Construct the URL to fetch the profile image
    const imageUrl = `/uploads/${lrn}.jpg`; // Adjust the extension if necessary
    res.json({ imageUrl });
  });
});

// Use the routes defined in routes.cjs
app.use('/api', routes); // Prefix 'api'

// Serve index
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Connect to the database and start the server
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
