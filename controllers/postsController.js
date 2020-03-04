const Posts = require('../models/posts');

isSign = (req, res) => {
    if (req.isAuthenticated()) {
        sign = true;
    } else {
        sign = false;
    };
}


indexController = (req, res) => {
    Posts.find({}, (error, result) => {
        isSign(req, res);
        res.render('index', {
            items: result,
            msg: req.flash('msg'),
            type: req.flash('type'),
            sign
        });

    })
};


showController = (req, res) => {
    Posts.findOne({ _id: req.params.id }, (error, result) => {
        isSign(req, res);
        res.render('show', { item: result, sign });
    })
};



createController = (req, res) => {
    isSign(req, res);
    if (sign) {
        res.render('create', { sign });
    }else{
        res.redirect('/user/sign-in')
    }
};


insertController = (req, res) => {
    const thepost = new Posts({
        author: req.user.userName,
        genres: req.body.genres,
        title: req.body.title,
        body: req.body.body
    });
    thepost.save();
    req.flash('msg', 'Post created successfully');
    req.flash('type', 'success');
    res.redirect('/');
};

editController = (req, res) => {
    isSign(req, res);
    Posts.findOne({ _id: req.params.id }, (error, result) => {
        res.render('edit', { item: result, sign });
    });
};


updateController = (req, res) => {
    const updatedPost = {
        genres: req.body.genres,
        title: req.body.title,
        body: req.body.body
    };
    Posts.updateOne({ _id: req.params.id }, { $set: updatedPost }, (error) => { })
    req.flash('msg', 'Post updated successfully');
    req.flash('type', 'success');
    res.redirect('/');
};


deleteController = (req, res) => {
    Posts.deleteOne({ _id: req.params.id }, (error, result) => { });
    req.flash('msg', 'Post deleted successfully');
    req.flash('type', 'success');
    res.redirect('/');
};

module.exports = { indexController, showController, createController, insertController, editController, updateController, deleteController };