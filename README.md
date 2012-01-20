Node Boilerplate 
=================

Heavily modifed version of [this](https://github.com/robrighter/node-boilerplate)

*Requires Node v0.6.6 (or newer)*
node-boilerplate takes html-boilerplate, express, connect, jade, mongoose, mongoose-auth, and Socket.IO and organizes them into a ready to use website project. Its a fast way to get working on your Node website without having to worry about the setup. It takes care of all the boring parts, like setting up your views, 404 page, 500 page, getting the modules organized, etc... 

###Node Boilerplate has these goals:

1. To end the repetition involved with starting a new Node website project
2. To never install anything outside of the project directory (For easier production deployment)
3. Quickly show best partices in regards to project organization, and code formating

###Project oranaization

The project is organized into a traditional mvc pattern.  

- Models are in the `./models` directory.  By adding a reference in model.js to a new model, that model is initialized at boot.  Another advantage of this is that by including a single model instance, all models are available via something like `model.User`
- Views are in the `./views` directory and should be organized into directories and files that match their route files.
- Controllers are are located in `./controllers`. By creating a new `controller.js` file, and exporting a paramerterless `init()` method, all routes are automatically initialized with no modifications to routes.js.

Other important files that have convential meaning

- `server.js` is the default name for starting the application.  This comes from Joyent's cloud server default configuration.
- `packages.js` holds all the dependencies for the project.  Any packages references in code should be initialized through here, and not installed globally

###Tools of Choice

- While most people will have a unique editor that they enjoy most (VIM, TextMate, etc), [Aptana 3](http://aptana.com/) is a great solution.
- [Supervisor](https://github.com/isaacs/node-supervisor) is a great tool to auto relaunch the application
- [NodeInspector](https://github.com/dannycoates/node-inspector) is a great browser based debuger if you can't log items out

###Modules Used

- [Express](http://expressjs.com/) - Web framework (includes [connect](http://senchalabs.github.com/connect/))
- [Jade](http://jade-lang.com/) - Javascript based templating engine
- [Mongoose](http://mongoosejs.com/) - Node.JS driver and wrapper for MongoDB
- [MongooseAuth](https://github.com/bnoguchi/mongoose-auth) - MongoDB based authentication system, based on [everyauth](https://github.com/bnoguchi/everyauth)
- [Socket.IO](http://socket.io) - Real time web framework.  Websockets with fall back strategies.
- [Backbone](http://documentcloud.github.com/backbone/) - Client side MVC framework
- [nConf](https://github.com/flatiron/nconf) - Node configuration helper
- [Mocha](http://visionmedia.github.com/mocha/) - Unit testing framework
- [Should](https://github.com/visionmedia/should.js) - Helper module to BDD assertions

###Code format

Formating code is good practice.  In large development teams, have well formated code makes working together easier.  This section is very open to contribution, and most of the code starndard should be very visable though the boilerplate code.  These conventions are chosen to match the language, and the node.js community convention.

Use spaces and not tabs.  This is an easy change in the settings of Aptana to replace tabs with spaces (2).

Declare new variables with comma's on the same line. This goes against most node.js convention, but adheres to standard javascript convention.  This is important to have the comma on the same line for older browser compatability if we are repurposing any code to the client.  For example:

    var util = require('util'),
      express = require('express');

Curly braces should be inline, eq `exports.myFunc = new function(){`. They should not be declared on a seperate line.
	
In general, everything should conform to JSLint tests where possible.

###To start a boilerplate project:
    
    git clone git@github.com:ifit/node-boilerplate.git mynewproject
    cd mynewproject
    rm -rf .git README.md
    npm install
    
This will copy all of the required project files, and remove the reference to this git repo so you can start your own, and install the required packages


###To run the boilerplate template app:

Make sure that you have a mongoDB service running, if it is not running by default enter `mongod` into a terminal window

In a seperate terminal window start the server by entering `node server.js`

Go to http://localhost:3000 and login via facebok or local.  Once you are logged in you can send simple chat messages to yourself.


###Additional Features:

1. Creates a package.json file consistent with associated best practices (http://blog.nodejitsu.com/package-dependencies-done-right)
2. Adds .gitignore for the node_modules directory
3. Includes 404 page and associated route
4. Includes 500 page
5. Loads external config vars using [nconf](https://github.com/flatiron/nconf) from env vars, shell vars, and confi file vars
6. Automatic route loading
7. Authentecation built in
8. Ready for unit tests

###Todos:

1. Cleanup HTML5 Boilerplate and css includes to not be so intrusive
2. Documentation generator
3. Basic redis implementation (a cache would be a good starting point)
4. ..