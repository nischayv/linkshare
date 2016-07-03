//In larger apps this can be separated into multiple modules
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var path = require('path');

//middleware to find post with id
router.param('post', function(req, res, next, id) {
    var query = Post.findById(id);

    query.exec(function (err, post){
        if (err) {
            return next(err);
        }
        if (!post) {
            return next(new Error('Post does not exist'));
        }

        req.post = post;
        return next();
    });
});

//middleware to find comment by id
router.param('comment', function(req, res, next, id) {
    var query = Comment.findById(id);

    query.exec(function (err, comment){
        if (err) {
            return next(err);
        }
        if (!comment) {
            return next(new Error('Comment does not exist'));
        }

        req.comment = comment;
        return next();
    });
});

//return homepage for angular front end
router.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/api/posts', function(req, res, next) {
    Post.find(function(err, posts){
        if(err){
            return next(err);
        }
        res.json(posts);
    });
});

//REST routes
//method to get all posts
router.post('/api/posts', function(req, res, next) {
    var post = new Post(req.body);

    post.save(function(err, post){
        if(err){
            return next(err);
        }

        res.json(post);
    });
});

//method to get specific post
router.get('/posts/:post', function(req, res) {
    req.post.populate('comments', function(err, post) {
        if (err) {
            return next(err);
        }

        res.json(post);
    });
});

//method to upvote post
router.put('/posts/:post/upvote', function(req, res, next) {
    req.post.upvote(function(err, post){
        if (err) {
            return next(err);
        }

        res.json(post);
    });
});

//method to add new comment
router.post('/posts/:post/comment', function(req, res, next) {
    var comment = new Comment(req.body);
    comment.post = req.post;

    comment.save(function(err, comment){
        if(err){
            return next(err);
        }

        req.post.comments.push(comment);
        req.post.save(function(err) {
            if(err){
                return next(err);
            }

            res.json(comment);
        });
    });
});

//method to upvote comment
router.put('/posts/:post/comment/:comment/upvote', function(req, res, next) {
    req.comment.upvote(function(err, comment){
        if (err) {
            return next(err);
        }

        res.json(comment);
    });
});


module.exports = router;


