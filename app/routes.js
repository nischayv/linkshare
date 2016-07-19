//In larger apps this can be separated into multiple modules
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var path = require('path');
var passport = require('passport');
var User = mongoose.model('User');

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

// return homepage for angular front end
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

//REST routes
//method to get all posts
router.get('/api/posts', function(req, res, next) {
    Post.find(function(err, posts){
        if(err){
            return next(err);
        }
        res.json(posts);
    });
});

//method to create new post
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
router.get('/api/posts/:post', function(req, res) {
    req.post.populate('comments', function(err, post) {
        if (err) {
            return next(err);
        }
        res.json(post);
    });
});

//method to upvote post
router.put('/api/posts/:post/upvote', function(req, res, next) {
    req.post.upvote(function(err, post){
        if (err) {
            return next(err);
        }
        res.json(post);
    });
});

//method to add new comment
router.post('/api/posts/:post/comment', function(req, res, next) {
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
router.put('/api/posts/:post/comment/:comment/upvote', function(req, res, next) {
    req.comment.upvote(function(err, comment){
        if (err) {
            return next(err);
        }
        res.json(comment);
    });
});

router.post('/register', function(req, res, next){
    if(!req.body.username || !req.body.password){
        return res.status(400).json({message: 'Please fill out all fields'});
    }
    var user = new User();
    user.username = req.body.username;
    user.setPassword(req.body.password)
    user.save(function (err){
        if(err){
            return next(err);
        }
        return res.json({token: user.generateJWT()})
    });
});

router.post('/login', function(req, res, next){
    if(!req.body.username || !req.body.password){
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    passport.authenticate('local', function(err, user, info){
        if(err){ return next(err); }

        if(user){
            return res.json({token: user.generateJWT()});
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

module.exports = router;


