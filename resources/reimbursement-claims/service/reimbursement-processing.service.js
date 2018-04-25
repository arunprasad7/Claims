(function() {
    'use strict';

    angular
        .module('claims')
        .service('ReimbursementProcessingService', ReimbursementProcessingService)
    
    ReimbursementProcessingService.$inject = [];
    function ReimbursementProcessingService() {
        this.createNewReimbursmentObject = function() {
            return {
                "treatmentCodeOrSubBenefit" : "",
                "serviceFrom" : "",
                "serviceTo" : "",
                "days" : "",
                "requestAmount" : "",
                "manualDeduction" : "",
                "rejectionCode" : "",
                "policyDedAmount" : "",
                "penaltyAmount" : "",
                "suggesstedAmount" : 1000,
                "approvedAmount" : 2000,
                "rejectedAmount" : 3000,
                "status" : "Pending",
                "internalRemarks" : "",
                "externalRemarks" : "",
                "isChecked" : false,
                "id" : new Date().getTime(),
                "dml": "N"
            };
        }

        this.getClaimsRequest = function() {
            return [
                {'reqNum': 987896, 'claimStatus':'rejected', 'statusReason':'Waiting for Finalization', 'rejectedReason':'Waiting for Finalization', 'status' : 'Approved'},
                {'reqNum': 187896, 'claimStatus':'rejected', 'statusReason':'Waiting for Approval', 'rejectedReason':'Waiting for Finalization', 'status' : 'Rejected'},
                {'reqNum': 287896, 'claimStatus':'rejected', 'statusReason':'Waiting for Finalization', 'rejectedReason':'Waiting for Finalization', 'status' : 'Approved'},
                {'reqNum': 387896, 'claimStatus':'rejected', 'statusReason':'Waiting for Approval', 'rejectedReason':'Waiting for Finalization', 'status' : 'Rejected'},
                {'reqNum': 487896, 'claimStatus':'rejected', 'statusReason':'Waiting for Approval', 'rejectedReason':'Waiting for Finalization', 'status' : 'Approved'},
                {'reqNum': 587896, 'claimStatus':'rejected', 'statusReason':'Waiting for Approval', 'rejectedReason':'Waiting for Finalization', 'status' : 'Approved'},
                {'reqNum': 687896, 'claimStatus':'rejected', 'statusReason':'Waiting for Approval', 'rejectedReason':'Waiting for Finalization', 'status' : 'Rejected'}
            ];
        }

        this.getClaimHeaderDetails = function(requestNo) {
            var resultSet = {
                987896 : {'claimNo' : 80010201, 'requestNo' : 987896, 'status' : 'Approved', 'policyNo' : 80010201, 'memberNo' : 10010201-1},
                187896 : {'claimNo' : 23330201, 'requestNo' : 187896, 'status' : 'Rejected', 'policyNo' : 80010201, 'memberNo' : 23330201-1},
                287896 : {'claimNo' : 85670201, 'requestNo' : 287896, 'status' : 'Approved', 'policyNo' : 80010201, 'memberNo' : 287896-1},
                387896 : {'claimNo' : 78900201, 'requestNo' : 387896, 'status' : 'Rejected', 'policyNo' : 80010201, 'memberNo' : 78900201-1},
                487896 : {'claimNo' : 43550201, 'requestNo' : 487896, 'status' : 'Approved', 'policyNo' : 80010201, 'memberNo' : 487896-1},
                587896 : {'claimNo' : 56770201, 'requestNo' : 587896, 'status' : 'Approved', 'policyNo' : 80010201, 'memberNo' : 10010201-1},
                687896 : {'claimNo' : 80010201, 'requestNo' : 687896, 'status' : 'Rejected', 'policyNo' : 80010201, 'memberNo' : 687896-1}
            }
            return resultSet[requestNo];
        }

        this.getRequestDataForCalim = function(requestNo) {
            var resultSet = {
                987896 : [
                            {"treatmentCodeOrSubBenefit":{"code":1111,"name":"T 1859231-1"},"serviceFrom":"2018-04-12T18:30:00.000Z","serviceTo":"2018-08-25T18:30:00.000Z","days":34,"requestAmount":456,"manualDeduction":456,"rejectionCode":{"code":1111,"name":"R 1859231-1"},"policyDedAmount":56,"penaltyAmount":890,"suggesstedAmount":234,"approvedAmount":456,"rejectedAmount":768,"status":"Hold","internalRemarks":"test 1","externalRemarks":"test 1","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":2222,"name":"T 2054571-1"},"serviceFrom":"2018-05-12T18:30:00.000Z","serviceTo":"2018-08-15T18:30:00.000Z","days":44,"requestAmount":456,"manualDeduction":234,"rejectionCode":{"code":2222,"name":"R 2054571-1"},"policyDedAmount":678,"penaltyAmount":34,"suggesstedAmount":66,"approvedAmount":333,"rejectedAmount":666,"status":"Started","internalRemarks":"test 2","externalRemarks":"test 2","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":3333,"name":"T 3451201-1"},"serviceFrom":"2019-08-22T18:30:00.000Z","serviceTo":"2020-04-25T18:30:00.000Z","days":74,"requestAmount":456,"manualDeduction":354,"rejectionCode":{"code":3333,"name":"R 3451201-1"},"policyDedAmount":678,"penaltyAmount":345,"suggesstedAmount":77,"approvedAmount":556,"rejectedAmount":555,"status":"In Progress","internalRemarks":"test 3","externalRemarks":"test 3","isChecked":false,"id":1524291979764,"dml":"N"},
                        ],
                187896 : [
                            {"treatmentCodeOrSubBenefit":{"code":4444,"name":"T 4579201-1"},"serviceFrom":"2016-02-12T18:30:00.000Z","serviceTo":"2018-04-15T18:30:00.000Z","days":84,"requestAmount":456,"manualDeduction":67,"rejectionCode":{"code":4444,"name":"R 3451201-1"},"policyDedAmount":645,"penaltyAmount":897,"suggesstedAmount":888,"approvedAmount":767,"rejectedAmount":444,"status":"Stoped","internalRemarks":"test 4","externalRemarks":"test 4","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":5555,"name":"T 5463201-1"},"serviceFrom":"2015-04-12T18:30:00.000Z","serviceTo":"2018-06-25T18:30:00.000Z","days":14,"requestAmount":456,"manualDeduction":978,"rejectionCode":{"code":5555,"name":"R 4579201-1"},"policyDedAmount":980,"penaltyAmount":789,"suggesstedAmount":999,"approvedAmount":787,"rejectedAmount":655,"status":"Hold","internalRemarks":"test 5","externalRemarks":"test 5","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":1111,"name":"T 1859231-1"},"serviceFrom":"2018-04-12T18:30:00.000Z","serviceTo":"2018-08-25T18:30:00.000Z","days":34,"requestAmount":456,"manualDeduction":456,"rejectionCode":{"code":1111,"name":"R 1859231-1"},"policyDedAmount":56,"penaltyAmount":890,"suggesstedAmount":234,"approvedAmount":456,"rejectedAmount":768,"status":"Hold","internalRemarks":"test 1","externalRemarks":"test 1","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":2222,"name":"T 2054571-1"},"serviceFrom":"2018-05-12T18:30:00.000Z","serviceTo":"2018-08-15T18:30:00.000Z","days":44,"requestAmount":456,"manualDeduction":234,"rejectionCode":{"code":2222,"name":"R 2054571-1"},"policyDedAmount":678,"penaltyAmount":34,"suggesstedAmount":66,"approvedAmount":333,"rejectedAmount":666,"status":"Started","internalRemarks":"test 2","externalRemarks":"test 2","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":3333,"name":"T 3451201-1"},"serviceFrom":"2019-08-22T18:30:00.000Z","serviceTo":"2020-04-25T18:30:00.000Z","days":74,"requestAmount":456,"manualDeduction":354,"rejectionCode":{"code":3333,"name":"R 3451201-1"},"policyDedAmount":678,"penaltyAmount":345,"suggesstedAmount":77,"approvedAmount":556,"rejectedAmount":555,"status":"In Progress","internalRemarks":"test 3","externalRemarks":"test 3","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":4444,"name":"T 4579201-1"},"serviceFrom":"2016-02-12T18:30:00.000Z","serviceTo":"2018-04-15T18:30:00.000Z","days":84,"requestAmount":456,"manualDeduction":67,"rejectionCode":{"code":4444,"name":"R 3451201-1"},"policyDedAmount":645,"penaltyAmount":897,"suggesstedAmount":888,"approvedAmount":767,"rejectedAmount":444,"status":"Stoped","internalRemarks":"test 4","externalRemarks":"test 4","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":5555,"name":"T 5463201-1"},"serviceFrom":"2015-04-12T18:30:00.000Z","serviceTo":"2018-06-25T18:30:00.000Z","days":14,"requestAmount":456,"manualDeduction":978,"rejectionCode":{"code":5555,"name":"R 4579201-1"},"policyDedAmount":980,"penaltyAmount":789,"suggesstedAmount":999,"approvedAmount":787,"rejectedAmount":655,"status":"Hold","internalRemarks":"test 5","externalRemarks":"test 5","isChecked":false,"id":1524291979764,"dml":"N"}
                        ],
                287896 : [
                            {"treatmentCodeOrSubBenefit":{"code":1111,"name":"T 1859231-1"},"serviceFrom":"2018-04-12T18:30:00.000Z","serviceTo":"2018-08-25T18:30:00.000Z","days":34,"requestAmount":456,"manualDeduction":456,"rejectionCode":{"code":1111,"name":"R 1859231-1"},"policyDedAmount":56,"penaltyAmount":890,"suggesstedAmount":234,"approvedAmount":456,"rejectedAmount":768,"status":"Hold","internalRemarks":"test 1","externalRemarks":"test 1","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":2222,"name":"T 2054571-1"},"serviceFrom":"2018-05-12T18:30:00.000Z","serviceTo":"2018-08-15T18:30:00.000Z","days":44,"requestAmount":456,"manualDeduction":234,"rejectionCode":{"code":2222,"name":"R 2054571-1"},"policyDedAmount":678,"penaltyAmount":34,"suggesstedAmount":66,"approvedAmount":333,"rejectedAmount":666,"status":"Started","internalRemarks":"test 2","externalRemarks":"test 2","isChecked":false,"id":1524291979764,"dml":"N"},
                        ],
                387896 : [
                            {"treatmentCodeOrSubBenefit":{"code":1111,"name":"T 1859231-1"},"serviceFrom":"2018-04-12T18:30:00.000Z","serviceTo":"2018-08-25T18:30:00.000Z","days":34,"requestAmount":456,"manualDeduction":456,"rejectionCode":{"code":1111,"name":"R 1859231-1"},"policyDedAmount":56,"penaltyAmount":890,"suggesstedAmount":234,"approvedAmount":456,"rejectedAmount":768,"status":"Hold","internalRemarks":"test 1","externalRemarks":"test 1","isChecked":false,"id":1524291979764,"dml":"N"},
                        ],
                487896 : [
                            {"treatmentCodeOrSubBenefit":{"code":1111,"name":"T 1859231-1"},"serviceFrom":"2018-04-12T18:30:00.000Z","serviceTo":"2018-08-25T18:30:00.000Z","days":34,"requestAmount":456,"manualDeduction":456,"rejectionCode":{"code":1111,"name":"R 1859231-1"},"policyDedAmount":56,"penaltyAmount":890,"suggesstedAmount":234,"approvedAmount":456,"rejectedAmount":768,"status":"Hold","internalRemarks":"test 1","externalRemarks":"test 1","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":2222,"name":"T 2054571-1"},"serviceFrom":"2018-05-12T18:30:00.000Z","serviceTo":"2018-08-15T18:30:00.000Z","days":44,"requestAmount":456,"manualDeduction":234,"rejectionCode":{"code":2222,"name":"R 2054571-1"},"policyDedAmount":678,"penaltyAmount":34,"suggesstedAmount":66,"approvedAmount":333,"rejectedAmount":666,"status":"Started","internalRemarks":"test 2","externalRemarks":"test 2","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":3333,"name":"T 3451201-1"},"serviceFrom":"2019-08-22T18:30:00.000Z","serviceTo":"2020-04-25T18:30:00.000Z","days":74,"requestAmount":456,"manualDeduction":354,"rejectionCode":{"code":3333,"name":"R 3451201-1"},"policyDedAmount":678,"penaltyAmount":345,"suggesstedAmount":77,"approvedAmount":556,"rejectedAmount":555,"status":"In Progress","internalRemarks":"test 3","externalRemarks":"test 3","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":4444,"name":"T 4579201-1"},"serviceFrom":"2016-02-12T18:30:00.000Z","serviceTo":"2018-04-15T18:30:00.000Z","days":84,"requestAmount":456,"manualDeduction":67,"rejectionCode":{"code":4444,"name":"R 3451201-1"},"policyDedAmount":645,"penaltyAmount":897,"suggesstedAmount":888,"approvedAmount":767,"rejectedAmount":444,"status":"Stoped","internalRemarks":"test 4","externalRemarks":"test 4","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":5555,"name":"T 5463201-1"},"serviceFrom":"2015-04-12T18:30:00.000Z","serviceTo":"2018-06-25T18:30:00.000Z","days":14,"requestAmount":456,"manualDeduction":978,"rejectionCode":{"code":5555,"name":"R 4579201-1"},"policyDedAmount":980,"penaltyAmount":789,"suggesstedAmount":999,"approvedAmount":787,"rejectedAmount":655,"status":"Hold","internalRemarks":"test 5","externalRemarks":"test 5","isChecked":false,"id":1524291979764,"dml":"N"}
                        ],
                587896 : [
                            {"treatmentCodeOrSubBenefit":{"code":1111,"name":"T 1859231-1"},"serviceFrom":"2018-04-12T18:30:00.000Z","serviceTo":"2018-08-25T18:30:00.000Z","days":34,"requestAmount":456,"manualDeduction":456,"rejectionCode":{"code":1111,"name":"R 1859231-1"},"policyDedAmount":56,"penaltyAmount":890,"suggesstedAmount":234,"approvedAmount":456,"rejectedAmount":768,"status":"Hold","internalRemarks":"test 1","externalRemarks":"test 1","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":2222,"name":"T 2054571-1"},"serviceFrom":"2018-05-12T18:30:00.000Z","serviceTo":"2018-08-15T18:30:00.000Z","days":44,"requestAmount":456,"manualDeduction":234,"rejectionCode":{"code":2222,"name":"R 2054571-1"},"policyDedAmount":678,"penaltyAmount":34,"suggesstedAmount":66,"approvedAmount":333,"rejectedAmount":666,"status":"Started","internalRemarks":"test 2","externalRemarks":"test 2","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":3333,"name":"T 3451201-1"},"serviceFrom":"2019-08-22T18:30:00.000Z","serviceTo":"2020-04-25T18:30:00.000Z","days":74,"requestAmount":456,"manualDeduction":354,"rejectionCode":{"code":3333,"name":"R 3451201-1"},"policyDedAmount":678,"penaltyAmount":345,"suggesstedAmount":77,"approvedAmount":556,"rejectedAmount":555,"status":"In Progress","internalRemarks":"test 3","externalRemarks":"test 3","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":4444,"name":"T 4579201-1"},"serviceFrom":"2016-02-12T18:30:00.000Z","serviceTo":"2018-04-15T18:30:00.000Z","days":84,"requestAmount":456,"manualDeduction":67,"rejectionCode":{"code":4444,"name":"R 3451201-1"},"policyDedAmount":645,"penaltyAmount":897,"suggesstedAmount":888,"approvedAmount":767,"rejectedAmount":444,"status":"Stoped","internalRemarks":"test 4","externalRemarks":"test 4","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":5555,"name":"T 5463201-1"},"serviceFrom":"2015-04-12T18:30:00.000Z","serviceTo":"2018-06-25T18:30:00.000Z","days":14,"requestAmount":456,"manualDeduction":978,"rejectionCode":{"code":5555,"name":"R 4579201-1"},"policyDedAmount":980,"penaltyAmount":789,"suggesstedAmount":999,"approvedAmount":787,"rejectedAmount":655,"status":"Hold","internalRemarks":"test 5","externalRemarks":"test 5","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":1111,"name":"T 1859231-1"},"serviceFrom":"2018-04-12T18:30:00.000Z","serviceTo":"2018-08-25T18:30:00.000Z","days":34,"requestAmount":456,"manualDeduction":456,"rejectionCode":{"code":1111,"name":"R 1859231-1"},"policyDedAmount":56,"penaltyAmount":890,"suggesstedAmount":234,"approvedAmount":456,"rejectedAmount":768,"status":"Hold","internalRemarks":"test 1","externalRemarks":"test 1","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":2222,"name":"T 2054571-1"},"serviceFrom":"2018-05-12T18:30:00.000Z","serviceTo":"2018-08-15T18:30:00.000Z","days":44,"requestAmount":456,"manualDeduction":234,"rejectionCode":{"code":2222,"name":"R 2054571-1"},"policyDedAmount":678,"penaltyAmount":34,"suggesstedAmount":66,"approvedAmount":333,"rejectedAmount":666,"status":"Started","internalRemarks":"test 2","externalRemarks":"test 2","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":3333,"name":"T 3451201-1"},"serviceFrom":"2019-08-22T18:30:00.000Z","serviceTo":"2020-04-25T18:30:00.000Z","days":74,"requestAmount":456,"manualDeduction":354,"rejectionCode":{"code":3333,"name":"R 3451201-1"},"policyDedAmount":678,"penaltyAmount":345,"suggesstedAmount":77,"approvedAmount":556,"rejectedAmount":555,"status":"In Progress","internalRemarks":"test 3","externalRemarks":"test 3","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":4444,"name":"T 4579201-1"},"serviceFrom":"2016-02-12T18:30:00.000Z","serviceTo":"2018-04-15T18:30:00.000Z","days":84,"requestAmount":456,"manualDeduction":67,"rejectionCode":{"code":4444,"name":"R 3451201-1"},"policyDedAmount":645,"penaltyAmount":897,"suggesstedAmount":888,"approvedAmount":767,"rejectedAmount":444,"status":"Stoped","internalRemarks":"test 4","externalRemarks":"test 4","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":5555,"name":"T 5463201-1"},"serviceFrom":"2015-04-12T18:30:00.000Z","serviceTo":"2018-06-25T18:30:00.000Z","days":14,"requestAmount":456,"manualDeduction":978,"rejectionCode":{"code":5555,"name":"R 4579201-1"},"policyDedAmount":980,"penaltyAmount":789,"suggesstedAmount":999,"approvedAmount":787,"rejectedAmount":655,"status":"Hold","internalRemarks":"test 5","externalRemarks":"test 5","isChecked":false,"id":1524291979764,"dml":"N"}
                        ],
                687896 : [
                            {"treatmentCodeOrSubBenefit":{"code":1111,"name":"T 1859231-1"},"serviceFrom":"2018-04-12T18:30:00.000Z","serviceTo":"2018-08-25T18:30:00.000Z","days":34,"requestAmount":456,"manualDeduction":456,"rejectionCode":{"code":1111,"name":"R 1859231-1"},"policyDedAmount":56,"penaltyAmount":890,"suggesstedAmount":234,"approvedAmount":456,"rejectedAmount":768,"status":"Hold","internalRemarks":"test 1","externalRemarks":"test 1","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":2222,"name":"T 2054571-1"},"serviceFrom":"2018-05-12T18:30:00.000Z","serviceTo":"2018-08-15T18:30:00.000Z","days":44,"requestAmount":456,"manualDeduction":234,"rejectionCode":{"code":2222,"name":"R 2054571-1"},"policyDedAmount":678,"penaltyAmount":34,"suggesstedAmount":66,"approvedAmount":333,"rejectedAmount":666,"status":"Started","internalRemarks":"test 2","externalRemarks":"test 2","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":3333,"name":"T 3451201-1"},"serviceFrom":"2019-08-22T18:30:00.000Z","serviceTo":"2020-04-25T18:30:00.000Z","days":74,"requestAmount":456,"manualDeduction":354,"rejectionCode":{"code":3333,"name":"R 3451201-1"},"policyDedAmount":678,"penaltyAmount":345,"suggesstedAmount":77,"approvedAmount":556,"rejectedAmount":555,"status":"In Progress","internalRemarks":"test 3","externalRemarks":"test 3","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":4444,"name":"T 4579201-1"},"serviceFrom":"2016-02-12T18:30:00.000Z","serviceTo":"2018-04-15T18:30:00.000Z","days":84,"requestAmount":456,"manualDeduction":67,"rejectionCode":{"code":4444,"name":"R 3451201-1"},"policyDedAmount":645,"penaltyAmount":897,"suggesstedAmount":888,"approvedAmount":767,"rejectedAmount":444,"status":"Stoped","internalRemarks":"test 4","externalRemarks":"test 4","isChecked":false,"id":1524291979764,"dml":"N"},
                            {"treatmentCodeOrSubBenefit":{"code":5555,"name":"T 5463201-1"},"serviceFrom":"2015-04-12T18:30:00.000Z","serviceTo":"2018-06-25T18:30:00.000Z","days":14,"requestAmount":456,"manualDeduction":978,"rejectionCode":{"code":5555,"name":"R 4579201-1"},"policyDedAmount":980,"penaltyAmount":789,"suggesstedAmount":999,"approvedAmount":787,"rejectedAmount":655,"status":"Hold","internalRemarks":"test 5","externalRemarks":"test 5","isChecked":false,"id":1524291979764,"dml":"N"}
                        ]
            }

            return resultSet[requestNo];
        }

        this.getCodes = function(codeType) {
            return [
                {
                    'code' : 1111,
                    'name' : codeType + ' 1859231 - Surgery' 
                },
                {
                    'code' : 2222,
                    'name' : codeType + ' 2054571 - Radiation Therapy' 
                },
                {
                    'code' : 3333,
                    'name' : codeType + ' 3451201 - Chemotherapy' 
                },
                {
                    'code' : 4444,
                    'name' : codeType + ' 4579201 - Immunotherapy' 
                },
                {
                    'code' : 5555,
                    'name' : codeType + ' 5463201 - Stem Cell Transplant' 
                }
            ];
        }
    }
})();