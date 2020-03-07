const Posts = require('../models/posts');
const { check, validationResult } = require('express-validator');
const passport = require('passport');

//check is Authenticated or not function
isSignIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect('sign-in')
        return;
    }
    next();
}

//sign in controllers and validator
signInGetController = (req, res) => {
    res.render('sign-in', { msg: req.flash('msg') })
}

signInPostController = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var validationMsgs = [];
        for (let i = 0; i < errors.errors.length; i++) {
            validationMsgs.push(errors.errors[i].msg)
        }
        req.flash('msg', validationMsgs)
        res.redirect('sign-in');
        return;
    }
    next();
}

signInValidation = [
    check('userName').not().isEmpty().withMessage('Please enter your user name'),
    check('password').not().isEmpty().withMessage('Please enter your password')

]

signInAuthentication = passport.authenticate('local-sign-in', {
    successRedirect: '/user/profile',
    failureRedirect: 'sign-in',
    failureFlash: true

})


//sign up controllers and validator 
signUpGetController = (req, res) => {
    res.render('sign-up', { msg: req.flash('msg') })
}

signUpPostController = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var validationMsgs = [];
        for (let i = 0; i < errors.errors.length; i++) {
            validationMsgs.push(errors.errors[i].msg)
        }
        req.flash('msg', validationMsgs)
        res.redirect('sign-up');
        return;
    }
    next();
}

signUpValidation = [
    check('userName').not().isEmpty().withMessage('Please enter your user name'),
    check('password').not().isEmpty().withMessage('Please enter your password'),
    check('password').isLength({ min: 5 }).withMessage('password should be 8 character or more')

]


signUpAuthentication = passport.authenticate('local-sign-up', {
    successRedirect: '/user/profile',
    failureRedirect: 'sign-in',
    failureFlash: true

})


// logout controller

logOutController = (req, res) => {
    req.logOut();
    res.redirect('/');
}

//profile controller
profileController = (req, res) => {
    Posts.find({ author: req.user.userName }, (error, result) => {
        res.render('profile', {
            items: result,
            msg: req.flash('msg'),
            sign: true,
            author: req.user.userName
        });
    })
}


module.exports = {
    signInGetController, signInPostController, signUpGetController,
    signUpPostController, logOutController, profileController
}