import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  console.log('Headers received:', req.headers); // Debug log for headers

  // Extract the Authorization header
  const authHeader = req.headers['authorization']; 

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authorization header missing or improperly formatted' });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token not provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id; // Attach user data to request
    next(); // Proceed to the next middleware or controller
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default authUser;