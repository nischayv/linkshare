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

        activate();

        function activate() {

        }

        function register() {
            return AuthService.register(vm.user)
                .then(function(data) {
                    $location.path('/home');
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function login() {
            return AuthService.login(vm.user)
                .then(function(data) {
                    $location.path('/home');
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}());