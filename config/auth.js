module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      // res.redirect('/dashboard');
      return next();
    } else {
      res.redirect('/login');
    }
  }
}
