'use strict';

const jwt = require('jsonwebtoken');
const db = require('../../../dbEnv.json');


const {getPostData, formDataToObj, parseIntObj} = require('../../../utils');


const { User } = require('../../models/Users/User');

async function getUsers(req, res) {
    const data = await User.findAll();
    return data;
}

async function getUserById(req, res) {
    const id = req.params.id;

    const data = await User.getById(id);
    return data;
}

async function createUser(req, res) {
    const body = req.body;
    const newUser = new User(body);
    const data = await newUser.save();
    return data;
}

async function updateUserById(req, res) {
    const id = req.params.id;
    let user = await User.getById(id);
    if (!user) return null

    const body = req.body;
    for(let key in body) {
        if(user[key] !== body[key]) {
            // TODO: перезаписывать только отличающиеся поля
            console.log("Поле " + key + " отличается")
        }
    }
    // TODO: update only existing fields - проверить что будет если оригинальный юзер будет иметь те поля, которых нет в боди
    user = Object.assign(user, req.body)
    console.log('user after update', user)
    const data = await user.save();
    console.log('RETURNED DATA (updateUserById)')
    console.log(data)
    return data;
}


// TODO: не уверен что оно должно работать именно так
async function getUserByName(req, res) {

    // let data = req.body;
    // let data = parseIntObj(req.query);;
    const id = req.params.id;

    console.log('id: ', id)
    // TODO: понять как вытаскивать из запроса параметры поиска юзера
    const data = await User.findOneByColumn('name', "Max" );
    // console.log('data in getAllUsers')
    console.log(data)


    res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
    });
}

//
// function loginUser(req, res) {
//     let { email, password } = req.body;
//
//     User.findOne({
//         email: email
//     }, function(error, user) {
//         if (error) throw error;
//
//         if (!user) {
//             return res.send({
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
//                 return res.json({ success: true, token: 'JWT ' + token });
//             }
//
//             res.send({
//                 success: false,
//                 message: 'Passwords did not match.',
//             });
//         });
//     });
// };

module.exports = {
    // loginUser: loginUser,
    getUsers,
    getUserByName,
    getUserById,
    createUser,
    updateUserById,
};