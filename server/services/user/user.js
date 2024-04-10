'use strict';

const jwt = require('jsonwebtoken');
const db = require('../../../dbEnv.json');

const { User } = require('../../models/Users/User');

async function getAllUsers(request, response) {
    const data = await User.findAll();
    console.log('data in getAllUsers')
    console.log(data)
    response.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
    });
}
//
// function loginUser(request, response) {
//     let { email, password } = request.body;
//
//     User.findOne({
//         email: email
//     }, function(error, user) {
//         if (error) throw error;
//
//         if (!user) {
//             return response.send({
//                 success: false,
//                 message: 'User not found.',
//             });
//         }
//
//         // Check if password matches
//         user.comparePassword(password, function(error, isMatch) {
//             if (isMatch && !error) {
//                 var token = jwt.sign(user.toJSON(), db.secret, {
//                     expiresIn: 10080
//                 });
//
//                 return response.json({ success: true, token: 'JWT ' + token });
//             }
//
//             response.send({
//                 success: false,
//                 message: 'Passwords did not match.',
//             });
//         });
//     });
// };

module.exports = {
    // loginUser: loginUser,
    getAllUsers,
};