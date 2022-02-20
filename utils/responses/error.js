//jshint esversion: 6
module.exports = (type, msg) => {
  const error = (msg) => new Error(msg);
  let output;
  switch (type) {
    case "UNF": // User Not Found
      output = {
        ok: false,
        msg: msg || "User not found in our records!",
        status: 404,
      };
      break;
    case "PNF":
      output = {
        ok: false,
        msg: msg || "Product not found!",
        status: 404,
      };
      break;
    case "UAE":
      output = {
        ok: false,
        msg: msg || "User already exist in our records!",
        status: 409,
      };
      break;
    case "AOA": // Admin Only Area
      output = {
        ok: false,
        msg: msg || "You are restricted from accessing this area!",
        status: 403,
      };
      break;
    case "UNA": // User Not Authorized
      output = {
        ok: false,
        msg: msg || "Your session has expired!",
        status: 401,
      };
      break;
    case "UTE": // User Token Expired
      output = {
        ok: false,
        msg: msg || "This link has expired, please request a new one!",
        status: 410,
      };
      break;

    case "UAV": // User Already Verified
      output = {
        ok: false,
        msg: msg || "User already verified!",
        status: 400,
      };
      break;

    case "TMR": // Too Many Requests
      output = {
        ok: false,
        msg: msg || "Too many requests!",
        status: 429,
      };
      break;
    case "DNP": // Data Not Processable
      output = {
        ok: false,
        msg: msg || "Inputed data not processable!",
        status: 422,
      };
      break;
    case "FNS":
      output = {
        ok: false,
        msg: msg || "File not supported!",
        status: 415,
      };
      break;
    case "IAP": // Incorrect Account Password
      output = {
        ok: false,
        msg: msg || "Incorrect password!",
        status: 405,
      };
      break;

    default:
      output = {
        ok: false,
        msg: msg || "An error occured",
        status: 500,
      };
  }

  return output;
};
