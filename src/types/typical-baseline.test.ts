import { 
  MeasureUnit,
  Baseline,
  BaselineMeasure,
  IntervalInfo,
  QuantityRateAmount,
  Factor,
  BuildingType,
  isBaseline
} from './typical-baseline';
import { CustomerClass } from './tariff';

describe("TypicalBaseline types", () => {
  it("works for MeasureUnit", () => {
    const baseline: Baseline = JSON.parse('{"baselineId": "Baseline Id", "measureUnit": "intensity"}');
    expect(baseline.baselineId).toEqual("Baseline Id");
    expect(baseline.measureUnit).toEqual(MeasureUnit.INTENSITY);
  })
  it("works for BaselineMeasure", () => {
    const baselineMeasure: BaselineMeasure = JSON.parse('{"i": 3,"v": 2}');
    expect(baselineMeasure).toHaveProperty('i', 3);
    expect(baselineMeasure).toHaveProperty('v', 2);
  })
  it("works for IntervalInfo", () => {
    const intervalInfo: IntervalInfo = JSON.parse('{\
      "fromDateTime": "2014-01-01T00:00:00.000Z",\
      "toDateTime": "2014-02-01T00:00:00.000Z",\
      "duration": 2678400000\
    }');
    expect(intervalInfo).toHaveProperty('fromDateTime', '2014-01-01T00:00:00.000Z');
    expect(intervalInfo).toHaveProperty('toDateTime', '2014-02-01T00:00:00.000Z');
    expect(intervalInfo).toHaveProperty('duration', 2678400000);
  })
  it("works for QuantityRateAmount", () => {
    const quantityRateAmount: QuantityRateAmount = JSON.parse('{"quantityAmount": 1, "rateAmount": 2}');
    expect(quantityRateAmount).toHaveProperty('quantityAmount', 1);
    expect(quantityRateAmount).toHaveProperty('rateAmount', 2);
  })
  it("works for Factor", () => {
    const factor: Factor = JSON.parse('{\
      "peakDemand": 1,\
      "monthlyConsumption": 2,\
      "annualConsumption": 3,\
      "meanAnnualConsumption": 4,\
      "meanBuildingArea": 5,\
      "meanIntensity": 6,\
      "buildingArea": 7\
    }');
    expect(factor).toHaveProperty('peakDemand', 1);
    expect(factor).toHaveProperty('monthlyConsumption', 2);
    expect(factor).toHaveProperty('annualConsumption', 3);
    expect(factor).toHaveProperty('meanAnnualConsumption', 4);
    expect(factor).toHaveProperty('meanBuildingArea', 5);
    expect(factor).toHaveProperty('meanIntensity', 6);
    expect(factor).toHaveProperty('buildingArea', 7);
  })
  it("works for BuildingType", () => {
    const buildingType: BuildingType = JSON.parse('{\
      "id": "1",\
      "name": "name",\
      "description": "description",\
      "customerClass": "GENERAL"\
    }');
    expect(buildingType).toHaveProperty('id', '1');
    expect(buildingType).toHaveProperty('name', 'name');
    expect(buildingType).toHaveProperty('description', 'description');
    expect(buildingType).toHaveProperty('customerClass', CustomerClass.GENERAL);
  })
});

describe("works for isBaseline", () => {
  it("should be false for invalid JSON", () => {
    const baselineJson = `{\
      "baselineId": "baselineId"\
      }`;
    const baseline: Baseline = JSON.parse(baselineJson);
    expect(baseline.baselineId).toEqual('baselineId');
    expect(isBaseline(baseline)).toBeFalsy();
  });
  it("should be true for valid JSON", () => {
    const baselineJson = `{\
      "baselineId": "baselineId",\
      "name": "name",\
      "buildingType": {"id": "RESIDENTIAL"},\
      "climateZone": {"territoryId": 31313},\
      "factors": {"peakDemand": 2121}\
      }`;
    const baseline: Baseline = JSON.parse(baselineJson);
    expect(baseline.baselineId).toEqual('baselineId');
    expect(isBaseline(baseline)).toBeTruthy();
  });
});