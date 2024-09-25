const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    const decoded = jwt.verify(token, 'Shiva@45');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
