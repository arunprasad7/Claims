(function() {
    'use strict';
    angular
        .module('claims')
        .controller('ReimbListViewController', ReimbListViewController)

    ReimbListViewController.$inject = ['$scope', '$rootScope', '$filter'];

    function ReimbListViewController($scope, $rootScope, $filter) {
        $scope.referenceNumber;
        $scope.memberCardNumber;

        $scope.claimTreatMent = [{
            referenceNumber: "8918563923549888739",
            memberNumber: "9566340416",
            memberName: "Ashraf",
            mobileNumber: "+ 89 0922418901",
            alternateEmail: "ashraf@gmail.com",
            paymentType: "Cheque - 34442091",
            iBANNumber: "897667890"
        }, {
            referenceNumber: "8742084269009888711",
            memberNumber: "8566340716",
            memberName: "Hussain",
            mobileNumber: "+ 89 0907878903",
            alternateEmail: "hussain@gmail.com",
            paymentType: "Cheque - 32239083",
            iBANNumber: "882626789"

        }, {
            referenceNumber: "8600974274532888782",
            memberNumber: "9566340416",
            memberName: "Rahman",
            mobileNumber: "+ 89 0909833201",
            alternateEmail: "rahman@gmail.com",
            paymentType: "Cheque - 34789192",
            iBANNumber: "784467838"
        }, {
            referenceNumber: "8709876783427123481",
            memberNumber: "7766340416",
            memberName: "Riyas",
            mobileNumber: "+ 89 0908828904",
            alternateEmail: "riyas@gmail.com",
            paymentType: "Cheque - 34789324",
            iBANNumber: "896657871"

        }, {
            referenceNumber: "8409893521228678769",
            memberNumber: "3457678876",
            memberName: "Abdul Rahman",
            mobileNumber: "+ 89 0909676902",
            alternateEmail: "abdulrahman@gmail.com",
            paymentType: "Cheque - 34781127",
            iBANNumber: "867217887"
        }, {
            referenceNumber: "8209153782398887891",
            memberNumber: "8866340416",
            memberName: "Ansar",
            mobileNumber: "+ 89 0911388901",
            alternateEmail: "ansar@gmail.com",
            paymentType: "Cheque - 34789224",
            iBANNumber: "999234520"
        }, {
            referenceNumber: "8909876789009888789",
            memberNumber: "3457678876",
            memberName: "Mohammed",
            mobileNumber: "+ 89 0988432909",
            alternateEmail: "mohammed@gmail.com",
            paymentType: "Cheque - 34589543",
            iBANNumber: "874832190"
        }, {
            referenceNumber: "8009876722822878913",
            memberNumber: "9566340416",
            memberName: "Abdul ",
            mobileNumber: "+ 89 0909886611",
            alternateEmail: "abdul@gmail.com",
            paymentType: "Cheque - 34782898",
            iBANNumber: "985342618"
        }, {
            referenceNumber: "8809876789009888784",
            memberNumber: "9566340416",
            memberName: "Yasif",
            mobileNumber: "+ 89 0904532091",
            alternateEmail: "yasif@gmail.com",
            paymentType: "Cheque - 34749011",
            iBANNumber: "984267890"
        }];


        $scope.objectRest = $scope.claimTreatMent;

        $scope.searchBtn = function() {
            if (($scope.referenceNumber == "" || $scope.referenceNumber == null)&&($scope.memberCardNumber == "" || $scope.memberCardNumber == null)) {
                $scope.claimTreatMent = $scope.objectRest;
            } else {
                $scope.claimTreatMent = $filter('filter')($scope.claimTreatMent, {referenceNumber: $scope.referenceNumber,memberNumber:$scope.memberCardNumber });

                //$scope.data = $filter('filter')($scope.data ,{PaidToProviderName:$scope.Provider,batch:$scope.BatchId,batchFileName:$scope.BatchFileName});
            }
        }
    }
})();