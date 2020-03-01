const mongoose = require('mongoose');


const Posts = mongoose.Schema({

    author: {
        type: String,
        require: true,
    },

    genres: {
        type: String,
        require: true
    },

    title: {
        type: String,
        require: true
    },
    
    body: {
        type: String,
        require: true
    },



    date: {
        type: Date,
        default: Date.now,
        require: true
    }

});

module.exports = mongoose.model('posts', Posts);