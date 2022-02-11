const path = require("path");
const config = require(path.resolve("utils", "config.js"));
const nodemailer = require("nodemailer");
const helper = require(path.resolve("utils/helper"));
const { info, error, success } = require("consola");
const template = require("./templates");

exports.sendMail = async function(message) {
    info("sending mail to", message.to);
    const transporter = nodemailer.createTransport({

        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: config.gmailUser,
            pass: config.gmailSecret
        }
    })
    const packet = {
        from: `"${config.application_name}" <${config.gmailUser}>`,
        to: message.to,
        replyTo: `<${config.gmailUser}>`,
        subject: message.subject,
        html: message.body
    };

    try {
        /* send the mail */
        transporter.sendMail(packet, (err, infos) => {
            if (err) {
                error("email sending failed:", err.message);
                info("attempting to send mail again...");
                transporter.sendMail(packet, (err, info) => {
                    if (err) {
                        error("Failed to send mail");
                    } else success("Email sent to:", info.messageId, "after failed trial ");
                });
            } else success("Email sent to:", infos.messageId);
        });

    } catch (e) {
        throw new Error("Something is wrong wth our mail service, please try again.");
    }
};

exports.sendVerificationEmail = async(option = {}) => {
    // uses jwt to hash the email
    const secure = helper.generateRememberedToken(option.to);
    // uses crypto to encrypt the jwt hash
    let encryptedLink = helper.encrypt(secure);
    const data = {
        userName: option.name || option.to,
        buttonText: "Verify Account",
        buttonLink: `${config.host}/verify/?secure=${encryptedLink}`,
        header: true,
        headerText: `Welcome to ${config.application_name}`,
        text: "Welcome to our platform.",
        additionalText: "Kindly use the button below to verify your account.",
    };
    // message config
    const message = {
        from: config.gmailUser,
        to: option.to,
        subject: "Account Verification",
        body: await template.use("dynamic-template", data),
    };
    // send the mail
    await this.sendMail(message);
};

exports.sendResetPasswordMail = async(option = {}) => {
    try {
        // uses jwt to hash the email
        const secure = helper.generateRememberedToken(option.id);
        // uses crypto to encrypt the jwt hash
        let encryptedLink = helper.encrypt(secure);
        const data = {
            userName: option.name || option.to,
            buttonText: "Confirm Reset",
            buttonLink: `${config.host}/resetPassword/confirm?secure=${encryptedLink}`,
            header: true,
            headerText: `Welcome to ${config.application_name}`,
            text: "You requested for a password reset earlier.",
            additionalText: "Kindly use the button below to confirm your request.",
        };
        // message config
        const message = {
            from: config.gmailUser,
            to: option.to,
            subject: "Password Reset",
            body: await template.use("dynamic-template", data)
        };
        /* send the mail */
        await this.sendMail(message);

    } catch (e) {
        throw e;
    }
};