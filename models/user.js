var mongoose = require('mongoose')
  , ifitAuth = require('ifit-auth')
  , config = require('../config')
  , Schema = mongoose.Schema
  , ObjectId = mongoose.SchemaTypes.ObjectId
  , User;


var UserSchema = new mongoose.Schema({
  ifit: {
    id: String,
    created: { type: Date, 'default': Date.now },
  }
});

UserSchema.index({ 'ifit.id': 1 }, { unique: true });

// Register the model into mogoose, and pass that as the exports
module.exports = User = UserSchema;

module.exports.findOrCreateUser = ifitAuth.findUserById = function (userId, callback) {
  User.findOne({'ifit.id': userId}, function(err, doc) {
    if (err) {
      return callback(err, null);
    }
    
    if(doc) {
      return callback(null, doc);
    }
    
    var user = new User();
    user.ifit.id = userId;
    user.save(function (err) {
      if (err) return callback(err, null);
      return callback(null, user);
    });       
  });  
};
