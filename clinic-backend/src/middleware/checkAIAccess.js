const User = require('../models/User');

const checkAIAccess = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.plan !== 'pro') {
      return res.status(403).json({ message: 'AI feature requires Pro plan' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = checkAIAccess;