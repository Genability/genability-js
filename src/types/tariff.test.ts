import { PropertyDataType } from './property-key';
import {
  TariffType,
  CustomerClass,
  ChargeType,
  ChargeClass,
  ChargePeriod,
  TransactionType,
  Tariff,
  TariffRate,
  isTariff,
  TariffRateBand,
  RateUnit,
  TariffProperty,
  TimeOfUseType,
  ProrationRule,
  hasTiers,
  uniquePropertyKeys,
  toTariffFromApi,
  hasVariableOrCalculationFactor,
  isTariffProperty,
  TariffPropertyType,
  TariffDocument,
  isTariffDocument,
  toChargeClassesFromString,
  toStringFromChargeClasses
} from './tariff';

describe("tariff types", () => {
  describe("test for TariffDocument", () => {
    it("should have tariffId", () => {
      const tariffDocument: TariffDocument = JSON.parse('{"tariffId": 3274100,"documentId": 42165,"documentSectionId": 84409,"document": { }}');
      expect(tariffDocument.tariffId).toEqual(3274100);
      expect(tariffDocument.documentId).toEqual(42165);
      expect(tariffDocument.documentSectionId).toEqual(84409);
    })
    it("should have document", () => {
      const tariffDocument: TariffDocument = {
        "tariffId": 3274100,
        "documentId": 42165,
        "documentSectionId": 84409,
        "document": { 
          "documentId": 1,
          "documentTitle": "E1 - Residential",
          "sectionTypes": "RIDER,TARIFF",
          "sourceUrl": "",
          "sourceContentType": "application/pdf",
          "lseId": 1,
          "lseName": "Pacific Gas & Electric Co",
          "sequenceNumber": 1
        }
      };
      const documentJson = '{\
        "documentId": 1,\
        "documentTitle": "E1 - Residential",\
        "sectionTypes": "RIDER,TARIFF",\
        "sourceUrl": "",\
        "sourceContentType": "application/pdf",\
        "lseId": 1,\
        "lseName": "Pacific Gas & Electric Co",\
        "sequenceNumber": 1\
        }';
      const document: Document = JSON.parse(documentJson);
      expect(tariffDocument.document).toEqual(document);
    })
    it("should have document", () => {
      const chargeClassString = "SUPPLY";
      const chargeClassesObj = toChargeClassesFromString(chargeClassString);
      expect(chargeClassesObj.length).toEqual(1);
      expect(chargeClassesObj[0]).toEqual(ChargeClass.SUPPLY);
      expect(chargeClassesObj.toString()).toEqual(chargeClassString);
      expect(chargeClassesObj).toEqual([ChargeClass.SUPPLY]);
    })
    it("should initialize multiple value string", () => {
      const chargeClassString = "TRANSMISSION,TAX";
      const chargeClassesObj = toChargeClassesFromString(chargeClassString);
      expect(chargeClassesObj.length).toEqual(2);
      expect(chargeClassesObj).toEqual(chargeClassString.split(','));
      expect(chargeClassesObj[0]).toEqual(ChargeClass.TRANSMISSION);
      expect(chargeClassesObj[1]).toEqual(ChargeClass.TAX);
      expect(toStringFromChargeClasses(chargeClassesObj)).toEqual(chargeClassString);
      expect(chargeClassesObj).toEqual([ChargeClass.TRANSMISSION,ChargeClass.TAX]);
    })
  })
  describe("test that JSON to enum", () => {
    it("works for TariffType", () => {
      const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "tariffType": "ALTERNATIVE"}');
      expect(tariff.tariffType).toEqual(TariffType.ALTERNATIVE);
      expect(tariff.tariffName).toEqual('StringName');
    })
    it("works for lseCode", () => {
      const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "lseCode": "lseCode"}');
      expect(tariff.lseCode).toEqual('lseCode');
    })
    it("works for CustomerClass", () => {
      const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL"}');
      expect(tariff.customerClass).toEqual(CustomerClass.GENERAL);
      expect(tariff.tariffName).toEqual('StringName');
    })
    it("works for ChargeType", () => {
      const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "chargeTypes": "CONSUMPTION_BASED"}');
      expect(tariff.chargeTypes).toEqual(ChargeType.CONSUMPTION_BASED);
      expect(tariff.tariffName).toEqual('StringName');
    })
    it("works for ChargePeriod", () => {
      const rate: TariffRate = JSON.parse('{"rateName": "StringName", "chargePeriod": "ANNUALLY"}');
      expect(rate.chargePeriod).toEqual(ChargePeriod.ANNUALLY);
      expect(rate.rateName).toEqual('StringName');
    })
    it("works for TransactionType", () => {
      const rate: TariffRate = JSON.parse('{"rateName": "StringName", "transactionType": "BUY"}');
      expect(rate.transactionType).toEqual(TransactionType.BUY);
      expect(rate.rateName).toEqual('StringName');
    })
    it("works for Period", () => {
      const tariffProperty: TariffProperty = JSON.parse('{"keyName": "stringKeyName", "period": "CRITICAL_PEAK"}');
      expect(tariffProperty.period).toEqual(TimeOfUseType.CRITICAL_PEAK);
      expect(tariffProperty.keyName).toEqual('stringKeyName');
    })
    it("works for RateUnit", () => {
      const tariffRateBand: TariffRateBand = JSON.parse('{"tariffRateId": "id", "rateUnit": "COST_PER_UNIT"}');
      expect(tariffRateBand.rateUnit).toEqual(RateUnit.COST_PER_UNIT);
      expect(tariffRateBand.tariffRateId).toEqual('id');
    })
    it("works for ProrationRule", () => {
      const tariffRate: TariffRate = JSON.parse('{"rateName": "StringName", "prorationRules": ' +
          '["SPLIT_DEMAND_VERSION_CHANGE", "SINGLE_DEMAND_SEASON_CHANGE"]}');
      expect(tariffRate.prorationRules).toContain(ProrationRule.SINGLE_DEMAND_SEASON_CHANGE);
      expect(tariffRate.prorationRules).toContain(ProrationRule.SPLIT_DEMAND_VERSION_CHANGE);
      expect(tariffRate.rateName).toEqual('StringName');
    })
  });
  describe("isTariff function", () => {
    it("should be false for invalid JSON", () => {
      const tariff: Tariff = JSON.parse(
        '{\
          "tariffId": "numberTariffId",\
          "masterTariffId": "numberMasterTariffId",\
          "tariffCode": "numberTariffCode"\
        }'
      );
      expect(isTariff(tariff)).toEqual(false);
    })
    it("should be true for valid JSON", () => {
      const tariff: Tariff = JSON.parse(
        '{\
          "tariffId": "numberTariffId",\
          "masterTariffId": "numberMasterTariffId",\
          "tariffCode": "numberTariffCode",\
          "tariffName": "numberTariffName",\
          "lseId": "numberLseId",\
          "lseName": "numberLseName"\
        }'
      );
      expect(isTariff(tariff)).toEqual(true);
    })
  });
  describe("works for TariffRate", () => {
    it("should be true with empty Rates", () => {
      const tariff: Tariff = JSON.parse(
        '{\
          "tariffId": "numberTariffId",\
          "masterTariffId": "numberMasterTariffId",\
          "tariffCode": "numberTariffCode",\
          "tariffName": "numberTariffName",\
          "lseId": "numberLseId",\
          "lseName": "numberLseName",\
          "rates": []\
        }'
      );
      expect(isTariff(tariff)).toEqual(true);
      expect(tariff.rates).toEqual([]);
    })
    it("should be true with rates with edgePredominance set", () => {
      const ratesJson = '[{\
        "tariffRateId": 1,\
        "tariffId": 1,\
        "edgePredominance": "PREDOMINANT",\
        "chargeClass": "TRANSMISSION,DISTRIBUTION"\
       }]';
      const json = JSON.parse(
        `{\
          "tariffId": "numberTariffId",\
          "masterTariffId": "numberMasterTariffId",\
          "tariffCode": "numberTariffCode",\
          "tariffName": "numberTariffName",\
          "lseId": "numberLseId",\
          "lseName": "numberLseName",\
          "rates": ${ratesJson}
        }`
      );
      const tariff: Tariff = toTariffFromApi(json);
      expect(isTariff(tariff)).toEqual(true);
      expect(tariff.rates).toBeTruthy();
      expect(tariff.rates?.length).toEqual(1);
      if(tariff.rates) {
        const tariffRate: TariffRate = tariff.rates[0];
        expect(tariffRate).toBeTruthy();
        expect(tariffRate.chargeClass).toEqual([ChargeClass.TRANSMISSION,ChargeClass.DISTRIBUTION]);
      }
    })

    it("should be true with rates with edgePredominance set to null", () => {
      const ratesJson = '[{\
        "tariffRateId": 1,\
        "tariffId": 1,\
        "edgePredominance": null,\
        "chargeClass": "TRANSMISSION,DISTRIBUTION"\
       }]';
      const json = JSON.parse(
        `{\
          "tariffId": "numberTariffId",\
          "masterTariffId": "numberMasterTariffId",\
          "tariffCode": "numberTariffCode",\
          "tariffName": "numberTariffName",\
          "lseId": "numberLseId",\
          "lseName": "numberLseName",\
          "rates": ${ratesJson}
        }`
      );
      const tariff: Tariff = toTariffFromApi(json);
      expect(isTariff(tariff)).toEqual(true);
      expect(tariff.rates).toBeTruthy();
      expect(tariff.rates?.length).toEqual(1);
      if(tariff.rates) {
        const tariffRate: TariffRate = tariff.rates[0];
        expect(tariffRate).toBeTruthy();
        expect(tariffRate.chargeClass).toEqual([ChargeClass.TRANSMISSION,ChargeClass.DISTRIBUTION]);
      }
    })

    it("should be true with rates with edgePredominance not set", () => {
      const ratesJson = '[{\
        "tariffRateId": 1,\
        "tariffId": 1,\
        "chargeClass": "TRANSMISSION,DISTRIBUTION"\
       }]';
      const json = JSON.parse(
        `{\
          "tariffId": "numberTariffId",\
          "masterTariffId": "numberMasterTariffId",\
          "tariffCode": "numberTariffCode",\
          "tariffName": "numberTariffName",\
          "lseId": "numberLseId",\
          "lseName": "numberLseName",\
          "rates": ${ratesJson}
        }`
      );
      const tariff: Tariff = toTariffFromApi(json);
      expect(isTariff(tariff)).toEqual(true);
      expect(tariff.rates).toBeTruthy();
      expect(tariff.rates?.length).toEqual(1);
      if(tariff.rates) {
        const tariffRate: TariffRate = tariff.rates[0];
        expect(tariffRate).toBeTruthy();
        expect(tariffRate.chargeClass).toEqual([ChargeClass.TRANSMISSION,ChargeClass.DISTRIBUTION]);
      }
    })
  });
  describe("works for TariffRateBand", () => {
    it("works with empty RateBands", () => {
      const ratesJson = '{\
        "tariffRateId": 1,\
        "tariffId": 1,\
        "rateBands": []\
       }';
      const rate: TariffRate = JSON.parse(ratesJson);
      expect(rate.tariffRateId).toEqual(1);
      expect(rate.tariffRateId).toEqual(1);
      expect(rate.rateBands).toEqual([]);
    })
    it("works with RateBands", () => {
      const rateBandJson = '{\
        "tariffRateBandId": 1,\
        "tariffRateId": 2\
       }';
      const rateJson = `{\
        "tariffRateId": 3,\
        "tariffId": 4,\
        "rateBands": [${rateBandJson}]
       }`;
      const rate: TariffRate = JSON.parse(rateJson);
      const rateBand: TariffRateBand = JSON.parse(rateBandJson);
      expect(rateBand.tariffRateId).toEqual(2);
      expect(rateBand.tariffRateBandId).toEqual(1);
      expect(rate.tariffRateId).toEqual(3);
      expect(rate.tariffId).toEqual(4);
      expect(rate.rateBands).toEqual([rateBand]);
    })
  });
  describe("hasTiers function", () => {
    it("should be true for 2 rateBands with unique applicabilityValue", () => {
      const tariffRate: TariffRate = JSON.parse(
        '{\
          "tariffRateId": 17838944,\
          "tariffId": 3284480,\
          "rateBands": [\
            {\
              "tariffRateBandId": 11575455,\
              "applicabilityValue": "Fixed"\
            },\
            {\
              "tariffRateBandId": 11575456,\
              "applicabilityValue": "Fixed"\
            }\
          ]\
        }'
      );
      expect(hasTiers(tariffRate)).toEqual(true);
    })

    it("should be true for 2 rateBands with no applicabilityValue", () => {
      const tariffRate: TariffRate = JSON.parse(
        '{\
          "tariffRateId": 17838944,\
          "tariffId": 3284480,\
          "rateBands": [\
            {\
              "tariffRateBandId": 11575455\
            },\
            {\
              "tariffRateBandId": 11575456\
            }\
          ]\
        }'
      );
      expect(hasTiers(tariffRate)).toEqual(true);
    })

    it("should be false for undefined rateBands ", () => {
      const tariffRate: TariffRate = JSON.parse(
        '{\
          "tariffRateId": 17838944,\
          "tariffId": 3284480\
        }'
      );
      expect(hasTiers(tariffRate)).toEqual(false);
    })

    it("should be false for 1 rateBands", () => {
      const tariffRate: TariffRate = JSON.parse(
        '{\
          "tariffRateId": 17838944,\
          "tariffId": 3284480,\
          "rateBands": [\
            {\
              "tariffRateBandId": 11575456,\
              "applicabilityValue": "Fixed"\
            }\
          ]\
        }'
      );
      expect(hasTiers(tariffRate)).toEqual(false);
    })

    it("should be false for 2 rateBands with different applicabilityValue", () => {
      const tariffRate: TariffRate = JSON.parse(
        '{\
          "tariffRateId": 17838944,\
          "tariffId": 3284480,\
          "rateBands": [\
            {\
              "tariffRateBandId": 11575455,\
              "applicabilityValue": "Fixed"\
            },\
            {\
              "tariffRateBandId": 11575456,\
              "applicabilityValue": "Variable"\
            }\
          ]\
        }'
      );
      expect(hasTiers(tariffRate)).toEqual(false);
    })

    it("should be true for 4 rateBands, 2 with applicabilityValue=true and 2 with applicabilityValue=false", () => {
      const tariffRate: TariffRate = JSON.parse(
        '{\
          "tariffRateId": 17838944,\
          "tariffId": 3284480,\
          "rateBands": [\
            {\
              "tariffRateBandId": 11575455,\
              "applicabilityValue": "true"\
            },\
            {\
              "tariffRateBandId": 11575456,\
              "applicabilityValue": "true"\
            },\
            {\
              "tariffRateBandId": 11575457,\
              "applicabilityValue": "false"\
            },\
            {\
              "tariffRateBandId": 11575458,\
              "applicabilityValue": "false"\
            }\
          ]\
        }'
      );
      expect(hasTiers(tariffRate)).toEqual(true);
    })

    it("should be true for 3 rateBands, 2 with applicabilityValue=true and 1 with applicabilityValue=false", () => {
      const tariffRate: TariffRate = JSON.parse(
        '{\
          "tariffRateId": 17838944,\
          "tariffId": 3284480,\
          "rateBands": [\
            {\
              "tariffRateBandId": 11575455,\
              "applicabilityValue": "true"\
            },\
            {\
              "tariffRateBandId": 11575456,\
              "applicabilityValue": "true"\
            },\
            {\
              "tariffRateBandId": 11575458,\
              "applicabilityValue": "false"\
            }\
          ]\
        }'
      );
      expect(hasTiers(tariffRate)).toEqual(true);
    })

    it("should be true for 4 rateBands, 2 with same applicabilityValue and other two with different applicabilityValue", () => {
      const tariffRate: TariffRate = JSON.parse(
        '{\
          "tariffRateId": 17838944,\
          "tariffId": 3284480,\
          "rateBands": [\
            {\
              "tariffRateBandId": 11575455,\
              "applicabilityValue": "true"\
            },\
            {\
              "tariffRateBandId": 11575456,\
              "applicabilityValue": "true"\
            },\
            {\
              "tariffRateBandId": 11575457,\
              "applicabilityValue": "Fixed"\
            },\
            {\
              "tariffRateBandId": 11575458,\
              "applicabilityValue": "Variable"\
            }\
          ]\
        }'
      );
      expect(hasTiers(tariffRate)).toEqual(true);
    })
  });
  describe("uniquePropertyKeys function", () => {
    it("works without any keys", () => {
      const tariff: Tariff = JSON.parse(
        '{\
          "tariffId": "numberTariffId",\
          "masterTariffId": "numberMasterTariffId",\
          "tariffCode": "numberTariffCode",\
          "tariffName": "numberTariffName",\
          "lseId": "numberLseId",\
          "lseName": "numberLseName",\
          "rates": []\
        }'
      );
      const tariffSet = uniquePropertyKeys(tariff);
      expect(tariffSet.size).toEqual(0);
    });
    it("works with rates", () => {
      const rateJson = `{\
        "tariffRateId": 3,\
        "tariffId": 4,\
        "quantityKey": "quantityKey",\
        "applicabilityKey": "applicabilityKey",\
        "variableFactorKey": "variableFactorKey"
       }`;
      const tariff: Tariff = JSON.parse(`{\
        "tariffName": "StringName", \
        "tariffType": "ALTERNATIVE",\ 
        "rates": [${rateJson}]
      }`
      );
      const tariffSet = uniquePropertyKeys(tariff);
      expect(tariffSet).toContain("quantityKey");
      expect(tariffSet).toContain("applicabilityKey");
      expect(tariffSet).toContain("variableFactorKey");
    })

    it("works with properties", () => {
      const tariffPropertyJson = '{"keyName": "stringKeyName", "period": "CRITICAL_PEAK"}';
      const tariff: Tariff = JSON.parse(`{\
        "tariffName": "StringName", \
        "tariffType": "ALTERNATIVE",\ 
        "rates": [],\
        "properties": [${tariffPropertyJson}, ${tariffPropertyJson}]
      }`
      );
      const tariffSet = uniquePropertyKeys(tariff);
      expect(tariffSet).toContain("stringKeyName");
      expect(tariffSet.size).toEqual(1);
    })
  });

  describe("hasTiers function", () => {
    it("no variableFactorKey populated and no calculationFactor on any rate band", () => {
      const tariffRate: TariffRate = JSON.parse(
        '{\
          "tariffRateId": 17838944,\
          "tariffId": 3284480,\
          "rateBands": [\
            {\
              "tariffRateBandId": 11575455,\
              "applicabilityValue": "true"\
            },\
            {\
              "tariffRateBandId": 11575458,\
              "applicabilityValue": "Variable"\
            }\
          ]\
        }'
      );
      expect(hasVariableOrCalculationFactor(tariffRate)).toEqual(false);
    })

    it("variableFactorKey populated but no calculationFactor on any rate band", () => {
      const tariffRate: TariffRate = JSON.parse(
        '{\
          "tariffRateId": 17838944,\
          "tariffId": 3284480,\
          "variableFactorKey": "test",\
          "rateBands": [\
            {\
              "tariffRateBandId": 11575455,\
              "applicabilityValue": "true"\
            },\
            {\
              "tariffRateBandId": 11575458,\
              "applicabilityValue": "Variable"\
            }\
          ]\
        }'
      );
      expect(hasVariableOrCalculationFactor(tariffRate)).toEqual(true);
    })

    it("no variableFactorKey populated but one of its tariff rate bands with a calculationFactor", () => {
      const tariffRate: TariffRate = JSON.parse(
        '{\
          "tariffRateId": 17838944,\
          "tariffId": 3284480,\
          "rateBands": [\
            {\
              "tariffRateBandId": 11575455,\
              "applicabilityValue": "true"\
            },\
            {\
              "tariffRateBandId": 11575458,\
              "calculationFactor": 2,\
              "applicabilityValue": "Variable"\
            }\
          ]\
        }'
      );
      expect(hasVariableOrCalculationFactor(tariffRate)).toEqual(true);
    })
  })
});

describe("isTariffProperty function", () => {
  it("should return false with no dataType value", () => {
    const tariffProperty: TariffProperty = JSON.parse('{"keyName": "stringKeyName", "propertyTypes": "APPLICABILITY"}');

    expect(tariffProperty.dataType).toEqual(undefined);
    expect(tariffProperty.propertyTypes).toEqual(TariffPropertyType.APPLICABILITY);
    expect(isTariffProperty(tariffProperty)).toEqual(false);
  })
  
  it("should return false with no propertyTypes value", () => {
    const tariffProperty: TariffProperty = JSON.parse('{"keyName": "stringKeyName", "dataType": "STRING"}');

    expect(tariffProperty.propertyTypes).toEqual(undefined);
    expect(tariffProperty.dataType).toEqual(PropertyDataType.STRING);
    expect(isTariffProperty(tariffProperty)).toEqual(false);
  })

  it("should return false with no keyName value", () => {
    const tariffProperty: TariffProperty = JSON.parse('{"propertyTypes": "APPLICABILITY", "dataType": "STRING"}');

    expect(tariffProperty.keyName).toEqual(undefined);
    expect(tariffProperty.propertyTypes).toEqual(TariffPropertyType.APPLICABILITY);
    expect(tariffProperty.dataType).toEqual(PropertyDataType.STRING);
    expect(isTariffProperty(tariffProperty)).toEqual(false);
  })

  it("should return true with all possible values", () => {
    const tariffProperty: TariffProperty = JSON.parse('{"keyName": "stringKeyName", "propertyTypes": "APPLICABILITY", "dataType": "STRING"}');

    expect(tariffProperty.keyName).toEqual("stringKeyName");
    expect(tariffProperty.propertyTypes).toEqual(TariffPropertyType.APPLICABILITY);
    expect(tariffProperty.dataType).toEqual(PropertyDataType.STRING);
    expect(isTariffProperty(tariffProperty)).toEqual(true);
  })
})

describe("isTariffDocument function", () => {
  it("should return false with no tariffId", () => {
    const tariffDocument: TariffDocument = JSON.parse('{"documentId": 42165,"documentSectionId": 84409,"document": { }}');
    expect(isTariffDocument(tariffDocument)).toEqual(false);
  })
  
  it("should return false with no document", () => {
    const tariffDocument: TariffDocument = JSON.parse('{"tariffId": 1, "documentId": 42165,"documentSectionId": 84409}');
    expect(isTariffDocument(tariffDocument)).toEqual(false);
  })

  it("should return false with empty document", () => {
    const tariffDocument: TariffDocument = JSON.parse('{"tariffId": 1, "documentId": 42165,"documentSectionId": 84409,"document": { }}');
    expect(isTariffDocument(tariffDocument)).toEqual(false);
  })

  it("should return true with all possible values", () => {
    const tariffDocument: TariffDocument = {
      "tariffId": 3274100,
      "documentId": 42165,
      "documentSectionId": 84409,
      "document": { 
        "documentId": 1,
        "documentTitle": "E1 - Residential",
        "sectionTypes": "RIDER,TARIFF",
        "sourceUrl": "",
        "sourceContentType": "application/pdf",
        "lseId": 1,
        "lseName": "Pacific Gas & Electric Co",
        "sequenceNumber": 1
      }
    };
    expect(isTariffDocument(tariffDocument)).toEqual(true);
  })
})
