(function() {
    'use strict';

    angular
        .module('auth.controller', [
            'auth.service'
        ])
        .controller('AuthController', AuthController);

    AuthController.$inject = ['AuthService', '$location'];

    function AuthController(AuthService, $location) {
        var vm = this;
        vm.user = {};
        vm.error = {};
        vm.register = register;
        vm.login = login;
        activate();

        function activate() {
            if(AuthService.isLoggedIn()) {
                $location.path('/home');
            }
        }

        function register() {
            return AuthService.register(vm.user)
                .then(function() {
                    $location.path('/home');
                })
                .catch(function (error) {
                    console.log(error);
                    vm.error = error;
                });
        }

        function login() {
            console.log(vm.user);
            return AuthService.login(vm.user)
                .then(function() {
                    $location.path('/home');
                })
                .catch(function (error) {
                    console.log(error);
                    vm.error = error;
                });
        }
    }
}());