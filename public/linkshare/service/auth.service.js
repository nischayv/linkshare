(function() {
    'use strict';

    angular
        .module('auth.service', [
            'ngResource'
        ])
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$window'];

    function AuthService($window) {
        return {
            saveToken: saveToken,
            getToken: getToken,
            isLoggedIn: isLoggedIn,
            currentUser: currentUser,
            register: register,
            login: login,
            logout: logout
        };

        function saveToken(token) {
            $window.localStorage["linkshare-token"] = token;
        }

        function getToken() {
            return $window.localStorage["linkshare-token"];
        }

        function isLoggedIn() {
            var token = getToken();

            if(token){
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        }

        function currentUser() {
            if(isLoggedIn()){
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.username;
            }
        }

        function register() {

        }

        function login() {

        }

        function logout() {

        }
    }

}());
