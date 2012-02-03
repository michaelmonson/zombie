var mongoose = require('mongoose')
  , mongooseAuth = require('mongoose-auth')
  , nconf = require('nconf')
  , Schema = mongoose.Schema
  , ObjectId = mongoose.SchemaTypes.ObjectId;

// Set up the schema
var UserSchema = new Schema({})
  , User;

// Setup authentication plugins to use local and FB
UserSchema.plugin(mongooseAuth, {
    everymodule: {
      everyauth: {
          User: function () {
            return User;
          }
      }
    }
  , facebook: {
      everyauth: {
          myHostname: 'http://localhost:3000'
        , appId: nconf.get('YOUR-REPO-NAME').facebook.appId
        , appSecret: nconf.get('YOUR-REPO-NAME').facebook.appSecret
        , redirectPath: '/user/chat'
      }
    }
  , password: {
        loginWith: 'email'
      , extraParams: {
          name: {
                first: String
              , last: String
            }
        }
      , everyauth: {
            getLoginPath: '/login'
          , postLoginPath: '/login'
          , loginView: 'user/login'
          , getRegisterPath: '/register'
          , postRegisterPath: '/register'
          , registerView: 'user/register'
          , loginSuccessRedirect: '/user/chat'
          , registerSuccessRedirect: '/user/chat'
        }
    }
});


// Register the model into mogoose, and pass that as the exports
module.exports = User = mongoose.model('User', UserSchema);
