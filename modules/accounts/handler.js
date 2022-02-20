//jshint esversion:8
const path = require("path");
const validator = require(path.resolve("utils/validator"));
const joi = require("joi");
const User = require("./model");

exports.displaySignupPage = (req, res) => res.render("signup");

exports.createAccount = async (req, res) => {
  try {
    const { body } = req;

    const schema = joi.object({
      full_name: joi.string().required(),
      email: joi.string().email({ minDomainSegments: 2 }),
      password: joi.string(),
      privacyPolicy: joi.string(),
    });

    // validates request body
    const validatedData = await validator(schema, body);

    if (validatedData.ok) {
      const { data } = validatedData;

      let result = await new User().createAccount(data);
      res.status(result.status).json(result);
    } else {
      const { ok, status, error } = validatedData;
      res.status(status).json({ ok, error });
    }
  } catch (err) {
    console.log(err.message);
    res.status(err.status).json(err);
  }
};

exports.loginAccount = async (req, res) => {
  try {
    const { body } = req;

    const schema = joi.object({
      email: joi.string().email({ minDomainSegments: 2 }),
      password: joi.string(),
    });

    // validates request body
    const validatedData = await validator(schema, body);

    if (validatedData.ok) {
      const { data } = validatedData;
      const user = await User.login(data);
      res.status(user.status).json(user);
    } else {
      const { ok, status, error } = validatedData;
      res.status(status).json({ ok, error });
    }
  } catch (err) {
    console.log(err.message);
    res.status(err.status).json(err);
  }
};

exports.verifyAccount = async (req, res) => {
  const { secure } = req.query;
  User.verifyAccount(secure)
    .then((data) => res.status(data.status).json(data))
    .catch((err) => res.status(err).end(err));
};

exports.resendVerification = async (req, res) => {
  const { email } = res.locals;

  User.sendVerificationEmail(email)
    .then((data) => res.status(data.status).json(data))
    .catch((err) => res.status(err).end(err));
};
