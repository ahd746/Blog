const Posts = require('../models/posts');

indexController = (req, res) => {
    Posts.find({}, (error, result) => {
        res.render('index', { items: result });
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
    res.redirect('/');
};


deleteController = (req, res) => {
    console.log(req.params.id);
    Posts.deleteOne({ _id: req.params.id }, (error, result) => { });
    res.redirect('/');

};

module.exports = { indexController, showController, createController, insertController, editController, updateController, deleteController };