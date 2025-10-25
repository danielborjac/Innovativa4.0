const { verifyAccessToken } = require('../utils/jwt');

module.exports = (requiredRoles = []) => (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ ok: false, message: 'No token' });

    const token = auth.split(' ')[1];
    const payload = verifyAccessToken(token);
    req.user = payload; // contains sub, email, role
    if (requiredRoles.length && !requiredRoles.includes(payload.role)) {
      return res.status(403).json({ ok: false, message: 'Forbidden' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, message: 'Invalid token' });
  }
};
