(function() {
    'use strict';

    angular
        .module('claims')
        .controller('RegistrationGeneralController', RegistrationGeneralController)
    
    RegistrationGeneralController.$inject = ['$scope', '$rootScope', 'RegistrationService', '$state', '$uibModal', '$timeout', 'ngNotify', '$stateParams', 'claim', 'isNew'];

    function RegistrationGeneralController($scope, $rootScope, RegistrationService, $state, $uibModal, $timeout, ngNotify, $stateParams, claim, isNew) {
        $scope.regDetail = claim;
        $scope.previewIndex = 0;
        $scope.isNew = isNew;
        $scope.search = {};
        $scope.hasMandatory = true;
        $scope.documentTypes = RegistrationService.getDocumentTypes();
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

        $scope.uploadFiles = function(files, doc) {
            $scope.files = files;
            $scope.fileInfos = ($scope.fileInfos && $scope.fileInfos.length) ? $scope.fileInfos :[];
            var fileInfo = $scope.fileInfos;
            if($scope.hasMandatory) $scope.uploadedId = Math.random();
            angular.forEach($scope.files, function(file, key) {
                var f = {};
                var reader  = new FileReader();
                $timeout(function() {
                    file.progress = 20;
                },300);
                reader.onload = function(event) {
                    var base64String = event.target.result;//base64 String..
                    f.name = file.name;
                    f.contentType = file.type;
                    f.ext = 'excel';
                    f.uploadedDate = new Date();
                    f.documentTyp = $scope.hasMandatory ? doc.label :  $scope.upload.type//$scope.upload ? $scope.upload.type : '';
                    f.documentDesc = $scope.upload ? $scope.upload.description : '';
                    if(file.type.indexOf('image/') > -1)
                        f.ext = 'image';
                    if(file.type.indexOf('/pdf') > -1)
                        f.ext = 'pdf';
                    if(file.type.indexOf('.document') > -1)
                        f.ext = 'docx';
                    
                    f.previewUrl = base64String;
                    if($scope.hasMandatory) f.uploadedId = $scope.uploadedId;
                    fileInfo.push(f);
                    constructDocByTypes(doc, file.name);
                    if(!$scope.$$phase) {
                        $scope.$apply(function() {
                            $timeout(function() {
                                file.progress = 100;
                            },300)    
                            if(key == $scope.files.length-1) {
                                if(!$scope.hasMandatory) {
                                    $scope.noOfSlides = 5;
                                    $scope.showUpload = false;
                                    $scope.uploaded = true;
                                    $scope.fileInfos = fileInfo;
                                } else {
                                    $scope.uploaded = true;
                                    var uploadKey = $scope.fileInfos.length-1;
                                    $scope.openDocumentModal(uploadKey, $scope.fileInfos[uploadKey].uploadedId);
                                }
                            }
                        });
                    }    
                };
                reader.readAsDataURL(file);
            });
        }

        function constructDocByTypes(docObj, fileName) {
            if(docObj.files && docObj.files.length) {
                docObj.files.push(fileName);
            } else {
                docObj.files = [fileName];
            }
        }

        $scope.onCarouselInit = function() {
            $scope.files = [];
        }

        $scope.showPreview = function(index, item) {
            $scope.noOfSlides = 3;
            $scope.previewIndex = index;
            $scope.isPreview = true;
            $scope.showUpload = true;
        }

        $scope.searchClaims = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'resources/registration/view/claim-search-modal.html',
                size: 'lg',
                backdrop: 'static',
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

        $scope.openDocumentModal = function(index, uploadedId) {
            $scope.docObj = angular.copy($scope.fileInfos[index]);
            $scope.isUpload = uploadedId != null ? true : false;
            $scope.uploadModalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: 'resources/registration/view/upload-modal.html',
                size: 'lg',                
                scope: $scope
            });

            $scope.uploadModalInstance.result.then(function() {
                if(uploadedId != null) {
                    angular.forEach($scope.fileInfos, function(value, key) {
                        if(value.uploadedId == uploadedId) {
                            value.documentTyp = $scope.docObj.documentTyp;
                            value.documentDesc = $scope.docObj.documentDesc;
                        }
                    })
                } else {
                    $scope.fileInfos[index] = $scope.docObj;
                }
            });
        }

        $scope.cancelModal = function() {
            $scope.uploadModalInstance.dismiss();
        }

        $scope.saveDocument = function() {
            $scope.uploadModalInstance.close();            
        }

        $scope.documentsUpload = function() {
            $scope.upload = {};
            $scope.showUpload = true;//!$scope.showUpload;
            $scope.noOfSlides = $scope.showUpload ? 3 : 5;
            $scope.isPreview = false;
        }

        $scope.toggleInfo = function() {
            $scope.isPreview = false;
            $scope.showUpload = false;
            $scope.noOfSlides = 5;
        }

        function init() {
            $scope.regDetail.paymentWay ? $scope.setPaymentWay($scope.regDetail.paymentWay) : '';
            $scope.regDetail.source ? $scope.setDcoumentType($scope.regDetail.source) : '';
        }

        init();
    }
})();