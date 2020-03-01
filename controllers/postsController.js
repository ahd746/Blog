const Posts = require('../models/posts');

indexController = (req, res) => {
    Posts.find({}, (error, result) => {
        res.render('index', { items: result, msg: req.session.msg, type: req.session.type });
        req.session.destroy();
        
    })
};


showController = (req, res) => {
    Posts.findOne({ _id: req.params.id }, (error, result) => {
        res.render('show', { item: result });
    })
};



createController = (req, res) => {
    res.render('create');
};


insertController = (req, res) => {
    const thepost = new Posts({
        author: req.body.author,
        genres: req.body.genres,
        title: req.body.title,
        body: req.body.body
    });
    thepost.save();
    req.session.msg = 'Post created successfully';
    req.session.type='success'
    res.redirect('/');
};

editController = (req, res) => {
    Posts.findOne({ _id: req.params.id }, (error, result) => {
        res.render('edit', { item: result });
    });
};


updateController = (req, res) => {
    const updatedPost = {
        author: req.body.author,
        genres: req.body.genres,
        title: req.body.title,
        body: req.body.body
    };
    Posts.updateOne({ _id: req.params.id }, { $set: updatedPost }, (error) => { })
    req.session.msg = 'Post updated successfully';
    req.session.type='success'
    res.redirect('/');
};


deleteController = (req, res) => {
    Posts.deleteOne({ _id: req.params.id }, (error, result) => { });
    req.session.msg = 'Post deleted successfully';
    req.session.type='success'
    res.redirect('/');
};

module.exports = { indexController, showController, createController, insertController, editController, updateController, deleteController };