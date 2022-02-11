// const model = require("./model");
//
// /**
//  * @params updateProfile
//  * @route  /profile/update
//  * this is the handler for profile update and bar update
//  * data recieved is based on the conditions in @model update
//  */
// exports.updateProfile = async(req, res) => {
//     const { id } = res.locals.user;
//     model.update(id, req.body).then(data => {
//         res.status(201).json(data);
//     }).catch(err => {
//         if (err.status) res.status(err.status).json(err);
//         else res.status(500).json({ ok: false, message: err.message });
//     })
// };
