(function() {
    'use strict';

    angular
        .module('claims')
        .controller('RegistrationGeneralController', RegistrationGeneralController)
    
    RegistrationGeneralController.$inject = ['$scope', '$rootScope', 'RegistrationService', '$sce', '$state', '$uibModal'];

    function RegistrationGeneralController($scope, $rootScope, RegistrationService, $sce, $state, $uibModal) {
        $scope.regDetail = RegistrationService.createRegDetailObj();
        $scope.previewIndex = 0;
        
        $scope.setDcoumentType = function(documentType) {
            $scope.regDetail['source'] = documentType;
            $scope.documentType = documentType;
        }

        $scope.setPaymentWay = function(paymentType) {
            $scope.regDetail['paymentWay'] = paymentType;
            $scope.paymentWay = paymentType;
            $scope.regDetail['ibanNum'] = paymentType != 'cheque' ? $scope.regDetail['ibanNum'] : null;
        }

        $scope.registerClaim = function() {
            RegistrationService.registerClaim($scope.regDetail);
            $state.go('claim-registrationList');
        }

        $scope.uploadFiles = function(files) {
            localStorage.removeItem("filesInfo");
            $scope.files = files;
            var fileInfo = [];
            $scope.fileInfos = [];
            angular.forEach($scope.files, function(file, key) {
                var f = {};
                var reader  = new FileReader();
                file.progress = 10;
                reader.onload = function(event) {
                    var base64String = event.target.result;//base64 String..
                    f.name = file.name;
                    f.contentType = file.type;
                    f.ext = 'docx';
                    f.uploadedDate = new Date();
                    if(file.type.indexOf('image/') > -1)
                        f.ext = 'image';
                    if(file.type.indexOf('/pdf') > -1)
                    f.ext = 'pdf';
                    if(file.type.indexOf('.document') > -1)
                    f.ext = 'docx';
                    
                    f.previewUrl = base64String;
                    fileInfo.push(f);
                    $scope.$apply(function() {
                        file.progress = 100;
                        if(key == $scope.files.length-1) {
                            $scope.uploaded = true;
                            $scope.fileInfos = fileInfo;
                        }
                    });
                };
                reader.readAsDataURL(file);            
            });
        }

        $scope.onCarouselInit = function() {
            $scope.files = [];
        }

        $scope.showPreview = function(index, item) {
            $scope.isPreview = true;
            $scope.previewIndex = index;
        }

        $scope.hidePreview = function() {
            $scope.isPreview = false;
        }

        $scope.searchClaims = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'resources/registration/view/claim-search-modal.html',
                size: 'lg',
                controller: function ($scope, $uibModalInstance, claims, searchObj) {
                    $scope.searchedList = claims;
                    $scope.searchObj = searchObj;
                    $scope.cancelModal = function() {
                        $uibModalInstance.dismiss();
                    }

                    $scope.newClaim = function() {
                        var newClaim = RegistrationService.createRegDetailObj();
                        var claimObj = {'claim' : newClaim, 'isNew' : true};
                        $uibModalInstance.close(claimObj);
                    }

                    $scope.continue = function(claim) {
                        var claimObj = {'claim' : claim, 'isNew' : false};
                        $uibModalInstance.close(claimObj);
                    }
                },                    
                resolve: {
                    claims : function () {
                        return RegistrationService.searchClaims($scope.search);
                    },
                    searchObj : function() {
                        return $scope.search;
                    }
                }
            });

            modalInstance.result.then(function(result) {
                $scope.regDetail = result.claim;
                if(result.isNew) $scope.search = {};
            })    
        }
    }    
})();