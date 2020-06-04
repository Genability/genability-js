import { 
  Lookup, isLookup
} from "./lookup";

describe("lookup", () => {
  it("works for Lookup", () => {
    const lookup: Lookup = JSON.parse('{\
      "lookupId": 1,\
      "propertyKey": "propertyKeyString",\
      "subPropertyKey": "subPropertyKeyString",\
      "actualValue": 121,\
      "forecastAccuracy": 22\
    }');
    expect(lookup.lookupId).toEqual(1);
    expect(lookup.propertyKey).toEqual('propertyKeyString');
    expect(lookup.subPropertyKey).toEqual('subPropertyKeyString');
    expect(lookup.actualValue).toEqual(121);
    expect(lookup.forecastAccuracy).toEqual(22);
  })
});
describe("isLookup function", () => {
  it("should be false for invalid JSON", () => {
    const lookup: Lookup = JSON.parse('{\
      "lookupId": 1,\
      "propertyKey": "propertyKeyString",\
      "forecastAccuracy": 22\
    }');
    expect(isLookup(lookup)).toEqual(false);
  })
  it("should be true for valid JSON", () => {
    const lookup: Lookup = JSON.parse('{\
      "lookupId": 1,\
      "propertyKey": "propertyKeyString",\
      "subPropertyKey": "subPropertyKeyString",\
      "fromDateTime": 121,\
      "toDateTime": 12,\
      "bestValue": 21,\
      "bestAccuracy": 2,\
      "actualValue": 31,\
      "lseForecastValue": 32,\
      "lseForecastAccuracy": 521,\
      "forecastValue": 41,\
      "forecastAccuracy": 4\
    }');
    expect(isLookup(lookup)).toEqual(true);
  })
});
