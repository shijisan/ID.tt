const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.JWT_SECRET; 

// Generate token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, secret, { expiresIn: '1h' });
};

// Middleware for token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get token from header

  if (!token) return res.status(403).json({ error: 'No token provided' });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Failed to authenticate token' });
    req.userId = decoded.id; // Attach user ID to request
    next();
  });
};

module.exports = { generateToken, verifyToken };
