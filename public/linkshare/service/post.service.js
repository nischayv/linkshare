(function() {
    'use strict';

    angular
        .module('post.service', [
            'ngResource',
            'auth.service'
        ])
        .factory('PostService', PostService);

    PostService.$inject = ['$q', '$resource', 'AuthService'];

    function PostService($q, $resource, AuthService) {
        return {
            loadPost: loadPost,
            addComment: addComment,
            incrementUpvotes: incrementUpvotes
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

        function addComment(postId, comment) {
            return $resource('/api/posts/' + postId + '/comment', {}, {
                execute: {
                    method: 'POST',
                    headers: {Authorization: 'Bearer' + AuthService.getToken()}
                }
            }).execute({body: comment}).$promise
                .then(success)
                .catch(fail);

            function success(data) {
                return data;
            }

            function fail (error) {
                return $q.reject(error);
            }
        }

        function incrementUpvotes(postId, commentId) {
            return $resource('/api/posts/' + postId + '/comment/'+ commentId + '/upvote', {}, {
                execute: {
                    method: 'PUT',
                    headers: {Authorization: 'Bearer' + AuthService.getToken()}
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