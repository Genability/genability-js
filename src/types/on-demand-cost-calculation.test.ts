import { 
  CalculatedCost,
  CalculatedCostItem,
  PropertyData,
  isCalculatedCost
} from "./on-demand-cost-calculation";
import { 
  CommonPropertyKeyNames,
} from "./property-key";

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
  });
  describe("isCalculatedCost function", () => {
    it("should be false for invalid JSON", () => {
      const calculatedCost: CalculatedCost = JSON.parse('{"notAKeyName": "BooleanKeyName","dataType": "BOOLEAN"}');
      expect(isCalculatedCost(calculatedCost)).toEqual(false);
    })
    it("should be true for valid JSON", () => {
      const json = '{\
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
});