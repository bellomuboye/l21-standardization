const _ = require("lodash");
const Joi = require("joi");
const Schemas = require("./schemas");

module.exports = (req, res, next) => {
  // useJoiError determines if we should respond with the base Joi error
  // boolean: defaults to true
  const _useJoiError = true;

  // enabled HTTP methods for request data validation
  const _supportedMethods = ["post", "put"];

  // Joi validation options
  const _validationOptions = {
    abortEarly: false, // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true, // remove unknown keys from the validated data
  };

  // return the validation middleware
    const route = req.route.path;
    const method = req.method.toLowerCase();

    if (_.includes(_supportedMethods, method) && _.has(Schemas, route)) {
      // get schema for the current route
      const _schema = _.get(Schemas, route);

      if (_schema) {
        // Validate req.body using the schema and validation options
        return Joi.validate(req.body, _schema, _validationOptions, (err, data) => {
            if (err) {
              // Joi Error
              const JoiError = {
                error: true,
                message: "invalid request data",
                data: {
                  original: err._object,
                  // fetch only message and type from each error
                  details: _.map(err.details, ({ message, type }) => ({
                    message: message.replace(/['"]/g, ""),
                    type,
                  })),
                },
              };

              // Custom Error
              const CustomError = {
                error: true,
                message: "invalid request data",
              };
              // Send back the JSON error response
              res.status(422).json(_useJoiError ? JoiError : CustomError);
            } else {
              // Replace req.body with the data after Joi validation
              req.body = data;
              next();
            }
          }
        );
      }
    }
    next();
  ;
};
