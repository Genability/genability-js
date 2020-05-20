import { 
  Map,
  CalculatedCost
} from "./on-demand-cost-calculation";

describe("on-demand-cost-calculation types", () => {
  describe("test that JSON to enum", () => {
    it("works for Map", () => {
      const calculatedCost: CalculatedCost = JSON.parse('{"masterTariffId": "masterTariffId", "summary": "adjustedTotalCost"}');
      expect(calculatedCost.summary).toEqual(Map.ADJUSTED_TOTAL_COST);
      expect(calculatedCost.masterTariffId).toEqual('masterTariffId');
    })
  });
});