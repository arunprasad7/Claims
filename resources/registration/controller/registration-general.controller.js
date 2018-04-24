(function() {
    'use strict';

    angular
        .module('claims')
        .controller('RegistrationGeneralController', RegistrationGeneralController)
    
    RegistrationGeneralController.$inject = ['$scope', '$rootScope', 'RegistrationService', '$state', '$uibModal', '$timeout', 'ngNotify', '$stateParams', 'claim'];

    function RegistrationGeneralController($scope, $rootScope, RegistrationService, $state, $uibModal, $timeout, ngNotify, $stateParams, claim, $uibModalInstance) {
        $scope.regDetail = claim;
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
            $scope.fileInfos = ($scope.fileInfos && $scope.fileInfos.length) ? $scope.fileInfos :[];
            var fileInfo = $scope.fileInfos;
            angular.forEach($scope.files, function(file, key) {
                var f = {};
                var reader  = new FileReader();
                $timeout(function() {
                    file.progress = 30;
                },300);
                reader.onload = function(event) {
                    var base64String = event.target.result;//base64 String..
                    f.name = file.name;
                    f.contentType = file.type;
                    f.ext = 'docx';
                    f.uploadedDate = new Date();
                    f.uploadType = $scope.upload ? $scope.upload.type : '';
                    f.uploadDesc = $scope.upload ? $scope.upload.description : '';
                    if(file.type.indexOf('image/') > -1)
                        f.ext = 'image';
                    if(file.type.indexOf('/pdf') > -1)
                    f.ext = 'pdf';
                    if(file.type.indexOf('.document') > -1)
                    f.ext = 'docx';
                    
                    f.previewUrl = base64String;
                    fileInfo.push(f);
                    $scope.$apply(function() {
                        $timeout(function() {
                            file.progress = 100;
                        },300)    
                        if(key == $scope.files.length-1) {
                            $scope.noOfSlides = 4;
                            $scope.showUpload = false;                            
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
            $scope.showUpload = true;
            $scope.noOfSlides = 3;
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
                        $('.modal-backdrop').remove();
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
                $('.modal-backdrop').remove();
                if(result.isNew) {
                    $scope.search = {};
                } else {
                    $scope.setDcoumentType($scope.regDetail.source);
                    $scope.setPaymentWay($scope.regDetail.paymentWay);
                }
            })    
        }

        $scope.deleteFile = function(index) {
            $scope.fileInfos.splice(index, 1);
        }

        $scope.uploadIbanFiles = function(file) {
            if(file != null) {
                var reader  = new FileReader();
                $scope.ibanFile = {'isUploading' : true};
                reader.onload = function(event) {
                    $scope.$apply(function() {
                        $scope.ibanFile.url = event.target.result;
                        $scope.ibanFile.name = file.name;
                        $scope.ibanFile.isUploading = false;
                    });    
                }
                reader.readAsDataURL(file);
            }            
        }

        $scope.openUploadModal = function() {
            $scope.upload = {};            
            $scope.uploadModalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'resources/registration/view/upload-modal.html',
                size: 'lg',                
                scope: $scope
            });
        }

        $scope.cancelModal = function() {
            $scope.uploadModalInstance.dismiss();
        }

        $scope.continueUpload = function() {
            $scope.showUpload = true;
            $scope.noOfSlides = 3;
            $scope.uploadModalInstance.close();            
        }

        $scope.toggleUpload = function() {
            $scope.showUpload = !$scope.showUpload;
            $scope.noOfSlides = $scope.showUpload ? 3 : 4;
            $scope.isPreview = false;
        }

        function init() {
            $scope.regDetail.paymentWay ? $scope.setPaymentWay($scope.regDetail.paymentWay) : '';
            $scope.regDetail.source ? $scope.setDcoumentType($scope.regDetail.source) : '';
        }

        init();
    }
})();