//express
const express = require('express');
const app = express();

//body parser
app.use(express.urlencoded({ extended: false }))


//mongoose
const mongoose = require('mongoose');
mongoose
    .connect('mongodb+srv://ahd746:4FeEYZSRoTdg4uuQ@todo-kaloi.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Mongo DB ..'))
    .catch((error) => console.log(error));

// handlebars 
const exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');


//express session
var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
}))

//*express flash
var flash = require('express-flash')
app.use(flash());

//passport
const passport = require('passport')
app.use(passport.initialize());
app.use(passport.session());
require('./passport');

//routes
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/', mainRoutes);
app.use('/user', userRoutes);

//Set the port and listen 
PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));