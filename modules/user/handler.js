// const model = require("./model");
//
// exports.createUser = async(req, res) => {
//     try {
//         model.createUser(req.body).then(data => {
//             res.status(201).json(data);
//         }).catch(err => {
//             console.log(err);
//             if (err.status) res.status(err.status).json(err);
//             else if (err.keyValue) res.status(409).json({ okay: false, message: `User with the email ${err.keyValue.user} already exist` });
//             else res.status(500).json({ ok: false, message: "Something went wrong, please try again." });
//         });
//     } catch (err) {
//         res.status(400).json(err);
//     }
//
// };
//
// exports.createBar = async(req, res) => {
//     console.log(req.body);
//     try {
//         model.createBar(req.body).then(data => {
//
//             res.status(201).json(data);
//         }).catch(err => {
//             console.log(err);
//             if (err.status) res.status(err.status).json(err);
//             else if (err.keyValue) res.status(409).json({ okay: false, message: `Bar with the email ${err.keyValue.user} already exist` });
//             else res.status(500).json({ ok: false, message: "Something went wrong, please try again." });
//         });
//     } catch (err) {
//         res.status(400).json(err);
//     }
// };
//
//
// exports.verifyRegisteration = async(req, res) => {
//     model.verifyAccount(req.query).then(data => {
//         res.status(200).json(data);
//     }).catch(err => {
//         if (err.status) res.status(err.status).json(err);
//         else res.status(500).json(err);
//     });
// };
//
// exports.resendVerification = async(req, res) => {
//     const { id } = res.locals.user;
//     model
//         .resendVerification(id)
//         .then((data) => {
//             res.status(200).json(data);
//         })
//         .catch((err) => {
//             res.status(500).json({ ok: false, message: err.message });
//         });
// };
//
// exports.login = async(req, res) => {
//     model.login(req.body).then(data => {
//         res.status(200).json(data);
//     }).catch(err => {
//         if (err.status) res.status(err.status).json(err);
//         else res.status(400).json({ ok: false, message: err });
//     });
// };
//
// exports.getProfile = async(req, res) => {
//     const { id } = res.locals.user;
//     model.getUserProfile(id).then(data => {
//         res.status(200).json(data);
//     }).catch(err => {
//         if (err.status) res.status(err.status).json(err);
//         else res.status(500).json({ ok: false, message: err });
//     });
// };
//
// exports.getUserProfileById = async(req, res) => {
//     const { id } = req.params;
//     model.getUserProfile(id)
//         .then((data) => {
//             res.status(200).json(data);
//         })
//         .catch(err => {
//             if (err.status) res.status(err.status).json(err);
//             else res.status(500).json(err);
//         });
// };
//
// exports.updateProfilePhoto = async(req, res) => {
//     const { id } = res.locals.user;
//     model.uploadProfilePicture(id, req.files).then(data => {
//         res.status(201).json(data);
//     }).catch(err => {
//         if (err.status) res.status(err.status).json(err);
//         else res.status(500).json({ ok: false, message: err.message });
//     });
// };
//
// exports.delete = (req, res) => {
//     const { id } = res.locals.user;
//
//     model.delete(id).then(data => {
//         res.status(201).json(data)
//     }).catch(err => {
//         if (err.status) res.status(err.status).json(err);
//         else res.status(500).json({ ok: false, message: err.message });
//     });
// };
//
// exports.resetPassword = (req, res) => {
//     model.resetPassword(req.body).then(data => {
//         res.status(200).json(data);
//     }).catch(err => {
//         if (err.status) res.status(err.status).json(err);
//         else res.status(500).json(err);
//     });
// };
//
// exports.confirmPassword = async(req, res) => {
//     model.confirmPasswordReset(req.query).then(data => {
//         res.status(200).json(data);
//     }).catch(err => {
//         if (err.status) res.status(err.status).json(err);
//         else res.status(500).json(err);
//     });
// };
//
// exports.changePassword = async(req, res) => {
//     const { old_password, new_password } = req.body;
//     const { id } = res.locals.user;
//
//     // Check if new password is equal to the old password
//     if (old_password === new_password) {
//         return res.status(400).json({
//             okay: false,
//             message: "Old password cannot be used as new password, Pls try again",
//         });
//     } else {
//         const response = await model.changePassword(id, old_password, new_password);
//         if (response.okay) {
//             return res.status(200).json(response);
//         } else {
//             return res.status(400).json(response);
//         };
//     }
// }
