// const route = require("express").Router();
// const path = require("path");
// const user = require("./handler");
// const { loginAuth, authRole } = require(path.resolve("middlewares/authorization"));
// const { upload } = require(path.resolve("services/file_upload/localUpload"));
//
// route.post("/user", user.createUser);
// route.post("/bar", user.createBar);
// route.post("/login", user.login);
// route.get("/profile", loginAuth, user.getProfile);
// route.patch("/profilePhoto", loginAuth, upload, user.updateProfilePhoto);
// route.get("/verify", user.verifyRegisteration);
// route.post("/resendVerification", loginAuth, user.resendVerification);
// route.delete("/user", loginAuth, user.delete);
//
// route.put("/resetPassword", user.resetPassword);
// route.get("/resetPassword/confirm", user.confirmPassword);
// route.patch("/changePassword", loginAuth, user.changePassword);
// route.get("/user/:id", loginAuth, authRole, user.getUserProfileById);
//
//
// module.exports = route;
