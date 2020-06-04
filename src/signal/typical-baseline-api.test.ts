import { 
  TypicalBaselineApi,
  GetBaselinesBestRequest
} from './typical-baseline-api';
import { PagedResponse } from '../rest-client'
import { Baseline, isBaseline, MeasureUnit, ServiceType, ResourceTypes } from '../types';
import { credentialsFromFile } from '../rest-client/credentials';

const credentials = credentialsFromFile('unitTest');
const restClient = new TypicalBaselineApi(credentials);

describe("GetBaselinesBest request", () => {
  describe("call to queryStringify", () => {
    it("handles no parameters", async () => {
      const request: GetBaselinesBestRequest = new GetBaselinesBestRequest();
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it("handles measuresUnit parameter", async () => {
      const request: GetBaselinesBestRequest = new GetBaselinesBestRequest();
      request.measuresUnit = MeasureUnit.TOTAL;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('measuresUnit=total');
    })
    it("handles several parameters", async () => {
      const request: GetBaselinesBestRequest = new GetBaselinesBestRequest();
      request.country = 'USA';
      request.addressString = '1234';
      request.serviceType = ServiceType.ELECTRICITY;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('country=USA&addressString=1234&serviceType=ELECTRICITY');
    })
    it("handles undefined parameters", async () => {
      const request: GetBaselinesBestRequest = new GetBaselinesBestRequest();
      request.country = undefined;
      request.measuresUnit = undefined;
      request.buildingVintage = undefined;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
  })
});

describe("TypicalBaseline api", () => {
  it("returns the typical baseline", async () => {
    const request: GetBaselinesBestRequest = new GetBaselinesBestRequest();
    request.lat = 37.22589772602739;
    request.lng = -122.04498898630153;
    request.buildingType = 'singleFamilyDetached';
    request.country = 'USA';
    request.excludeMeasures = false;
    request.groupBy = 'MONTH';
    request.measuresUnit = MeasureUnit.TOTAL;
    const response: PagedResponse<Baseline> = await restClient.getBaselinesBest(request);
    expect(response.type).toEqual(ResourceTypes.BASELINE);
    for(const baseline of response.results) {
      expect(isBaseline(baseline)).toBeTruthy();
    }
  })
});
