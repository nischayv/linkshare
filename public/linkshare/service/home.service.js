(function() {
    'use strict';

    angular
        .module('home.service', [
            'ngResource',
            'auth.service'
        ])
        .factory('HomeService', HomeService);

    HomeService.$inject = ['$q', '$resource', 'AuthService'];

    function HomeService($q, $resource, AuthService) {
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
                    method: 'POST',
                    headers: {Authorization: 'Bearer ' + AuthService.getToken()}
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
                    method: 'PUT',
                    headers: {Authorization: 'Bearer ' + AuthService.getToken()}
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