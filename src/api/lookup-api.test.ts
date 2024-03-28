import { 
  LookupApi,
  GetLookupsRequest
} from './lookup-api';
import { SingleResponse, PagedResponse, GenabilityConfig } from '../rest-client'
import {
  LookupValue,
  isLookupValue,
  LookupStats,
  isLookupStats
} from '../types/lookup';
import { ResourceTypes } from '../types/resource-types'

describe('Lookups request', () => {
  describe('call to queryStringify', () => {
    it('throws an error for empty keyName parameter', async () => {
      expect(() => new GetLookupsRequest('')).toThrow('keyName is required and cannot be empty.');
    });
    it('handles keyName parameter', async () => {
      const request: GetLookupsRequest = new GetLookupsRequest('propertyKeyName');
      const qs: string = request.queryStringify();
      expect(qs).toEqual('keyName=propertyKeyName');
    })
    it('handles several parameters', async () => {
      const request: GetLookupsRequest = new GetLookupsRequest('propertyKeyName');
      request.subKeyName = 'sub';
      const qs: string = request.queryStringify();
      expect(qs).toEqual('keyName=propertyKeyName&subKeyName=sub');
    })
    it('returns all parameters', async () => {
      const request: GetLookupsRequest = new GetLookupsRequest('propertyKeyName');
      request.subKeyName = 'sub';
      request.fromDateTime = '2017-02-25T00:00:00';
      request.toDateTime = '2018-02-25T00:00:00';
      const qs: string = request.queryStringify();
      expect(qs).toEqual('keyName=propertyKeyName&subKeyName=sub&fromDateTime=2017-02-25T00:00:00&toDateTime=2018-02-25T00:00:00');
    })
    it('handles both pagination', async () => {
      const request: GetLookupsRequest = new GetLookupsRequest('propertyKeyName');
      request.subKeyName = 'sub';
      request.pageCount = 22;
      request.pageStart = 33;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('keyName=propertyKeyName&subKeyName=sub&pageStart=33&pageCount=22');
    })
    it('handles both pagination via constructor', async () => {
      const request: GetLookupsRequest = new GetLookupsRequest('propertyKeyName', {
        pageCount: 22,
        pageStart: 33
      });
      request.subKeyName = 'sub';
      const qs: string = request.queryStringify();
      expect(qs).toEqual('keyName=propertyKeyName&subKeyName=sub&pageStart=33&pageCount=22');
    })
  })
});

describe('Lookup api', () => {
  let restClient: LookupApi;
  beforeAll(async () => {
    const config: GenabilityConfig = new GenabilityConfig({profileName:'unitTest'});
    if (config.useCredentialsFromFile) {
      await config.setCredentialsFromFile();
    }
    restClient = new LookupApi(config);
  });
  // TODO this has to be enabled once when the ticket "GEN-3711" gets addressed. Disabling the test case disabled due to a gateway error in the public/properties/lookups end point
  // it('should returns all lookups', async () => {
  //   const response: PagedResponse<LookupValue> = await restClient.getLookupValues();
  //   expect(response.status).toEqual('success');
  //   expect(response.type).toEqual(ResourceTypes.PROPERTY_LOOKUP);
  //   expect(response.count).toBeGreaterThan(200);
  //   expect(response.results).toHaveLength(25);
  //   for(const lookup of response.results) {
  //     expect(isLookupValue(lookup)).toBeTruthy();
  //   }
  // }, 10000)
  it('should returns a specific choice for a keyName', async () => {
    const response: PagedResponse<LookupValue> = await restClient.getPropertyLookupValues('hourlyPricingDayAheadERCOT');
    expect(response.status).toEqual('success');
    expect(response.type).toEqual(ResourceTypes.PROPERTY_LOOKUP);
    expect(response.count).toBeGreaterThan(200);
    expect(response.results).toHaveLength(25);
    for(const lookup of response.results) {
      expect(isLookupValue(lookup)).toBeTruthy();
    }
  }, 10000)
  it('should returns lookup stats for a property key', async () =>{
    const response: SingleResponse<LookupStats> = await restClient.getPropertyLookupStats('hourlyPricingDayAheadERCOT');
    expect(response.result).toBeTruthy();
    expect(response.errors).toBeUndefined();
    expect(response.result && isLookupStats(response.result)).toBeTruthy();
  }, 10000)
});
