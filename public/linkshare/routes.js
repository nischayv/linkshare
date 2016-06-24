(function() {
    'use strict';

    angular
        .module('linkshare.route', [
            'ui.router',
            'linkshare.controller'
        ])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/template/home.html',
                controller: 'HomeController'
            })
            .state('post', {
                url: '/post/{id}',
                templateUrl: '/template/post.html',
                controller: 'PostController'
            });
        $urlRouterProvider.otherwise('home');
    }

}());