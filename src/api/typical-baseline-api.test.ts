import { 
  TypicalBaselineApi,
  GetBaselinesBestRequest
} from './typical-baseline-api';
import { GenabilityConfig, SingleResponse } from '../rest-client'
import { Baseline, isBaseline, MeasureUnit } from '../types/typical-baseline';
import { ServiceType } from '../types/load-serving-entity';
import { ResourceTypes } from '../types/resource-types'

describe('GetBaselinesBest request', () => {
  describe('call to queryStringify', () => {
    it('handles no parameters', async () => {
      const request: GetBaselinesBestRequest = new GetBaselinesBestRequest();
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it('handles measuresUnit parameter', async () => {
      const request: GetBaselinesBestRequest = new GetBaselinesBestRequest();
      request.measuresUnit = MeasureUnit.TOTAL;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('measuresUnit=total');
    })
    it('handles several parameters', async () => {
      const request: GetBaselinesBestRequest = new GetBaselinesBestRequest();
      request.country = 'US';
      request.postCode = '94105';
      request.serviceType = ServiceType.ELECTRICITY;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('postCode=94105&country=US&serviceType=ELECTRICITY');
    })
    it('handles undefined parameters', async () => {
      const request: GetBaselinesBestRequest = new GetBaselinesBestRequest();
      request.country = undefined;
      request.measuresUnit = undefined;
      request.buildingVintage = undefined;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
  })
});

describe('TypicalBaseline api', () => {
  jest.setTimeout(30000);

  it('returns the typical baseline', async () => {
    const config: GenabilityConfig = new GenabilityConfig({profileName:'unitTest'});
    if (config.useCredentialsFromFile) {
      await config.setCredentialsFromFile();
    }
    const restClient = new TypicalBaselineApi(config);
    const request: GetBaselinesBestRequest = new GetBaselinesBestRequest();
    request.postCode = '94105';
    request.country = 'US';
    request.buildingType = 'RESIDENTIAL';
    request.excludeMeasures = false;
    request.groupBy = 'MONTH';
    request.measuresUnit = MeasureUnit.TOTAL;
    const response: SingleResponse<Baseline> = await restClient.getBestBaseline(request);
    expect(response.type).toEqual(ResourceTypes.BASELINE);
    expect(response.results).toBeTruthy();
    expect(response.errors).toBeUndefined();
    expect(response.result && isBaseline(response.result)).toEqual(true);
  })
});
