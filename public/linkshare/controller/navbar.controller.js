(function() {
    'use strict';

    angular
        .module('navbar.controller', [
            'auth.service'
        ])
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['AuthService', '$location'];

    function NavbarController(AuthService, $location) {
        var vm = this;
        vm.isLoggedIn = AuthService.isLoggedIn;
        vm.logout = logout;
        vm.user = AuthService.currentUser;
        activate();

        function activate() {
            console.log(vm.isLoggedIn());
        }

        function logout() {
            AuthService.logout();
            $location.path('/login');
        }
    }
}());