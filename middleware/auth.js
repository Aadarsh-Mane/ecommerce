import jwt from 'jsonwebtoken';
import User from '../models/registerSchema.js';

const secretKey = 'adddy'; 

export default async function authMiddleware(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
}
