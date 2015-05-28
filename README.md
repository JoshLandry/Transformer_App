# Image Transphormer by Josh Landry
This is an art application, with many options for creatively transforming image files by scrambling their color palettes, and more.

First, run `npm install` and `bower install` to install all the app's dependencies with both npm and bower.

Now, you have to build the app using Grunt.  Type `grunt build` into the command line from the root directory of the app.

Next, make sure there is an empty folder in the app directory called `db`, then run mongod using `mongod --dbpath=./db --smallfiles` in the cloned repo of this app.  Then, start the server with node using the command `node server.js`.  Then, open your browser and type `localhost:3000` into the URL.

You should then see the Image Transphormer app mainscreen.  The top half of the screen has two links, which allow you to upload a new image with the upload form, or choose an image to edit from all images in the database.  The bottom half of the page will tell the user 'welcome' until they have chosen one of these options.

Currently, the Transphormer has 3 different 'transphorms', Invert, Randomize, and Colorstep.
  
  'Invert' inverts the colors on your image, much like in mspaint.

  'Randomize' will randomly shuffle the color table for your image, causing the colors to swap unpredictably.  This should produce some interesting results.

  'Colorstep' shifts every color in your image's color palette over by one.  Doing this repeatedly should produce a sequential change in color.