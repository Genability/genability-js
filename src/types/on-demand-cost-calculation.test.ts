import { 
  Map,
  QuantityKey,
  CalculatedCost,
  CalculatedCostItem,
  PropertyData,
  PropertyKeyName
} from "./on-demand-cost-calculation";

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
});