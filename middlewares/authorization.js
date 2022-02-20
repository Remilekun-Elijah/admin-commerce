// jshint esversion:6
const helper = require("../utils/helper");
const error = require("../utils/responses/error");

exports.loginAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const isVerified = helper.verifyToken(token);

    if (isVerified === "token_expired" || isVerified === "invalid_signature")
      res.status(error("UNA").status).json(error("UNA"));
    else {
      res.locals.email = isVerified.email;
      next();
    }
  } else {
    return res
      .status(error("UNA").status)
      .json(error("UNA", "Access Denied!, Please proceed to the login page"));
  }
};

// exports.authRole = async (req, res, next) => {
//   const { id } = res.locals.user;
//   // Get the role of the user
//   const role = await getRole(id);
//
//   // Check if role is user
//   if (role === "user") {
//     // Deny access to the route
//     return res.status(401).json({ ok: false, message: "Not Allowed" });
//   }
//   next();
// };
