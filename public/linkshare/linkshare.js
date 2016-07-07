(function() {
    'use strict';

    angular.module('linkshare', [
        'ngRoute',
        'ui.bootstrap',
        'linkshare.service',
        'linkshare.controller',
        'linkshare.routes',
        'linkshare.directive'
    ]);
}());
