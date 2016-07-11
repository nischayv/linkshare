(function() {
    'use strict';

    angular
        .module('home.controller', [
            'home.service'
        ])
        .controller('HomeController', HomeController);

    HomeController.$inject = ['HomeService', '$location'];

    function HomeController(HomeService, $location) {
        var vm = this;
        vm.posts = [];
        vm.title = '';
        vm.link = '';
        vm.addPost = addPost;
        vm.incrementUpvotes = incrementUpvotes;
        vm.comments = comments;
        activate();

        function activate() {
            return HomeService.loadPosts()
                .then(function(data) {
                    console.log(data);
                   vm.posts = data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function addPost() {
            return HomeService.addPost(vm.title, vm.link)
                .then(function(data) {
                    console.log(data);
                    vm.posts.push(data);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function incrementUpvotes(post) {
            return HomeService.incrementUpvotes(post._id)
                .then(function(data) {
                    console.log(data);
                    post.upvotes += 1;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function comments(postId) {
            $location.path('/post').search({param: postId});
        }
    }
}());