var mongoose = require('mongoose')
  , ifitAuth = require('ifit-auth')
  , config = require('../config')
  , Schema = mongoose.Schema
  , ObjectId = mongoose.SchemaTypes.ObjectId
  , models = require('./');


var UserSchema = new Schema({
  ifit: {
    id: String,
    created: { type: Date, 'default': Date.now },
  }
});

UserSchema.index({ 'ifit.id': 1 }, { unique: true });

UserSchema.statics.findOrCreateUser = ifitAuth.findUserById = function (userId, callback) {
  models.User.findOne({'ifit.id': userId}, function(err, doc) {
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

module.exports = UserSchema;
