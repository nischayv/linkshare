(function() {
    'use strict';

    angular
        .module('linkshare.routes', [
            'ngRoute',
            'linkshare.controller'
        ])
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'linkshare/template/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .when('/post', {
                templateUrl: 'linkshare/template/post.html',
                controller: 'PostController',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: 'linkshare/template/register.html',
                controller: 'AuthController',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: 'linkshare/template/login.html',
                controller: 'AuthController',
                controllerAs: 'vm'
            })
            .otherwise('/home');

       // $locationProvider.html5Mode(true);
    }

}());