class UnauthorizedError extends Error {
  constructor(message) {
    super();
    this.code = 404;
    this.message = message;
  }
}

module.exports = UnauthorizedError;