(function () {
    "use strict";

    angular.module("ESTUDIOBOX")
        .controller("ContactController", ContactController);


    //HomeController.$inject = ['$window', 'MetaTags', "FeedService", 'NewsletterService', 'ENV', 'Popup', 'JWPlayerService'];

    function ContactController() {

        var contact = this;
        contact.email = '';
        contact.name = '';
        contact.message = '';

        activate();

        function activate() {


        }

        function send() {
            console.log('Sending message');
        }
    }

})();
