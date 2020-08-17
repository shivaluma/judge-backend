module.exports = (req, res, next) => {
  if (req.user.role != 'super_admin' && req.user.role != 'forum_admin') {
    return res.status(403).json({
      message: 'You do not have permission!',
      error: error.message,
    });
  }
  next();
};
