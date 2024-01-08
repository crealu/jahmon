const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {
  findUser: async (req, res) => {
    return null;
    // return await User.findById(req.session.passport.user)
    //   .then(user => {
    //     return user.username;
    //   })
  }
}
