(function() {
    'use strict';

    angular
        .module('navbar.controller', [
            'auth.service'
        ])
        .controller('NavbarController', AuthController);

    AuthController.$inject = ['AuthService'];

    function AuthController(AuthService) {
        var vm = this;
        vm.isLoggedIn = AuthService.isLoggedIn;
        vm.logout = AuthService.logout;
        vm.currentUser = AuthService.currentUser;
    }
}());