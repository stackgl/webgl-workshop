# @workshop/exercise

Common exercise operations. Feel free to extend!

## Usage

Create an exercise instance like so:

``` javascript
var exercise = require('@workshop/exercise')(require('./package.json').name)
```

## API

### exercise.passed

Will be true if the student has passed this exercise, otherwise false.

### exercise.attempt(success)

To be called with `success` being either `true` or `false`. The following are
mostly equivalent:

``` javascript
exercise.passed = true
exercise.attempt(true)
```

However `.attempt` will not "unpass" a lesson, and as such it's recommended to
change it this way instead of using `exercise.passed` unless you explicitly want
to revert the lesson state.

### exercise.on('attempt', fn(success))

Emitted when `exercise.attempt` is called.
