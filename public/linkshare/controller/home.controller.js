(function() {
    'use strict';

    angular
        .module('home.controller', [
            'home.service'
        ])
        .controller('HomeController', HomeController);

    HomeController.$inject = ['HomeService', '$q'];

    function HomeController(HomeService, $q) {
        var vm = this;
        vm.posts = [];
        vm.title = '';
        vm.link = '';
        vm.addPost = addPost;
        vm.incrementUpvotes = incrementUpvotes;
        activate();

        function activate() {
            return HomeService.loadPosts()
                .then(function(data) {
                    console.log(data);
                    vm.posts = data;
                    $q.resolve();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function addPost() {

        }

        function incrementUpvotes() {
            
        }

    }
}());