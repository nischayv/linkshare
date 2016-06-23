(function() {
    'use strict';

    angular.module('linkshare', [
        'ui.router',
        'ui.bootstrap',
        'linkshare.config',
        'linkshare.service',
        'linkshare.controller',
        'linkshare.route',
        'linkshare.directive',
        'linkshare.templates'
    ]);
}());
