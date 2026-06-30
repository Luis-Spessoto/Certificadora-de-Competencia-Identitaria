const notFound = require("./notFound");
const badRequest = require("./badRequest");
const serverError = require("./serverError");

module.exports = {
  NotFound: notFound,
  BadRequest: badRequest,
  ServerError: serverError
};
