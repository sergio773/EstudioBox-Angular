(function() {

    angular.module('ESTUDIOBOX', [
        'ui.router',
        'ui.bootstrap',
        'LocalStorageModule',
        'configEnvironment',
        //'ngAnimate',
        'headroom',
        'ngSanitize',
        'duScroll'
    ])
        .run(MainRun)
        .config(MainConfig);

    MainRun.$inject = ['$rootScope', '$modalStack'];

    function MainRun($rootScope, $modalStack) {
        //$rootScope.Animations = Animations;
        scrollToTop($rootScope);
        closePopups($rootScope, $modalStack);
    }

    function scrollToTop($rootScope) {
        // scroll to top on every route change
        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
    }

    function closePopups($rootScope, $modalStack) {
        $rootScope.$on('$locationChangeStart', function (event) {
            var top = $modalStack.getTop();
            if (top) {
                $modalStack.dismiss(top.key);
                event.preventDefault();
            }
        });
    }

    MainConfig.$inject = ['$httpProvider', '$compileProvider', '$sceDelegateProvider'];

    function MainConfig($httpProvider, $compileProvider, $sceDelegateProvider) {
        var isDebug = false;
        $compileProvider.debugInfoEnabled(isDebug);
        setSceWhitelist($sceDelegateProvider);
    }

    function setSceWhitelist ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.

        ]);
    }

})();
