(function() {
    'use strict';

    angular
        .module('post.service', [
            'ngResource'
        ])
        .factory('PostService', PostService);

    PostService.$inject = ['$q', '$resource'];

    function PostService($q, $resource) {
        return {
            loadPosts: loadPosts
        };

        function loadPosts() {
            return $resource('/api/posts', {}, {
                execute: {
                    method: 'GET'
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