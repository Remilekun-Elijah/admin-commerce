//jshint esversion: 8
const path = require("path"),
  Query = require("./query"),
  error = require(path.resolve("utils", "responses", "error")),
  response = require(path.resolve("utils", "responses", "response")),
  helper = require(path.resolve("utils", "helper")),
  mail = require(path.resolve("services", "mail"));

module.exports = class User {
  constructor() {
    this._permissions = { admin: "admin", user: "user" };
  }

  async createAccount({ password, email, full_name }) {
    try {
      const isUser = await this.fetchCredentials(email);

      if (isUser) {
        throw error("UAE");
      } else {
        const hashed_password = helper.hashPassword(password);
        const query = new Query({ full_name, email, hashed_password });

        const account = await query.createUser();
        const sid = account.id;

        // create permission and
        let profile = await query.setupProfile(sid),
          permission = await query.setupPermission(
            sid,
            this._permissions.admin
          ),
          settings = await query.setupSettngs(sid);
        let mailLink = await mail.sendVerificationEmail({
          name: full_name,
          to: email,
        });
        console.log(mailLink);
        // const data = { account, profile, permission, settings };
        return response("UAC", mailLink);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async fetchCredentials(email) {
    try {
      const query = new Query(),
        userDetails = await query.fetchUserByEmail(email);
      return userDetails;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  static async login({ email, password }) {
    try {
      const user = await new this().fetchCredentials(email);

      if (user) {
        const { hashed_password, id, email } = user;
        if (helper.comparePassword(hashed_password, password)) {
          const token = helper.generateUserToken({ id, email });
          return response("ULI", undefined, token);
        } else return error("IAP");
      } else return error("UNF");
    } catch (err) {
      console.log(err);
      throw error();
    }
  }

  static async verifyAccount(secure) {
    try {
      const decryptedToken = helper.verifyToken(helper.decrypt(secure));
      if (
        decryptedToken == "invalid_signature" ||
        decryptedToken == "token_expired"
      ) {
        return error("UTE");
      } else {
        const user = await new this().fetchCredentials(decryptedToken.email);
        if (user) {
          if (user.status == "pending") {
            const data = await new Query().updateAccountStatus(
              user.id,
              "verified"
            );
            return response("UAV", data);
          } else return error("UAV");
        }
        return error("UNF");
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async sendVerificationEmail(email) {
    try {
      const { full_name } = await new this().fetchCredentials(email);
      let link = await mail.sendVerificationEmail({
        name: full_name,
        to: email,
      });
      return response("VLG", link);
    } catch (err) {
      console.log(err);
      return error("UNF");
    }
  }
};

/*

*/
