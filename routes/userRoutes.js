const express = require('express');
const routes = express.Router();
require('../controllers/userController');
const { check, validationResult } = require('express-validator');
const passport = require('passport');

routes.get('/sign-in', signInGetController)
routes.post('/sign-in', signInValidation, signInPostController, signInAuthentication)

routes.get('/sign-up', signUpGetController)
routes.post('/sign-up', signUpValidation, signUpPostController, signUpAuthentication)


routes.get('/profile', isSignIn, profileController)
routes.get('/logout', isSignIn, logOutController)

module.exports = routes