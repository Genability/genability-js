import { 
  Map,
  QuantityKey,
  CalculatedCost,
  CalculatedCostItem,
  PropertyData,
  isCalculatedCost
} from "./on-demand-cost-calculation";
import { 
  PropertyKeyName,
} from "./property-key";

describe("on-demand-cost-calculation types", () => {
  describe("test that JSON to enum", () => {
    it("works for Map", () => {
      const calculatedCost: CalculatedCost = JSON.parse('{"masterTariffId": 1, "summary": "adjustedTotalCost"}');
      expect(calculatedCost.summary).toEqual(Map.ADJUSTED_TOTAL_COST);
      expect(calculatedCost.masterTariffId).toEqual(1);
    })
    it("works for QuantityKey", () => {
      const calculatedCostItem: CalculatedCostItem = JSON.parse('{"tariffId": 1, "quantityKey": "consumption"}');
      expect(calculatedCostItem.quantityKey).toEqual(QuantityKey.CONSUMPTION);
      expect(calculatedCostItem.tariffId).toEqual(1);
    })
    it("works for PropertyKeyName", () => {
      const propertyData: PropertyData = JSON.parse('{"keyName": "cityLimits", "displayName": "DisplayName"}');
      expect(propertyData.keyName).toEqual(PropertyKeyName.CITY_LIMITS);
      expect(propertyData.displayName).toEqual('DisplayName');
    })
  });
  describe("isCalculatedCost function", () => {
    it("should be false for invalid JSON", () => {
      const calculatedCost: CalculatedCost = JSON.parse('{"notAKeyName": "BooleanKeyName","dataType": "BOOLEAN"}');
      expect(isCalculatedCost(calculatedCost)).toEqual(false);
    })
    it("should be true for valid JSON", () => {
      const json = '{\
        "masterTariffId": "masterTariffId",\
        "fromDateTime": "fromDateTime",\
        "toDateTime": "toDateTime",\
        "assumptions": []\
      }';
      const calculatedCost: CalculatedCost = JSON.parse(json);
      expect(isCalculatedCost(calculatedCost)).toEqual(true);
      expect(calculatedCost.assumptions).toHaveLength(0);
    })
    it("should be true with multiple assumptions", () => {
      const json = '{\
        "masterTariffId": "masterTariffId",\
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
      expect(isCalculatedCost(calculatedCost)).toEqual(true);
      expect(calculatedCost.assumptions).toHaveLength(2);
    })
  });
});