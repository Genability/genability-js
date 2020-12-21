import { 
  CalculatedCostRequest
} from './calculation-history';

describe("Calculation history types", () => {
  it("works for CalculatedCostRequest", () => {
    const calculatedCostRequestJson = '{\
      "isBillingPeriod": false,\
      "useIntelligentBaselining": null\
      }';
    const calculatedCostRequest: CalculatedCostRequest = JSON.parse(calculatedCostRequestJson);
    expect(calculatedCostRequest.isBillingPeriod).toEqual(false);
    expect(calculatedCostRequest.useIntelligentBaselining).toEqual(null);
  })
});
