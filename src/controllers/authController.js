const session = require('express-session');
const {UserModel} = require('../models/userModel');

function registerNewUser(req, res){
    let newUser = UserModel(req.body); 
    newUser.save(function(err, user){
        if(err)
            return res.status(400).send({
                message: err
            });
        console.log(user);
        res.status(200).send(user);
    });
};

function checkUserExists(req, res){
    UserModel.findOne({
        email: req.params.email
    }, function(err, user){
        if(err)
            throw err;
        if(!user)
            return res.json({'exists': false});
        else
            return res.json({'exists': true});
    });
};

function login(req, res){
    UserModel.findOne({
        email: req.body.email
    }, function(err, user){
        if(err)
            throw err;
        if(!user)
            return res.status(400).redirect('/login');
        else{
            if(user.password==req.body.password){
                session.id = user.id;
                session.username = user.email;
                return res.status(200).redirect('/feed');
            } else {
                return res.status(400).redirect('/login');
            }
        }
    });
};

function loginRequired(req, res, next){
    if(session.id)
        next();
    else
        return res.status(200).redirect('/login');
};

function logout(req, res){
    req.session.id = undefined;
    req.session.email = undefined;
    req.session.destroy(function(err){
        res.status(200).redirect('/');
    });
}

module.exports = {registerNewUser, checkUserExists, login, loginRequired, logout};
