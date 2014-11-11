Lokai
======

The front-end server and client for the Gamefest platform.

Prerequisites
------

* [NodeJS Server](http://nodejs.org/download/)
    * [npm](https://www.npmjs.org/)

First Run
------

1. Open a terminal in the directory root
2. Install Grunt and its cli for the command line -- `npm install g- grunt` then `npm install -g grunt-cli` (use `sudo` if on *nix)
3. Install Bower -- `npm install -g bower` (use `sudo` if on *nix)
2. Run `npm install` to download the components needed by npm.
3. Run `bower install` to download the components needed for the app.

**Note**: If, upon running `grunt`, you get any errors about missing packages you can use `npm-install-missing` to ensure everything is installed.

1. Install `npm install -g npm-install-missing`
2. Run `npm-install-missing`

Running The App
------

There are two environments: **dev** and **prod**.

### Dev

Run `grunt server:dev` to start the development environment. This will

1. Process your LESS and compile it to `app.css` in the /css folder
2. Add your bower dependencies to `index.html` in the the appropriate blocks
3. Annotate your angular js files so they can be safely minified later
4. Configure a proxy for the back-end, start the livereload server, and `watch` your project folders
5. Open a webpage for gamefest

### Prod

Run `grunt server:dist` to generate a production environment. This task will

* Clean the current /dist folder (if any)
* Perform steps 1-3 of `server:dev`
* Copy your dev environment to /dist (will create if doesn't exist)
* Execute `usemin` to concatenate and minify your js and css resources as well as configure `index.html` to work with the new environment.

To use the production environment run `node server.js --env=prod` from the root directory.

**Note**: You need to have SSL certs in the root directory AS WELL AS permissions to use ports 80 and 443 to run `--env=prod`. If you do not have these you can use omit the flag to run node with dev settings.
