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
    }
}());