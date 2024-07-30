import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import mysql from 'mysql2/promise';
import authRoutes from './routes/authRoutes.js';

// Initialize the app
const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
const db = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'idtt',
  password: 'admin123'
});

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files from build
app.use(express.static(path.join(__dirname, '../build')));

// API routes
app.use('/api/auth', authRoutes);

// Serve index from build
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, '../build', 'index.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Server Error');
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
 