(function () {

    "use strict";

    angular.module("ESTUDIOBOX")
        .controller("HeaderController", HeaderController);

    HeaderController.$inject = ['$scope', '$document'];

    function HeaderController($scope, $document) {

       /* $scope.scrollArrow = scrollArrow;

        function scrollArrow ()  {
            var offset = 0;
            var duration = 800;
            var element = $('#panel');
            $document.scrollToElement(element, offset, duration);
        }*/
    }

})();
