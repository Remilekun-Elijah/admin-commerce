//jshint esversion: 6
const api = require("express").Router(),
  handler = require("./handler"),
  { loginAuth } = require("../../middlewares/authorization");

api.get("/signup", handler.displaySignupPage);
api.post("/signup", handler.createAccount);
api.post("/login", handler.loginAccount);
api.get("/account/verify", handler.verifyAccount);
api.post("/account/verify", loginAuth, handler.resendVerification);

module.exports = api;
