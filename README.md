# WebGL Workshop

**WORK IN PROGRESS. Come back later? :)**

A boilerplate for creating your own frontend-focused
[NodeSchool](http://nodeschool.io/) lessons, not unlike
[shader-school](http://github.com/stackgl/shader-school).

Can be run as a vanilla node server, or bundled up as a node-webkit app. The
latter case is great for getting something installed without hitting the
terminal, among a bunch of other benefits. Currently only OSX is supported
this way, but I imagine it wouldn't be too hard to get the same working for
Windows/Linux – if you have some time to spare, pull requests would be very
much appreciated!

This forms the base of an upcoming WebGL workshop being created for
[CampJS](http://campjs.com/).

Parts of this may be refactored into independent packages in the future, but
right now I'm in a haste to get this together!

## Setup

Requires [npm](http://npmjs.org/) `2.x.x`.

``` bash
git clone git@github.com:hughsk/workshop-app-shell.git
cd workshop-app-shell
npm install
npm start
```

### Running the Server

``` bash
npm start
```

### Building the App

``` bash
make clean build
```

## Writing a New Exercise

In this project, each exercise is treated as an *independent* package, i.e. a
directory with its own `package.json` file, dependencies and so on. You're also
given almost full control with your exercise – it's essentially just a vanilla
route handler. See the [`exercises`](exercises) directory for a few existing
examples.

The steps are as follows:

1. Create a new directory in `exercises`. The name of this directory is not
   important.
1. Place a `package.json` file in there, with `main` pointing to `server.js` and
   the `name` being `@exercise/my-exercise-name`. This name will be used across
   the app to refer to the exercise in question (feel free to change that last
   part as you wish).
1. Copy `exercises/bare/server.js` into your new exercise directory.
1. Add an entry to `exercises.json`, where the key should be the exercise name
   as it appears on the menu and the value should be the same `name` property
   used in your `package.json`.
1. Run `npm install --save exercises/*` from the project root to update the
   exercise dependencies.

Next time you run the server you should be good to go!
