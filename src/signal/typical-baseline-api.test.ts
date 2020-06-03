import { 
  TypicalBaselineApi,
  GetBaselinesBestRequest
} from './typical-baseline-api';
import { PagedResponse } from '../rest-client'
import { Baseline, isBaseline } from '../types';
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
    // TODO
  })
});

describe("TypicalBaseline api", () => {
  it("returns the typical baseline", async () => {
    const request: GetBaselinesBestRequest = new GetBaselinesBestRequest();
    request.addressString = '94105';
    request.buildingType = 'RESIDENTIAL';
    request.excludeMeasures = false;
    request.groupBy = 'MONTH';
    const response: PagedResponse<Baseline> = await restClient.getBaselinesBest(request);
    for(const baseline of response.results) {
      expect(isBaseline(baseline)).toBeTruthy();
    }
  })
  // TODO
});