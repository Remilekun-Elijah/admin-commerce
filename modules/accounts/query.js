// jshint esversion:8
const path = require("path"),
  db = require(path.resolve("utils", "db"));

module.exports = class Account {
  constructor({ full_name, email, hashed_password } = {}) {
    this.full_name = full_name;
    this.email = email;
    this.hashed_password = hashed_password;
  }

  async createUser() {
    try {
      const values = [this.full_name, this.email, this.hashed_password],
        data = await db.query(
          "INSERT INTO accounts(full_name, email, hashed_password) VALUES($1, $2, $3) RETURNING *",
          values
        );

      return data.rows[0];
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  async fetchUserByEmail(email) {
    try {
      const sql = "SELECT * FROM accounts where email = $1",
        data = await db.query(sql, [email]);
      return data.rows[0];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async updateAccountStatus(id, status) {
    try {
      const sql =
          "UPDATE accounts SET status = $2 WHERE id = $1 RETURNING status, updated_at",
        values = [id, status],
        data = await db.query(sql, values);

      return data.rows[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async setupPermission(sid, type) {
    try {
      // console.log(type);
      const sql =
          "INSERT INTO permissions(sid,name) VALUES($1, $2) RETURNING *",
        data = await db.query(sql, [sid, type]);
      return data.rows[0];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async setupProfile(sid) {
    try {
      const sql =
          "INSERT INTO profiles(sid, full_name, email) VALUES($1, $2, $3) RETURNING *",
        values = [sid, this.full_name, this.email],
        data = await db.query(sql, values);
      // console.log(sid);
      return data.rows[0];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async setupSettngs(sid) {
    try {
      const notification =
          '{"UnusualActivities": true, "newBrowser": false, "SalesAndLatestNews": true, "featuresAndUpdate": false, "accountTips": true}',
        security =
          '{"logActivities": true, "twoFactoreAuth": false, "numberVisibility": "public", "emailVisibility": "private"}',
        activities = "[]";

      const sql =
          "INSERT INTO settings(sid, notification, security, activity) VALUES($1, $2, $3, $4) RETURNING *",
        values = [sid, notification, security, activities],
        data = await db.query(sql, values);
      // console.log(data[0]);
      return data.rows[0];
    } catch (err) {
      throw err;
    }
  }
};
