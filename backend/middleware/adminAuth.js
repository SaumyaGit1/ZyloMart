import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
    }

    if (token.startsWith('Bearer ')) {
      token = token.split(' ')[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email, password } = decoded;

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(403).json({ success: false, message: 'Forbidden: Not Authorized' });
    }

    next();
  } catch (err) {
    console.error('Error in adminAuth middleware:', err);
    res.status(401).json({ success: false, message: 'Invalid Token or Authorization Error' });
  }
};

export default adminAuth;
