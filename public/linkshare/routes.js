(function() {
    'use strict';

    angular
        .module('linkshare.routes', [
            'ngRoute',
            'linkshare.controller'
        ])
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: '/template/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .when('/post', {
                templateUrl: '/template/post.html',
                controller: 'PostController',
                controllerAs: 'vm'
            })
            .otherwise('/home');
    }

}());