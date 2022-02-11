// // jshint esversion:8
// const { acctModel, userProfileModel, barProfileModel, roleModel } = require("./schema");
// const joi = require("joi");
// const path = require("path");
// const validator = require(path.resolve("utils/validator"));
// const helper = require(path.resolve("utils/helper"));
// const mail = require(path.resolve("services/mail"));
// const template = require(path.resolve("services/mail/templates"));
// const config = require(path.resolve("utils/config"));
// const File = require(path.resolve("services/file_upload/uploadAdaptor"));
// const Cloud = require(path.resolve("services/file_upload/cloudinary"));
//
// exports.createUser = async(body) => {
//     const schema = joi.object({
//         name: joi.string().required(),
//         email: joi.string().email({ minDomainSegments: 2 }).required(),
//         password: joi.string().required(),
//     });
//
//     /* validates the request body using joi */
//     const validate = await validator(schema, body);
//     if (validate.ok) {
//         /* gets validated data */
//         let { name, email, password } = validate.data;
//         /* creates a new role for the user */
//         const role = await roleModel.create({ name: "user", user: email });
//         password = helper.hashPassword(password);
//         /* creates a new account for the user */
//         const acct = await acctModel.create({
//             email,
//             password,
//             type: "user",
//             role: role._id,
//         });
//         /* creates a new profile for the user */
//         const user = await userProfileModel.create({ name, accountInfo: acct._id });
//         /* send verification email  */
//         sendVerificationEmail(email, name);
//         return user;
//     } else {
//         /* if the request body is not valid, throw an error */
//         throw validate;
//     }
// };
//
// exports.createBar = async(body) => {
//     const schema = joi.object({
//         name: joi.string().required(),
//         email: joi.string().email({ minDomainSegments: 2 }).required(),
//         password: joi.string().required(),
//         type: joi.string().required(),
//         location: joi.string().required(),
//     });
//     /* validates the request body using joi */
//     const validate = await validator(schema, body);
//     if (validate.ok) {
//         /* gets validated data */
//         let { name, email, password } = validate.data;
//         password = helper.hashPassword(password);
//         /* creates a new account for the bar owner */
//         const role = await roleModel.create({ name: "bar_owner", user: email });
//         /* creates a new account for the bar owner*/
//         const acct = await acctModel.create({
//             email,
//             password,
//             type: "bar",
//             role: role._id,
//         });
//         delete validate.data.email;
//         console.log(validate.data);
//         /* creates a new profile for the bar owner*/
//         const bar = await barProfileModel.create({
//             ...validate.data,
//             accountInfo: acct._id,
//         });
//         /* send verification email  */
//         await mail.sendVerificationEmail(email, name);
//         return bar;
//     } else {
//         /* if the request body is not valid, throw an error */
//         throw validate;
//     }
// };
//
// exports.verifyAccount = async(query) => {
//     // gets the encrypted token from the query
//     const { secure } = query;
//
//     try {
//         // uses crypto to decrypt the encrypted token
//         const token = helper.decrypt(secure);
//         // uses jwt to decode the hashed email
//         const decrypted = helper.verifyToken(token); // id === email -> true
//         return acctModel
//             .findOne({ email: decrypted.id })
//             .then(async(info) => {
//                 if (info) {
//                     if (info.status === "pending") {
//                         info.status = "verified";
//                         await info.save();
//                         return { ok: true, message: "Account verified successfully!" };
//                     } else {
//                         throw {
//                             status: 301,
//                             ok: false,
//                             message: "Account already verified!",
//                         };
//                     }
//                 } else {
//                     throw { status: 404, ok: false, message: "Account does not exist!" };
//                 }
//             })
//             .catch((err) => {
//                 console.log(err);
//                 throw err;
//             });
//     } catch (err) {
//         throw err;
//     }
// };
// exports.resendVerification = async(id) => {
//     return acctModel.findById(id)
//         .then(async(acct) => {
//             let profile;
//             if (acct) {
//                 if (acct.type == "bar")
//                     profile = await barProfileModel
//                     .findOne({ email: acct.email })
//                     .populate("accountInfo", "email");
//                 else
//                     profile = await userProfileModel
//                     .findOne({ email: acct.email })
//                     .populate("accountInfo", "email");
//
//                 await mail.sendVerificationEmail(acct.email, profile.name);
//                 return { ok: true, message: "Verification email sent!" };
//             } else throw new Error("Failed to retrieve account, please login again.");
//         })
//         .catch((err) => {
//             throw err;
//         });
// };
//
// exports.login = async(body) => {
//     const schema = joi.object({
//         email: joi.string().email({ minDomainSegments: 2 }).required(),
//         password: joi.string().required()
//     });
//     /* validates the request body using joi */
//     const validate = await validator(schema, body);
//     if (validate.ok) {
//         /* gets validated data */
//         let { email, password } = validate.data;
//         /* gets the account from the database */
//         return acctModel
//             .findOne({ email })
//             .populate("role", "name user")
//             .then((info) => {
//
//                 if (info) {
//                     if (helper.comparePassword(info.password, password)) {
//                         const token = helper.generateUserToken(info._id, info.role.name);
//                         info._doc.token = token;
//                         return {
//                             ok: true,
//                             status: 200,
//                             message: "User logged in successfuly",
//                             token,
//                         };
//                     } else {
//                         throw { ok: false, message: "Password is incorrect!" };
//                     }
//                 } else throw { ok: false, message: "Account does not exist!" };
//             })
//             .catch((err) => {
//                 throw err;
//             });
//     } else throw validate;
// };
//
// exports.getUserProfile = async(id) => {
//     return acctModel
//         .findById(id)
//         .populate("role", "-user")
//         .then(async(info) => {
//             if (info) {
//                 let profile;
//                 profile =
//                     info.type == "user" ?
//                     await userProfileModel
//                     .findOne({ accountInfo: info._id })
//                     .populate("accountInfo", "-password") :
//                     await barProfileModel
//                     .findOne({ accountInfo: info._id })
//                     .populate("accountInfo", "-password");
//                 profile._doc.accountInfo.role = info.role;
//                 if (profile.photo) {
//                     /* gets the image from cloudinary with custom styling*/
//                     let img = await new Cloud({ folder: 'orderMe' }).get(id, { folder: 'profile_picture', transformation: [{ width: 250, height: 250, crop: 'crop', gravity: 'face', background: 'transparent', radius: 'max' }] });
//                     profile._doc.photo = { dp: img, normal: profile.photo };
//                 }
//                 return profile;
//             } else
//                 throw { ok: false, status: 404, message: "Account does not exist!" };
//         })
//         .catch((err) => {
//             throw err;
//         });
// };
//
// exports.uploadProfilePicture = async(id, uploadedFile) => {
//     let acct = await acctModel.findById(id);
//     if (acct) {
//         const file = File(uploadedFile, ["img"], 10000000); // max file size is 10mb > expected file is image
//         const { image, error } = file; // image is the file object, error is the error object
//
//         // cloudinary operations
//         const cloud = new Cloud({ folder: "orderMe" });
//         // cloudinary asset options
//         const assetOptions = {
//             public_id: `${id}`,
//             folder: "profile_picture",
//             // width: 500,
//             height: 500,
//
//         };
//         if (error().type) {
//             error().ok = false;
//             error().status = 422;
//             throw error();
//         } else {
//             let imgUrl,
//                 profile;
//             // gets the profile of the client
//             if (acct._doc.type === "user")
//                 profile = await userProfileModel.findOne({ accountId: acct._id });
//             else profile = await barProfileModel.findOne({ accountId: acct._id });
//
//             if (profile.photo) {
//                 // update existing photo
//                 imgUrl = await cloud.update(image().path, assetOptions);
//             } else {
//                 // upload new photo
//                 imgUrl = await cloud.upload(image().path, assetOptions);
//             }
//             const { secure_url } = imgUrl;
//             // save to db
//             profile.photo = secure_url;
//             await profile.save();
//             let imgObject;
//             if (profile.photo) {
//                 /* gets the image from cloudinary with custom styling*/
//                 let img = await new Cloud({ folder: 'orderMe' }).get(id, { folder: 'profile_picture', transformation: [{ width: 250, height: 250, crop: 'crop', gravity: 'face', background: 'transparent', radius: 'max' }] });
//                 imgObject = { dp: img, normal: profile.photo };
//             }
//             // delete asset from our server
//             helper.deleteFileFrom(image().path, _ =>
//                 console.log(`Local file ${image().name} deleted`)
//             );
//             return {
//                 ok: true,
//                 message: "Profile picture updated successfully!",
//                 imgUrl: imgObject,
//             };
//         }
//     } else throw { ok: false, status: 404, message: "Account does not exist!" };
//
// };
//
//
//
// exports.delete = async id => {
//     try {
//         // get client from account in the db
//         const account = await acctModel.findById(id);
//         let image, profile;
//         if (account) {
//             //deleting users by type
//             if (account.type == 'user') {
//                 // delete user profile through their account id
//                 profile = await userProfileModel.findOneAndDelete({ accountinfo: id });
//             } else {
//                 // delete bar profile through their account id
//                 profile = await barProfileModel.findOneAndDelete({ accountinfo: id });
//             }
//
//             //check and delete the client image if it exist
//             if (profile.photo) {
//                 image = await new Cloud({ folder: 'orderMe' }.delete(id, { folder: 'profile_picture' }));
//                 image = image.deleted;
//             }
//             //delete role
//             await roleModel.findByIdAndDelete(account.role);
//
//             //delete user account
//             await acctModel.findByIdAndDelete(id);
//
//             return { ok: true, message: "Deleted Successfully", photo: image };
//         } else throw { ok: false, status: 404, message: "Account does not exist!" };
//     } catch (err) {
//         throw err;
//     }
// };
//
// exports.resetPassword = async body => {
//     const schema = joi.object({
//         email: joi.string().email({ minDomainSegments: 2 }).required(),
//         password: joi.string().required()
//     });
//     try {
//         /* validates the request body using joi */
//         const validate = await validator(schema, body);
//         if (validate.ok) {
//             /* gets validated data */
//             let { email, password } = validate.data;
//             /* gets the account from the database */
//             const account = await acctModel.findOne({ email });
//             if (account) {
//                 if (helper.comparePassword(account.password, password)) throw { ok: false, status: 406, message: "You entered same password you forgot, try entering a different one." };
//                 else {
//                     let profile;
//                     // gets the profile of the client
//                     profile = account.type == "user" ? await userProfileModel.findOne({ accountInfo: account._id }) : await barProfileModel.findOne({ accountInfo: account._id });
//                     // send email to client
//                     await mail.sendResetPasswordMail({ to: account.email, name: profile.name, id: { id: account._id, password } });
//
//                     return {
//                         ok: true,
//                         message: "Password reset link sent to your email!"
//                     };
//
//                 }
//             } else throw { ok: false, status: 404, message: "Account does not exist!" };
//
//         } else throw validate;
//     } catch (err) {
//         throw err;
//     }
// };
//
// exports.confirmPasswordReset = async query => {
//     // gets the encrypted token from the query
//     const { secure } = query;
//
//     try {
//         // uses crypto to decrypt the encrypted token
//         const token = helper.decrypt(secure);
//         // uses jwt to decode the hashed email
//         const decrypted = helper.verifyToken(token); // id === email -> true
//
//         if (decrypted !== "token_expired" && decrypted !== "invalid_signature") {
//             const info = await acctModel.findById(decrypted.id.id);
//             if (info) {
//                 if (helper.comparePassword(info.password, decrypted.id.password)) throw { ok: false, status: 301, message: "This link has already been used." };
//                 else {
//                     // updates the password
//                     info.password = helper.hashPassword(decrypted.id.password);
//                     await info.save();
//                     return { ok: true, message: "Password reset successful!" };
//                 }
//             } else throw { ok: false, status: 404, message: "Account does not exist!" };
//
//         } else throw { ok: false, status: 401, message: "This link is either broken or expired, please request for another one." };
//     } catch (err) {
//         throw err;
//     }
// };
//
// // Change User Account Password
// exports.changePassword = async(id, oldPassword, newPassword) => {
//     try {
//         const account = await acctModel.findById(id);
//         if (account) {
//             // hash the new password
//             const hashedNewPassword = await helper.hashPassword(newPassword);
//             // Check if old password entered by the user match the password in the database
//             const checkPass = await helper.comparePassword(
//                 account.password,
//                 oldPassword
//             );
//             if (checkPass) {
//                 await acctModel.findByIdAndUpdate(id, { password: hashedNewPassword });
//                 return { okay: true, message: "Password changed successfully" };
//             } else {
//                 return {
//                     okay: false,
//                     message: "Old Password does not match the existing password",
//                 };
//             }
//         } else {
//             return { okay: false, message: "Account does not exist!" };
//         }
//     } catch (error) {
//         throw error;
//     }
// };
//
// // Get the role of the user from the account collection
// exports.getRole = async(id) => {
//     try {
//         const account = await acctModel.findById(id).populate("role");
//         // Check if account exist
//         if (account) {
//             // return the role of the user
//             return account.role.name;
//         } else {
//             return { okay: false, message: "Account does not exist!" };
//         }
//     } catch (error) {
//         throw error.message;
//     }
// };
