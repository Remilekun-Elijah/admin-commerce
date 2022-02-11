/** 
 * 
 * test
 * 
 * */
const helper = require("../utils/helpers");
const config = require("../utils/config");
const mail = require("./index");
const template = require("./templates");

exports.sendSampleMsg = async(to) => {
    const secure = helper.generateUuid();
    let encryptedLink = helper.encrypt(secure);
    /**Email template data | content **/
    const data = {
        userName: to || "remilekunelijah97@gmail.com",
        buttonText: "Reset Password",
        buttonLink: `${config.host}resetPasswordPage/?secure=${encryptedLink}`,
        header: true,
        headerText: "Welcome to Learnguage",
        text: "You requested for a password reset link.",
        additionalText: "Kindly use the button below to reset your password.",
    };
    // message config
    const message = {
        from: config.gmailUser,
        to: to || "remilekunelijah97@gmail.com",
        subject: "Reset your password",
        body: await template.use("dynamic-template.ejs", data)
    };
    mail.sendMail(message);
};