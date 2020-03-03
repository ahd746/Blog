const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const Users = require('./models/users');

passport.serializeUser((user, done) => { return done(null, user.id) })
passport.deserializeUser((id, done) => {
    Users.findById(id, ('userName'), (error, result) => { return done(error, result) })
})

passport.use('local-sign-in', new localStrategy({
    usernameField: 'userName',
    passwordField: 'password',
    passReqToCallback: true
}, (req, userName, password, done) => {
    Users.findOne({ userName: userName }, (error, result) => {

        if (!result || result.password !== password) {
            return done(null, false, req.flash('msg', 'Wrong username or password'), req.flash('type', 'danger'));
        }

        return done(null, result)
    })
}));

passport.use('local-sign-up', new localStrategy({
    usernameField: 'userName',
    passwordField: 'password',
    passReqToCallback: true
}, (req, userName, password, done) => {
    Users.findOne({ userName: userName }, (error, result) => {

        if (result) {
            return done(null, false, req.flash('msg', 'Username already exist, choose another one'), req.flash('type', 'danger'));
        }else{
            theuser = new Users({
                userName: req.body.userName,
                password: req.body.password
            })
            theuser.save((error,result)=>{
                return done(null,result)
            });
        }
        
    })
}));