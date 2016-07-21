(function() {
    'use strict';

    angular
        .module('post.controller', [
            'post.service'
        ])
        .controller('PostController', PostController);

    PostController.$inject = ['PostService', '$routeParams', 'AuthService'];

    function PostController(PostService, $routeParams, AuthService) {
        var vm = this;
        vm.post = {};
        vm.user = 'nischayv';
        vm.comment = '';
        vm.isLoggedIn = AuthService.isLoggedIn;
        vm.addComment = addComment;
        vm.incrementUpvotes = incrementUpvotes;
        activate();

        function activate() {
            return PostService.loadPost($routeParams.postId)
                .then(function(data) {
                    console.log(data);
                    vm.post = data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function addComment() {
            return PostService.addComment($routeParams.postId, vm.comment)
                .then(function(data) {
                    console.log(data);
                    vm.post.comments.push(data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function incrementUpvotes(comment){
            return PostService.incrementUpvotes($routeParams.postId, comment._id)
                .then(function(data) {
                    console.log(data);
                    comment.upvotes += 1;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}());