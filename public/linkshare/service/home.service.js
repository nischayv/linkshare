(function() {
    'use strict';

    angular
        .module('home.service', [
            'ngResource'
        ])
        .factory('HomeService', HomeService);

    HomeService.$inject = ['$q', '$resource'];

    function HomeService($q, $resource) {
        return {
            loadPosts: loadPosts,
            addPost: addPost,
            incrementUpvotes: incrementUpvotes
        };

        function loadPosts() {
            return $resource('/api/posts', {}, {
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

            function fail(error) {
                return $q.reject(error);
            }
        }
        
        function addPost(title, link) {
            return $resource('/api/posts', {}, {
                execute: {
                    method: 'POST'
                }
            }).execute({title: title, link: link}).$promise
                .then(success)
                .catch(fail);

            function success(data) {
                return data;
            }

            function fail(error) {
                return $q.reject(error);
            }
        }
        
        function incrementUpvotes(id) {
            return $resource('/api/posts/' + id + '/upvote', {}, {
                execute: {
                    method: 'PUT'
                }
            }).execute().$promise
                .then(success)
                .catch(fail);

            function success(data) {
                return data;
            }

            function fail(error) {
                return $q.reject(error);
            }
        }
    }

}());