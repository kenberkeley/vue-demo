module.exports = function (req, res, next) {
  
  if (req.session.userData) {
    return next({ _status: 403, _msg: 'You have already logged in' });
  }

  next();
};
