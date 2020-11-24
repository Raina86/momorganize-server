# generic-sequelize-errors

BYO Sequelize version to match against.

## Usage

```javascript
var Sequelize = require('sequelize');
var genericSequelizeErrors = require('generic-sequelize-errors');

var sequelizeError = new Sequelize.ValidationError('some error that\'s been returned from Sequelize');
// Either use with two arguments, the Sequelize version your project needs and the error
var genericErrorTwoArgs = genericSequelizeErrors(Sequelize, sequelizeError);
// Or by only supplying the Sequelize object a bound function is returned
var boundGeneric = genericSequelizeErrors(Sequelize);
var genericErrorBound = boundGeneric(sequelizeError);
```

This will resort in the same type of generic error being produced.
