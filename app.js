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
        'ui.bootstrap',
        'ngNotify',
        'pascalprecht.translate'
    ])
    .config(stateConfig)
    .config(translationConfig)
    .run(appConfig)

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function stateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: "/",
                template: "<h4 style=\"text-align: center; padding: 150px;\" data-translate=\"home.title\">Claim Home</h4>",
                resolve : {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('home');
                        return $translate.refresh();
                    }]
                }
            })

            .state('reimbursement-registration', {
                url: "/reimbursement-registration",
                templateUrl: "resources/reimbursement-claims/registration/view/reimbursement-registration.html",
                controller: 'ReimbursementRegistrationController',
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('reimbursement-registration');
                        return $translate.refresh();
                    }]
                }
            })

            .state('reimbursement-registration-new', {
                url: "/reimbursement-registration-general",
                templateUrl: "resources/reimbursement-claims/registration/view/reimbursement-registration-general.html",
                controller: 'ReimbursementRegistrationGeneralController',
                resolve : {
                    claim : function(ReimbursementRegistrationService) {
                        return ReimbursementRegistrationService.createRegDetailObj();
                    },
                    isNew : function() {
                        return true;
                    }
                }
            })

            .state('reimbursement-registration-edit', {
                url: "/reimbursement-registration-general",
                templateUrl: "resources/reimbursement-claims/registration/view/reimbursement-registration-general.html",
                controller: 'ReimbursementRegistrationGeneralController',
                resolve : {
                    claim : function(ListViewService) {
                        return ListViewService.getRequestData();
                    },
                    isNew : function() {
                        return false;
                    }
                }
            })

            .state('reimbursement-finalization', {
                url: "/reimbursement-finalization",
                templateUrl: "resources/reimbursement-claims/finalization/view/reimbursement-finalization.html",
                controller: 'ReimbursementFinalizationController',
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('reimbursement-finalization');
                        return $translate.refresh();
                    }]
                }
            })

            .state('reimbursement-user-assignment', {
                url: "/reimbursement-user-assignment",
                templateUrl: "resources/reimbursement-claims/user-assignment/view/reimbursement-user-assignment.html",
                controller: 'ReimbursementUserAssignmentController',
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('reimbursement-user-assignment');
                        return $translate.refresh();
                    }]
                }
            })

            .state('eclaim-processing', {
                url: "/eclaim-processing",
                templateUrl: "resources/eclaim/view/eclaim-processing.html",
                controller: 'EclaimProcessingController'
            })
            
            .state('reimbursement-processing', {
                url: "/reimbursement-processing",
                templateUrl: "resources/reimbursement-claims/processing/view/reimbursement-processing.html",
                controller: 'ReimbursmentProcessingController',
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('reimbursement-processing');
                        return $translate.refresh();
                    }]
                }
            })
        $urlRouterProvider.otherwise("/");    
    }
    
    function translationConfig($translateProvider) {
        $translateProvider.preferredLanguage('en-US');
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'i18n/{lang}/{part}.json'
        });
    }

    function appConfig ($transitions, $rootScope, ngNotify, $state) {
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
        
        $rootScope.navigateTo = function(stateName) {
            $state.go(stateName);
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('claims')
        .controller('LanguageController', LanguageController)

    LanguageController.$inject = ['$translate', '$scope'];

    function LanguageController($translate, $scope) {
        $scope.languages = {
            'en-US' : 'English',
            'ar-AR' : 'Arabic'
        }
        $scope.selectedLanguage = 'en-US';
        $scope.changelanguage = function() {
            $translate.use($scope.selectedLanguage).then(function() {
                $translate.refresh();
            });
        }
    }
})();
