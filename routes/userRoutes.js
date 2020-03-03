const express = require('express');
const routes = express.Router();
require('../controllers/userController');

const { check, validationResult } = require('express-validator');
const passport = require('passport');


routes.get('/sign-in', (req, res) => {
    res.render('sign-in', { msg: req.flash('msg'), type: req.flash('type') })
})

routes.post('/sign-in', [
    check('userName').not().isEmpty().withMessage('Please enter your user name'),
    check('password').not().isEmpty().withMessage('Please enter your password')

], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var validationMsgs = [];
        for (let i = 0; i < errors.errors.length; i++) {
            validationMsgs.push(errors.errors[i].msg)
        }
        req.flash('msg', validationMsgs)
        req.flash('type', 'danger')
        res.redirect('sign-in');
        return;
    }
    next();
}, passport.authenticate('local-sign-in', {
    successRedirect: '/',
    failureRedirect: 'sign-in',
    failureFlash: true

}))





routes.get('/sign-up', (req, res) => {
    res.render('sign-up', { msg: req.flash('msg'), type: req.flash('type') })
})

routes.post('/sign-up', [
    check('userName').not().isEmpty().withMessage('Please enter your user name'),
    check('password').not().isEmpty().withMessage('Please enter your password'),
    check('password').isLength({ min: 5 }).withMessage('Password is too short')

], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var validationMsgs = [];
        for (let i = 0; i < errors.errors.length; i++) {
            validationMsgs.push(errors.errors[i].msg)
        }
        req.flash('msg', validationMsgs)
        req.flash('type', 'danger')
        res.redirect('sign-up');
        return;
    }
    next();
}, passport.authenticate('local-sign-up', {
    session: false,
    successRedirect: '/',
    failureRedirect: 'sign-up',
    failureFlash: true

}))





routes.get('/profile', (req, res) => {
    res.render('profile')
})




module.exports = routes