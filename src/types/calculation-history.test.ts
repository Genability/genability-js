import { 
  CalculatedCostRequest
} from './calculation-history';

describe("Calculation history types", () => {
  it("works for CalculatedCostRequest", () => {
    const calculatedCostRequestJson = '{\
      "isBillingPeriod": false,\
      "calcNetExcessGeneration": false,\
      "autoBaseline": null,\
      "useIntelligentBaselining": null,\
      "testRatePredominance": null\
      }';
    const calculatedCostRequest: CalculatedCostRequest = JSON.parse(calculatedCostRequestJson);
    expect(calculatedCostRequest.isBillingPeriod).toEqual(false);
    expect(calculatedCostRequest.calcNetExcessGeneration).toEqual(false);
    expect(calculatedCostRequest.autoBaseline).toEqual(null);
    expect(calculatedCostRequest.useIntelligentBaselining).toEqual(null);
    expect(calculatedCostRequest.testRatePredominance).toEqual(null);
  })
});
