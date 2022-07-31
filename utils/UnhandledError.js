class UnauthorizedError extends Error {
  constructor(message, error) {
    super();
    this.code = 500;
    this.error = error;
    this.message = message;
  }
}

module.exports = UnauthorizedError;