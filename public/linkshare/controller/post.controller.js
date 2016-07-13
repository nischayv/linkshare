(function() {
    'use strict';

    angular
        .module('post.controller', [
            'post.service'
        ])
        .controller('PostController', PostController);

    PostController.$inject = ['PostService', '$routeParams'];

    function PostController(PostService, $routeParams) {
        var vm = this;
        vm.post = {};
        vm.user = '';
        vm.comment = '';
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
            return PostService.addComment($routeParams.postId, vm.comment, vm.user)
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