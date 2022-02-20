//jshint esversion: 6
/**
@description - Generate responses based on passed params
@param {STRING} type - The type of response e.g ULI
@param {STRING} data - The data you wish to send out
@param {STRING} token - Token to be sent out if type is ULI
@returns {OBJECT} Returns an object containing ok, msg, data and or token
**/
module.exports = (type, data, token) => {
  let output;
  switch (type) {
    case "ULI": // User Logged In
      output = {
        ok: true,
        msg: "User logged in successfully!",
        data,
        token,
        status: 200,
      };
      break;
    case "UAC": // User Account Created
      output = {
        ok: true,
        msg: "Account created successfully!",
        data,
        status: 201,
      };
      break;

    case "UAV": // User Account Verified
      output = {
        ok: true,
        msg: "User account successfully verified!",
        data,
        status: 200,
      };
      break;
    case "VLG": // Verification Link Generated
      output = {
        ok: true,
        msg: "Your verification link has been sent to your mail!",
        data,
        status: 200,
      };
      break;

    default:
      output = {
        ok: false,
        msg: "An error occured",
        status: 500,
      };
  }

  return output;
};
