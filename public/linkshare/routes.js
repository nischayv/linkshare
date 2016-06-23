(function() {
    'use strict';

    angular
        .module('linkshare.route', [
            'ui.router',
            'linkshare.controller'
        ])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

    }

}());