(function () {
    "use strict";
    angular.module('ESTUDIOBOX')
        .config(ConfigRoutes);

    ConfigRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function ConfigRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise(function($injector) {
            var $state = $injector.get('$state');
            $state.go('estudiobox');
        });

        $urlRouterProvider.rule(function($injector, $location) {
            var path = $location.path();
            var hasTrailingSlash = path[path.length - 1] === '/';

            if(hasTrailingSlash) {
                //if last charcter is a slash, return the same url without the slash
                return path.substr(0, path.length - 1);
            }
        });

        $locationProvider.hashPrefix('!');

        $urlRouterProvider.when('', ['$state', function ($state) {
            $state.go('estudiobox');
        }]);

        $stateProvider
            .state('estudiobox', {
                url: '/',
                views: {
                    'header': {
                        templateUrl: 'shared/header/HeaderTemplate.html',
                        controller: 'HeaderController as header'
                    },
                    'content': {
                        templateUrl: 'pages/home/HomeTemplate.html',
                        controller: 'HomeController as home'
                    },
                    'footer': {
                        templateUrl: 'shared/footer/Footer.html'
                    }
                }
            });
    }
})();
