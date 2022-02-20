// jshint esversion:8

module.exports = async (schema, body) => {
  try {
    // if the validation succeded it will return the processed data
    const data = await schema.validateAsync(body);
    // return the data and ok
    return {
      ok: true,
      data,
    };
  } catch (err) {
    // gets the error message out of the joi error
    const { message } = err.details[0];
    //  respond with error to the client
    return {
      ok: false,
      status: 422,
      error: message,
    };
  }
};
