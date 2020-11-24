var test = require('tape');
var util = require('util');
var genericSequeliseError = require('../');
var errors = require('generic-errors');

var BaseError = function (message) {
    this.message = message;
};
var ValidationError = function (message) {
    this.message = message;
};
var DatabaseError = function (message) {
    this.message = message;
};
var TimeoutError = function (message) {
    this.message = message;
};
var UniqueConstraintError = function (message) {
    this.message = message;
};
var ForeignKeyConstraintError = function (message) {
    this.message = message;
};
var ExclusionConstraintError = function (message) {
    this.message = message;
};
var ConnectionError = function (message) {
    this.message = message;
};
var ConnectionRefusedError = function (message) {
    this.message = message;
};
var AccessDeniedError = function (message) {
    this.message = message;
};
var HostNotFoundError = function (message) {
    this.message = message;
};
var HostNotReachableError = function (message) {
    this.message = message;
};
var InvalidConnectionError = function (message) {
    this.message = message;
};
var ConnectionTimedOutError = function (message) {
    this.message = message;
};
var InstanceError = function (message) {
    this.message = message;
};
util.inherits(BaseError, Error);
BaseError.prototype.get = function (key) {
    return this.fields[key];
};
util.inherits(ValidationError, BaseError);
util.inherits(DatabaseError, BaseError);
util.inherits(TimeoutError, BaseError);
util.inherits(UniqueConstraintError, ValidationError);
util.inherits(ForeignKeyConstraintError, DatabaseError);
util.inherits(ExclusionConstraintError, DatabaseError);
util.inherits(ConnectionError, BaseError);
util.inherits(ConnectionRefusedError, ConnectionError);
util.inherits(AccessDeniedError, ConnectionError);
util.inherits(HostNotFoundError, ConnectionError);
util.inherits(HostNotReachableError, ConnectionError);
util.inherits(InvalidConnectionError, ConnectionError);
util.inherits(ConnectionTimedOutError, ConnectionError);
util.inherits(InstanceError, BaseError);

var testSequelize = {
    Error: BaseError, // For some reason Sequelize has chosen not to document this name change
    ValidationError,
    DatabaseError,
    TimeoutError,
    UniqueConstraintError,
    ForeignKeyConstraintError,
    ExclusionConstraintError,
    ConnectionError,
    ConnectionRefusedError,
    AccessDeniedError,
    HostNotFoundError,
    HostNotReachableError,
    InvalidConnectionError,
    ConnectionTimedOutError,
    InstanceError,
};

test('module loading', function (t) {
    t.plan(5);

    var boundGeneric = genericSequeliseError(testSequelize);

    var testError = new testSequelize.Error('some message');

    t.equal(typeof genericSequeliseError, 'function', 'module is a function');
    t.equal(genericSequeliseError.length, 2, 'takes two arguments');
    t.equal(typeof boundGeneric, 'function', 'bound convertion function');
    t.equal(boundGeneric.length, 1, 'takes 1 argument');
    t.deepEqual(
        boundGeneric(testError),
        genericSequeliseError(testSequelize, testError),
        'bound and unbound invocation are equal'
    );
});

test('return error unchanged if not a Sequelize error object', function (t) {
    t.plan(1);

    var boundGeneric = genericSequeliseError(testSequelize);

    var testError = new Error('error');

    t.equal(boundGeneric(testError), testError, 'unaltered error');
});

test('converts sequelize error type to generic-error type', function (t) {
    t.plan(3);

    var testError = new testSequelize.Error('some message');
    var expectedError = new errors.BaseError({ message: 'some message' });
    var expectedType = errors.BaseError;

    var boundGeneric = genericSequeliseError(testSequelize);
    t.ok(boundGeneric(testError), 'ok result');
    t.ok(boundGeneric(testError) instanceof expectedType, 'ok prototype');
    t.deepEqual(boundGeneric(testError), expectedError, 'correct error');
});

test('Validation error converts to an Unprocessable, with individual field errors', function (t) {
    t.plan(1);

    var boundGeneric = genericSequeliseError(testSequelize);

    var testError = new ValidationError();
    testError.fields = { what: [{ message: 'what' }] };
    var expectedError = new errors.Unprocessable({ fields: { what: ['what'] } });

    t.deepEqual(boundGeneric(testError), expectedError, 'correct error');
});
