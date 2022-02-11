// const mongoose = require('mongoose');
// const { Schema, model } = mongoose;
// mongoose.set("returnOriginal", false);
//
// const acctSchema = new Schema({
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     type: {
//         type: String,
//         enum: ["user", "bar"],
//         required: true,
//         trim: true,
//     },
//     role: {
//         type: Schema.Types.ObjectId,
//         ref: 'Role'
//     },
//     status: {
//         type: String,
//         enum: ['pending', 'verified'],
//         default: 'pending'
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now
//     }
// });
//
// const userProfileSchema = new Schema({
//     photo: {
//         type: String,
//         required: false,
//         trim: true,
//     },
//     name: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     address: {
//         type: String,
//         required: false,
//         trim: true
//     },
//     number: {
//         type: String,
//         required: false,
//         trim: true
//     },
//     accountInfo: {
//         type: Schema.Types.ObjectId,
//         ref: 'Account'
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now
//     }
// });
//
// const barProfileSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     location: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     type: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     number: {
//         type: String,
//         required: false,
//         trim: true
//     },
//     reservationNumber: {
//         type: Number,
//         required: false,
//         trim: true
//     },
//     photo: {
//         type: String,
//         required: false,
//         trim: true
//     },
//     accountInfo: {
//         type: Schema.Types.ObjectId,
//         ref: 'Account'
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now
//     }
// });
//
// const role = new Schema({
//     name: {
//         type: String,
//         enum: ['super_admin', 'admin', 'user', 'bar_owner', 'bar_manager', 'bar_staff'],
//         default: 'user',
//         trim: true
//     },
//     user: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now
//     }
// });
//
// module.exports = {
//
//     acctModel: model('Account', acctSchema),
//     userProfileModel: model('UserProfile', userProfileSchema),
//     barProfileModel: model('BarProfile', barProfileSchema),
//     roleModel: model('Role', role)
// }
