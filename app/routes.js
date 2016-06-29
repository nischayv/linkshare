//In larger apps this can be separated into multiple modules
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

router.get('/linkshare/*', function(req, res) {
    res.sendFile('./public/index.html');
});

router.get('/api/posts', function(req, res, next) {
    Post.find(function(err, posts){
        if(err){ return next(err); }

        res.json(posts);
    });
});

router.post('/api/posts', function(req, res, next) {
    var post = new Post(req.body);

    post.save(function(err, post){
        if(err){ return next(err); }

        res.json(post);
    });
});


module.exports = router;


