
var mongoose = require('mongoose'), 
//    mongooseAuth = require('mongoose-auth'), 
    nconf = require('nconf'),
    Schema = mongoose.Schema, 
    ObjectId = mongoose.SchemaTypes.ObjectId;

module.exports = new Schema({
}); 

// Setup authentication plugins to use local and FB
//exports.plugin( 
////  mongooseAuth, 
//  {
//    everymodule: {
//      everyauth: {
//        User: function () {
//          return User;
//        }
//      }
//    }, 
//    password: {
//      loginWith: 'email', 
//      everyauth: {
//        getLoginPath: '/login',
//        postLoginPath: '/login',
//        loginView: 'user/login',
//        getRegisterPath: '/register',
//        postRegisterPath: '/register',
//        registerView: 'user/register',
//        loginSuccessRedirect: '/user/chat',
//        registerSuccessRedirect: '/user/chat'
//      }
//    }
//  });


