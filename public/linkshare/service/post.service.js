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
            loadPost: loadPost
        };

        function loadPost(postId) {
            return $resource('/api/posts/' + postId, {}, {
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