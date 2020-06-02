import { 
  MeasureUnit, Baseline
} from './typical-baseline';

describe("TypicalBaseline types", () => {
  it("works for MeasureUnit", () => {
    const baseline: Baseline = JSON.parse('{"baselineId": "Baseline Id", "measureUnit": "intensity"}');
    expect(baseline.baselineId).toEqual("Baseline Id");
    expect(baseline.measureUnit).toEqual(MeasureUnit.INTENSITY);
  })
  // TODO
});
