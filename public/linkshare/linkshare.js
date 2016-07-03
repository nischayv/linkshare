(function() {
    'use strict';

    angular.module('linkshare', [
        'ui.router',
        'ui.bootstrap',
        'linkshare.service',
        'linkshare.controller',
        'linkshare.routes',
        'linkshare.directive'
    ]);
}());
