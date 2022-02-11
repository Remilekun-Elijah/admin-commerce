//jshint esversion:8
const path = require("path");
const fs = require("fs").promises;
const config = require(path.resolve("utils", "config.js"));
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const ip = require("public-ip");
const jwt = require("jsonwebtoken");
const secret = config.secret;
const crypto = require("crypto");
const IV_LENGTH = 16;

/**
 *
 * @param {any} data - the data to be encrypted
 * @returns {string}  the encrypted data in hexadecimal
 */
exports.encrypt = (data) => {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(secret), iv);
    let encrypted = cipher.update(data.toString());
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
};

/**
 * @description decrypts the given string that was encrypted using the encrypt function
 * @param {string} value - the string value to be decrypted
 * @returns {any}  the decrypted data
 */
exports.decrypt = (value) => {
    let textParts = value.split(":");
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedText = Buffer.from(textParts.join(":"), "hex");
    let decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        Buffer.from(secret),
        iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};

exports.serverErrorHandler = async(err, req, res, next) => {
    console.log(err.message);
    res.status(500).render("error", {
        errorMessage: err.message,
        stack: err.stack,

    });
};

exports.notFoundErrorHandler = async(req, res, next) => res.status(404).render("404", { path: req.path, method: req.method });

/**
 * @description generates a random string
 * @returns {string}  the generated random string
 */
exports.generateUuid = () => uuid.v4();
/**
 * @param {object} data   takes in an object of boolean and number values
 * @param {boolean} data.previewInConsole  whether to preview the data/size in the console, default is true
 * @param {number} data.bytes  the actual size of the data/file in byte, default is 50000000
 * @returns  {number}  The size of the data/file
 **/
exports.getFileSize = function(data = {}) {
    data.previewInConsole = data.previewInConsole ? data.previewInConsole : false;
    data.bytes = data.bytes != (undefined || null || "") ? data.bytes : 50000000; // 50mb
    data.bytes = Number(data.bytes);
    const k = 1000;
    const format = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(data.bytes) / Math.log(k));
    const size = parseFloat(data.bytes / Math.pow(k, i)).toFixed(2);

    if (data.previewInConsole == true)
        console.log(data.bytes, " = ", size + format[i]);
    return size;
};

/**
 * @description deletes a file
 * @param {string} filePath - the path of the file to be deleted
 * @param {function} cb - the callback function
 */
exports.deleteFileFrom = (filePath, cb) => {
    fs.unlink(path.resolve(filePath))
        .then(cb)
        .catch((err) => {
            console.log(err);
        });
};

/**
 * @description moves a file from one location to another
 * @param {string} from - the path of the file to be moved
 * @param {string} to - the path of the file to be moved to
 * @param {function} cb - the callback function
 */
exports.moveFile = (from, to, cb) => {
    fs.rename(path.resolve(from), path.resolve(to))
        .then(cb)
        .catch((err) => {
            throw err;
        });
};

/**
 * @description hashes the given password
 * @param {string} password - the password to be hashed
 * @returns {string} The hashed password
 */
exports.hashPassword = (password) => bcrypt.hashSync(password, saltRounds);
/**
 * @description compares the password with the hashed password
 * @param {string} hashedPassword - the saved hashed password
 * @param {string} password - the password to be compared
 * @returns {boolean}  true if the password is correct, false if not
 */

exports.comparePassword = (hashedPassword, password) => {
    return bcrypt.compareSync(password, hashedPassword);
};

/**
 * @description generates a jwt token that expires in 7days
 * @param {string} id - the id of the user
 * @param {string} permission - the permission of the user
 * @returns {string} Jwt token plus bearer
 */
exports.generateUserToken = (id, role) => {
    let data = { id, role };
    const token = jwt.sign(data, secret, { expiresIn: "7d" });
    return `Bearer ${token}`;
};

/**
 * @description generates a jwt token that expires in 2days
 * @param {string} id  - the id of the user
 * @returns {string}  The jwt token plus bearer
 */
exports.generateRememberedToken = (id) => {
    const token = jwt.sign({ id }, secret, { expiresIn: "2d" });
    return `Bearer ${token}`;
};

/**
 * @description verifies a jwt token
 * @param {string} token - the token to be verified
 * @returns {any}  the decoded data or an error message
 */
exports.verifyToken = (token) => {
    const token_slice = token.replace(/Bearer/g, "").trim();
    const decode = jwt.decode(token_slice);
    var seconds = 1000;
    var d = new Date();
    var t = d.getTime();
    if (decode === "invalid signature") return "invalid_signature";
    else if (decode.exp < Math.round(t / seconds)) {
        return "token_expired";
    } else {
        const isVerified = jwt.verify(token_slice, secret);
        return isVerified;
    }
};
