(function() {
    'use strict';

    angular
        .module('home.service', [

        ])
        .factory('HomeService', HomeService);

    HomeService.$inject = ['$q'];

    function HomeService($q) {
        return {
            loadPosts: loadPosts
        };

        function loadPosts() {
            return $resource('./api/posts', {}, {
                execute: {
                    method: 'GET',
                    isArray: true
                }
            }).execute().$promise
                .then(success)
                .catch(fail);

            function success(data) {
                return data;
            }

            function fail (error) {
                return $q.reject(error);
            }
        }
    }

}());