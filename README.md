Node Boilerplate 
=================

Heavily modified version of [this](https://github.com/robrighter/node-boilerplate)

*Requires Node v0.6.6 (or newer)*
node-boilerplate takes html-boilerplate, express, connect, jade, mongoose, mongoose-auth, and Socket.IO and organizes them into a ready to use website project. Its a fast way to get working on your Node website without having to worry about the setup. It takes care of all the boring parts, like setting up your views, 404 page, 500 page, getting the modules organized, etc... 

###Node Boilerplate has these goals:

1. To end the repetition involved with starting a new Node website project
2. To never install anything outside of the project directory (For easier production deployment)
3. Quickly show best practices in regards to project organization, and code formatting

###Project Organization

The project is organized into a traditional mvc pattern.  

- Models are in the `./models` directory.  By adding a reference in model.js to a new model, that model is initialized at boot.  Another advantage of this is that by including a single model instance, all models are available via something like `model.User`
- Views are in the `./views` directory and should be organized into directories and files that match their route files.
- Controllers are are located in `./controllers`. By creating a new `controller.js` file, and exporting a parameterless `init()` method, all routes are automatically initialized with no modifications to routes.js.

Other important files that have conventional meaning

- `server.js` is the default name for starting the application.  This comes from Joyent's cloud server default configuration.
- `app.js` is the application setup for express and middleware.
- `index.js` is the file that will be included when the project is used as a submodule. Expose any API methods here.
- `package.json` holds all the dependencies for the project.  Any packages references in code should be initialized through here, and not installed globally

###Tools of Choice

- While most people will have a unique editor that they enjoy most (VIM, TextMate, etc), [Aptana 3](http://aptana.com/) is a great solution.
-   > Aptana is a full-featured IDE, built on Eclipse.  It also has an integrated Terminal, debugger, and many other features.
- [Supervisor](https://github.com/isaacs/node-supervisor) is a great tool to auto relaunch the application
- [NodeInspector](https://github.com/dannycoates/node-inspector) is a great browser-based debugger if you can't log items out

###Modules Used

- [Express](http://expressjs.com/) - Web framework (includes [connect](http://senchalabs.github.com/connect/)).
- [Jade](http://jade-lang.com/) - Javascript based templating engine.
- [Mongoose](http://mongoosejs.com/) - Node.JS driver and wrapper for MongoDB.
- [MongooseAuth](https://github.com/bnoguchi/mongoose-auth) - MongoDB based authentication system, based on [everyauth](https://github.com/bnoguchi/everyauth).
- [Socket.IO](http://socket.io) - Real time web framework.  Websockets with fall back strategies.
- [Backbone](http://documentcloud.github.com/backbone/) - Client side MVC framework.
- [Confrodo](https://github.com/ifit/confrodo) - Node configuration helper.
- [Mocha](http://visionmedia.github.com/mocha/) - Unit testing framework.
- [Should](https://github.com/visionmedia/should.js) - Helper module to BDD assertions.
- [Less](http://lesscss.org/) - Less CSS compiler.

###Code format

Formatting code is good practice.  In large development teams, have well formatted code makes working together easier.  This section is very open to contribution, and most of the code standard should be very visible though the boilerplate code.  These conventions are chosen to match the language, and the node.js community convention.

Use spaces and not tabs.  This is an easy change in the settings of Aptana to replace tabs with spaces (2).

Declare new variables with commas on the same line. This goes against most node.js convention, but adheres to standard javascript convention.  This is important to have the comma on the same line for older browser compatibility if we are repurposing any code to the client.  For example:

    var util = require('util'),
      express = require('express');

Curly braces should be inline, eq `exports.myFunc = new function() {`. They should not be declared on a separate line.
	
In general, everything should conform to JSLint tests where possible.

###To start a boilerplate project:
    
    git clone git@github.com:ifit/node-boilerplate.git mynewproject
    cd mynewproject
    make new-project
    
This will copy all of the required project files, and remove the reference to this git repo so you can start your own, and install the required packages


###To run the boilerplate template app:

Make sure that you have a mongoDB service running, if it is not running by default enter `mongod` into a terminal window

In a seperate terminal window start the server by entering `make run`
This will start the supervisor that will start the server.

Go to http://localhost:3000 and login via facebook or local.  Once you are logged in you can send simple chat messages to yourself.

###Building

Before running the server in test or development mode, you need to run `make build` to compile javascript files.

Instead of modifying `views/layout.jade` to add javascript file, edit `public/js/config.json`. This let's the build know about your scripts and the order they are needed.

###To update to the latest boilerplate

When you want to bring your repo to the latest boilerplate code, run the following:

    git fetch git@github.com:ifit/node-boilerplate.git master:node-boilerplate-updates
    git checkout <your-working-repo>
    git merge node-boilerplate-updates
    # merge any conflicts
    make update

###Additional Features:

1. Creates a package.json file consistent with associated best practices (http://blog.nodejitsu.com/package-dependencies-done-right)
2. Adds .gitignore for the node_modules directory
3. Includes 404 page and associated route
4. Includes 500 page
5. Loads external config vars using [confrodo](https://github.com/ifit/confrodo) from env vars, shell vars, and config file vars
6. Automatic route loading
7. Authentication built in
8. Ready for unit tests

###ToDo's:

- Documentation generator
- ...
