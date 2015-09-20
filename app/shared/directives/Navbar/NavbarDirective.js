(function() {
    'use strict';
    angular.module('ESTUDIOBOX')
        .directive('estudioboxNavbar', estudioboxNavbar);

    function estudioboxNavbar() {


        return {
            templateUrl: 'shared/directives/Navbar/NavbarTemplate.html',
            restrict: 'E',
            scope: {}
        };
    }
})();
