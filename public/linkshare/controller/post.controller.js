(function() {
    'use strict';

    angular
        .module('post.controller', [
            'post.service'
        ])
        .controller('PostController', PostController);

    PostController.$inject = ['PostService', '$q'];

    function PostController(PostService, $q) {
        var vm = this;
        

        function activate() {

        }
    }
}());