var errors = require('generic-errors');

function convert(Sequelize, error) {
    var fields = [];
    if (error instanceof Sequelize.ValidationError) {
        fields = Object
            .keys(error.fields)
            .reduce(function (acc, key) {
                acc[key] = error.get(key).map((fieldError) => fieldError.message);
                return acc;
            }, {});
        return new errors.Unprocessable({
            fields,
        });
    }
    if (error instanceof Sequelize.Error) {
        return new errors.BaseError({ message: error.message });
    }
    return error;
}

module.exports = function (Sequelize, error) {
    if (!error) {
        return convert.bind(null, Sequelize);
    }
    return convert(Sequelize, error);
};
