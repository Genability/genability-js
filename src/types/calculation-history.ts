export interface CalculatedCostRequest {
  isBillingPeriod?: boolean;
  calcNetExcessGeneration?: boolean;
  autoBaseline?: string|null;
  useIntelligentBaselining?: boolean|null;
  testRatePredominance?: string|null;
}