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

        function addComment(postId, comment, user) {
            return $resource('/api/posts/' + postId + '/comment', {}, {
                execute: {
                    method: 'POST'
                }
            }).execute({body: comment, author: user}).$promise
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
                    method: 'PUT'
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