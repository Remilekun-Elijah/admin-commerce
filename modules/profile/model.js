// // jshint esversion:8
// const path = require("path");
// const joi = require("joi");
// const validator = require(path.resolve("utils/validator"));
// const { acctModel, roleModel, userProfileModel, barProfileModel } = require("../user/schema");
// const Cloud = require(path.resolve("services/file_upload/cloudinary"));
// const mail = require(path.resolve("services/mail"));
// const { info, error } = require("consola");
//
// exports.update = async(id, body) => {
//     const schema = joi.object({
//         name: joi.string(),
//         type: joi.string(),
//         email: joi.string().email({ minDomainSegments: 2 }),
//         location: joi.string(),
//         number: joi.string(),
//         address: joi.string(),
//     });
//     try {
//         /* validates the request body using joi */
//         const validate = await validator(schema, body);
//         if (validate.ok) {
//             let { name, email, location, type, number, address } = validate.data, result;
//             const account = await acctModel.findById(id);
//             if (account) {
//                 // update email if exist
//                 if (email != undefined && email != null) {
//
//                     await roleModel.findOneAndUpdate({ user: account.email }, { user: email });
//                     account.email = email;
//                     await account.save();
//                 }
//                 if (account.type === "user") {
//                     result = await userProfileModel.findOneAndUpdate({ accountInfo: id }, { $set: { name, number, address } }).populate("accountInfo", "-password");
//                 } else {
//                     result = await barProfileModel.findOneAndUpdate({ accountInfo: id }, { $set: { name, type, location, number } }).populate("accountInfo", "-password");
//                 }
//
//                 if (result.photo) {
//                     /* gets the image from cloudinary with custom styling*/
//                     let img = await new Cloud({ folder: 'orderMe' }).get(id, { folder: 'profile_picture', transformation: [{ width: 250, height: 250, crop: 'crop', gravity: 'face', background: 'transparent', radius: 'max' }] });
//                     result._doc.photo = { dp: img, normal: result.photo };
//                 }
//                 return result;
//             } else {
//                 throw new Error("Account does not exist");
//             }
//         } else {
//             /* if the request body is not valid, throw an error */
//             throw validate;
//         }
//     } catch (err) {
//         console.log(err);
//         throw err;
//     }
// };
