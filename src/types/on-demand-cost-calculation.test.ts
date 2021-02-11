import {
  CalculatedCost,
  CalculatedCostItem,
  PropertyData,
  isCalculatedCost,
  ExpectedMap,
  ScenariosMap,
  CalculationScenario,
  isMassCalculation,
} from "./on-demand-cost-calculation";
import {
  CommonPropertyKeyNames,
} from "./property-key";
import {GetCalculatedCostRequest} from "../api";

describe("on-demand-cost-calculation types", () => {
  describe("test that JSON to enum", () => {
    it("works for summary", () => {
      const calculatedCost: CalculatedCost = JSON.parse('{"masterTariffId": 1, "summary": {"subTotalCost": 709.74,"preTaxMinimumCost": 15.00}}');
      expect(calculatedCost.summary instanceof Object).toBe(true);
      expect(calculatedCost.masterTariffId).toEqual(1);
    })
    it("works for QuantityKey", () => {
      const calculatedCostItem: CalculatedCostItem = JSON.parse('{"tariffId": 1, "quantityKey": "consumption"}');
      expect(calculatedCostItem.quantityKey).toEqual(CommonPropertyKeyNames.CONSUMPTION);
      expect(calculatedCostItem.tariffId).toEqual(1);
    })
    it("works for PropertyKeyName", () => {
      const propertyData: PropertyData = JSON.parse('{"keyName": "cityLimits", "displayName": "DisplayName"}');
      expect(propertyData.keyName).toEqual(CommonPropertyKeyNames.CITY_LIMITS);
      expect(propertyData.displayName).toEqual('DisplayName');
    })
    it("work for assumptions", () => {
      const json = '{\
        "masterTariffId": 522,\
        "fromDateTime": "fromDateTime",\
        "toDateTime": "toDateTime",\
        "assumptions": [\
          {\
            "keyName": "buildingId",\
            "dataValue": "RESIDENTIAL",\
            "operator": "+",\
            "dataFactor": 1\
          },\
          {\
            "keyName": "baselineType",\
            "dataValue": "30"\
          }\
        ]\
      }';
      const calculatedCost: CalculatedCost = JSON.parse(json);
      expect(calculatedCost.assumptions).toHaveLength(2);
    })
    it("work for ExpectedMap", () => {
      const json = '{\
        "totalCost": 522,\
        "adjustedTotalCost": 123,\
        "kWh": 123\
      }';
      const expectedMap: ExpectedMap = JSON.parse(json);
      expect(expectedMap.totalCost).toEqual(522);
      expect(expectedMap.adjustedTotalCost).toEqual(123);
      expect(expectedMap.kWh).toEqual(123);
    })
    it("work for ScenariosMap", () => {
      const json = '{\
        "key":{\
          "requestId": "36f86e22-4575-4ee1-9614-1133d9faf071",\
          "masterTariffId": 522,\
          "tariffName": "tariffName",\
          "totalCost": "totalCost",\
          "fromDateTime": "fromDateTime",\
          "toDateTime": "toDateTime",\
          "accuracy": "accuracy",\
          "calculatedCostId": "calculatedCostId"\
        }\
      }';
      const scenariosMap: ScenariosMap = JSON.parse(json);
      expect(isCalculatedCost(scenariosMap.key)).toEqual(true);
    })
    it("work for CalculationScenario", () => {
      const json = '{\
        "masterTariffId": 522,\
        "scenarioName": "xyz"\
      }';
      const calculationScenario: CalculationScenario = JSON.parse(json);
      expect(calculationScenario.masterTariffId).toEqual(522);
      expect(calculationScenario.scenarioName).toEqual("xyz");
    })
  });
  describe("isCalculatedCost function", () => {
    it("should be false for invalid JSON", () => {
      const calculatedCost: CalculatedCost = JSON.parse('{"notAKeyName": "BooleanKeyName","dataType": "BOOLEAN"}');
      expect(isCalculatedCost(calculatedCost)).toEqual(false);
    })
    it("should be true for valid JSON", () => {
      const json = '{\
        "requestId": "36f86e22-4575-4ee1-9614-1133d9faf071",\
        "masterTariffId": 522,\
        "tariffName": "tariffName",\
        "totalCost": "totalCost",\
        "fromDateTime": "fromDateTime",\
        "toDateTime": "toDateTime",\
        "accuracy": "accuracy",\
        "calculatedCostId": "calculatedCostId"\
      }';
      const calculatedCost: CalculatedCost = JSON.parse(json);
      expect(isCalculatedCost(calculatedCost)).toEqual(true);
    })
  });
  describe("isMassCalculation function", () => {
    it("should be false for invalid JSON", () => {
      const massCalculation: CalculatedCost = JSON.parse('{"notAKeyName": "BooleanKeyName","dataType": "BOOLEAN"}');
      expect(isMassCalculation(massCalculation)).toEqual(false);
    })
    it("should be true for valid JSON", () => {
      const json = '{\
        "fromDateTime": "2016-07-13T00:00:00-07:00",\
        "toDateTime": "2016-08-11T00:00:00-07:00",\
        "scenarios": ""\
      }';
      const massCalculation: CalculatedCost  = JSON.parse(json);
      expect(isMassCalculation(massCalculation)).toEqual(true);
    })
  });
  it("works for CalculatedCostRequest", () => {
    const calculatedCostRequestJson = '{\
      "isBillingPeriod": false,\
      "useIntelligentBaselining": true\
      }';
    const calculatedCostRequest: GetCalculatedCostRequest = JSON.parse(calculatedCostRequestJson);
    expect(calculatedCostRequest.isBillingPeriod).toEqual(false);
    expect(calculatedCostRequest.useIntelligentBaselining).toEqual(true);
  });
});
