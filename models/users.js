const mongoose = require('mongoose');


const Users = mongoose.Schema({

    userName: {
        type: String,
        require: true,
    },

    password: {
        type: String,
        require: true
    },

});

module.exports = mongoose.model('users', Users);