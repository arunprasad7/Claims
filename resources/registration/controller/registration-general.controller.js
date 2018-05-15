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
        $scope.fileInfos = [];
        $scope.documents = [];
        $scope.docTypes = [];
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
            $state.go('claim-registration');
        }

        $scope.uploadFiles = function(files, doc) {
            $scope.files = files;
            $scope.fileInfos = ($scope.fileInfos && $scope.fileInfos.length) ? $scope.fileInfos :[];
            $scope.uploadedId = $scope.hasMandatory ? Math.random() : null;
            var files = [];
            angular.forEach($scope.files, function(value, key) {
                var reader  = new FileReader();
                $timeout(function() {
                    value.progress = 20;
                },150);
                reader.onload = function(event) {
                    var file = constructFileObj(value, event, doc);
                    files.push(file);
                    $scope.fileInfos.push(file);
                    $scope.$apply(function() {
                        $timeout(function() {
                            value.progress = 100;
                        },300)
                        if(files.length == $scope.files.length) documentsUploaded();
                    });
                };
                reader.readAsDataURL(value);
            });
        }

        function constructFileObj(file, event, doc) {
            var fileObj = {};
            fileObj.id = Math.random();
            var base64String = event.target.result;//base64 String..
            fileObj.name = file.name;
            fileObj.contentType = file.type;
            fileObj.ext = 'excel';
            fileObj.uploadedDate = new Date();
            fileObj.documentTyp = $scope.hasMandatory ? doc.label :  $scope.upload.type;
            fileObj.documentDesc = $scope.upload ? $scope.upload.description : '';
            if(file.type.indexOf('image/') > -1)
                fileObj.ext = 'image';
            if(file.type.indexOf('/pdf') > -1)
                fileObj.ext = 'pdf';
            if(file.type.indexOf('.document') > -1)
                fileObj.ext = 'docx';

            fileObj.previewUrl = base64String;
            if($scope.hasMandatory) fileObj.uploadedId = $scope.uploadedId;

            return fileObj;
        }

        function documentsUploaded() {
            $scope.uploaded = true;
            $scope.documents = angular.copy($scope.fileInfos);
            if(!$scope.hasMandatory) {
                $scope.noOfSlides = 5;
                $scope.showUpload = false;
            } else {
                var uploadKey = $scope.fileInfos.length-1;
                $scope.openDocumentModal(uploadKey, $scope.fileInfos[uploadKey].uploadedId);
            }
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
                keyboard :false,
                controller: function ($scope, $uibModalInstance, claims, searchObj) {
                    $scope.searchedList = claims;
                    $scope.searchObj = searchObj;
                    $scope.cancelModal = function() {
                        $uibModalInstance.dismiss();
                        $('.modal-backdrop').remove();
                    }

                    $scope.newClaim = function() {
                        $scope.registerNew = true;
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
            }, function() {});    
        }

        $scope.deleteFile = function(index, id) {
            for(var f = 0; f<$scope.fileInfos.length; f++) {
                if($scope.fileInfos[f].id != id) continue;
                $scope.fileInfos.splice(f, 1);
                break;
            }
            $scope.documents.splice(index, 1);  
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
            $scope.docObj = angular.copy($scope.documents[index]);
            $scope.isUpload = uploadedId != null ? true : false;
            $scope.uploadModalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: 'resources/registration/view/upload-modal.html',
                size: 'lg',
                keyboard :false,
                scope: $scope
            });

            $scope.uploadModalInstance.result.then(
                function() {
                    if(uploadedId != null) {
                        angular.forEach($scope.documents, function(value, key) {
                            if(value.uploadedId == uploadedId) updateDocument(value);
                        })
                    } else {
                        angular.forEach($scope.fileInfos, function(value, key) {
                            if(value.id == $scope.docObj.id) updateDocument(value);
                        })
                        $scope.documents[index] = $scope.docObj;                        
                    }
                    if($scope.docTypes && $scope.docTypes.length)$scope.filterDocuments();
                }, function() {}
            );
        }

        function updateDocument(value) {
            value.documentTyp = $scope.docObj.documentTyp;
            value.documentDesc = $scope.docObj.documentDesc;
        }

        $scope.cancelModal = function() {
            $scope.uploadModalInstance.dismiss();
        }

        $scope.saveDocument = function() {
            $scope.uploadModalInstance.close();            
        }

        $scope.documentsUpload = function() {
            $scope.upload = {};
            $scope.showUpload = true;
            $scope.noOfSlides = $scope.showUpload ? 3 : 5;
            $scope.isPreview = false;
        }

        $scope.toggleInfo = function() {
            $scope.isPreview = false;
            $scope.showUpload = false;
            $scope.noOfSlides = 5;
        }

        $scope.filterDocuments = function() {
            var documents = [];
            if($scope.docTypes.length) {
                    $scope.docTypes.forEach(function(type) {
                        var filteredFiles =  $scope.fileInfos.filter(function(item) {
                            return (item.documentTyp == type);
                        })
                        documents = documents.concat(filteredFiles);
                    })
                    $scope.documents = documents;
            } else {
                $scope.documents = angular.copy($scope.fileInfos);
            }
        }

        function init() {
            $scope.regDetail.paymentWay ? $scope.setPaymentWay($scope.regDetail.paymentWay) : '';
            $scope.regDetail.source ? $scope.setDcoumentType($scope.regDetail.source) : '';
        }

        $scope.clearDocFilter = function() {
            $scope.docTypes = [];
            $scope.documents = angular.copy($scope.fileInfos);
        }

        init();
    }
})();