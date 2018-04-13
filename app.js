(function() {
    'use strict';
angular
    .module('claims', [
        'ui.router',
        'ngFileUpload',
        'angular-thumbnails',
        'ui.carousel',
        'ui.grid',
        'ui.grid.edit',
        'ui.grid.pinning',
        'ngMaterial',
        'daterangepicker',
        'ui.bootstrap'
    ])
    .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function stateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: "/",
                template: "<h4 style=\"text-align: center; padding: 150px;\">Claim Home</h4>"                
            })
            .state('claim-registration-general', {
                url: "/claim-registration-general",
                templateUrl: "resources/registration/view/registration-general.html",
                controller: 'RegistrationGeneralController'
            })
            .state('claim-registrationList', {
                url: "/claim-registrationList",
                templateUrl: "resources/registration/view/registration.html",
                controller: 'RegistrationController'
            })
            .state('finalization', {
                url: "/finalization",
                templateUrl: "resources/finalization/view/finalization.html",
                controller: 'FinalizationController'
            })
            .state('user-assignment', {
                url: "/user-assignment",
                templateUrl: "resources/user-assignment/view/user-assignment.html",
                controller: 'UserAssignmentController'
            })
            .state('eclaim', {
                url: "/eclaim",
                templateUrl: "resources/eclaim/view/eclaim.html",
                controller: 'EclaimController'
            })
            .state('claim-registration', {
                url: "/claim-registration",
                templateUrl: "resources/registration/view/registration.html",
                controller: 'RegistrationController'
            })
        $urlRouterProvider.otherwise("/");    
    }
})();
