const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.JWT_SECRET; 

// generate token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, secret, { expiresIn: '1h' });
};

// Middleware for token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'No token provided' });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Failed to authenticate token' });
    req.userId = decoded.id; 
    next();
  });
};

module.exports = { generateToken, verifyToken };
