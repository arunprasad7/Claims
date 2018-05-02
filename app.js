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
        'ui.bootstrap',
        'ngNotify'
    ])
    .config(stateConfig)
    .run(appConfig)

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function stateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: "/",
                template: "<h4 style=\"text-align: center; padding: 150px;\">Claim Home</h4>"                
            })
            .state('claim-registration-new', {
                url: "/claim-registration-general",
                templateUrl: "resources/registration/view/registration-general.html",
                controller: 'RegistrationGeneralController',
                resolve : {
                    claim : function(RegistrationService) {
                        return RegistrationService.createRegDetailObj();
                    },
                    isNew : function() {
                        return true;
                    }
                }
            })

            .state('claim-registration-edit', {
                url: "/claim-registration-general",
                templateUrl: "resources/registration/view/registration-general.html",
                controller: 'RegistrationGeneralController',
                resolve : {
                    claim : function(ListViewService) {
                        return ListViewService.getRequestData();
                    },
                    isNew : function() {
                        return false;
                    }
                }
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
                url: "/user-assignment/:param",
                templateUrl: "resources/user-assignment/view/user-assignment.html",
                controller: 'UserAssignmentController'
            })
            .state('eclaim', {
                url: "/eclaim",
                templateUrl: "resources/eclaim/view/eclaim-processing.html",
                controller: 'EclaimProcessingController'
            })
            .state('claim-registration', {
                url: "/claim-registration",
                templateUrl: "resources/registration/view/registration.html",
                controller: 'RegistrationController'
            })
            .state('reimbursement-processing', {
                url: "/reimbursement-processing",
                templateUrl: "resources/reimbursement-claims/view/reimbursement-processing.html",
                controller: 'ReimbursmentProcessingController'
            })
            .state('eclaim-batch', {
                url: "/eclaim-batch",
                templateUrl: "resources/eclaim/view/eclaim-batch.html",
                controller: 'EclaimBatchController'
            })
        $urlRouterProvider.otherwise("/");    
    }

    function appConfig ($transitions, $rootScope, ngNotify) {
        ngNotify.config({
            position: 'top',
            duration: 2000,
            button : true
        });

        $transitions.onSuccess({}, function() {
            $rootScope.navbar = false;
        });

        $rootScope.clearDatepickerKeyupValue = function(event) {
            if(event.keyCode != 9 && event.keyCode != 13 && event.keyCode != 37 && event.keyCode != 27
                && event.keyCode != 38 && event.keyCode != 39 && event.keyCode != 40) {
                event.target.value = "";
            }
        }    
    }
})();
