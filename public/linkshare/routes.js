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
            .when('/post/{id}', {
                templateUrl: 'linkshare/template/post.html',
                controller: 'PostController',
                controllerAs: 'vm'
            })
            .otherwise('/home');
    }

}());