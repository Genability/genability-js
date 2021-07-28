import { 
  LookupApi,
  GetLookupsRequest
} from './lookup-api';
import { SingleResponse, PagedResponse } from '../rest-client'
import {
  LookupValue,
  isLookupValue,
  LookupStats,
  isLookupStats
} from '../types/lookup';
import { ResourceTypes } from '../types/resource-types'
import { credentialsFromFile } from '../rest-client/credentials';

const credentials = credentialsFromFile('unitTest');
const restClient = new LookupApi(credentials);

describe("Lookups request", () => {
  describe("call to queryStringify", () => {
    it("handles no parameters", async () => {
      const request: GetLookupsRequest = new GetLookupsRequest();
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it("handles propertyKey parameter", async () => {
      const request: GetLookupsRequest = new GetLookupsRequest();
      request.propertyKey = 'propertyKeyName';
      const qs: string = request.queryStringify();
      expect(qs).toEqual('propertyKey=propertyKeyName');
    })
    it("handles several parameters", async () => {
      const request: GetLookupsRequest = new GetLookupsRequest();
      request.propertyKey = 'propertyKeyName';
      request.subPropertyKey = 'sub';
      const qs: string = request.queryStringify();
      expect(qs).toEqual('propertyKey=propertyKeyName&subPropertyKey=sub');
    })
    it("handles undefined parameters", async () => {
      const request: GetLookupsRequest = new GetLookupsRequest();
      request.propertyKey = undefined;
      request.fromDateTime = undefined;
      request.toDateTime = undefined;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it("returns all parameters", async () => {
      const request: GetLookupsRequest = new GetLookupsRequest();
      request.propertyKey = 'propertyKeyName';
      request.subPropertyKey = 'sub';
      request.fromDateTime = '2017-02-25T00:00:00';
      request.toDateTime = '2018-02-25T00:00:00';
      const qs: string = request.queryStringify();
      expect(qs).toEqual('propertyKey=propertyKeyName&subPropertyKey=sub&fromDateTime=2017-02-25T00:00:00&toDateTime=2018-02-25T00:00:00');
    })
    it("handles both pagination", async () => {
      const request: GetLookupsRequest = new GetLookupsRequest();
      request.subPropertyKey = 'sub';
      request.pageCount = 22;
      request.pageStart = 33;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('subPropertyKey=sub&pageStart=33&pageCount=22');
    })
    it("handles both pagination via constructor", async () => {
      const request: GetLookupsRequest = new GetLookupsRequest({
        pageCount: 22,
        pageStart: 33
      });
      request.subPropertyKey = 'sub';
      const qs: string = request.queryStringify();
      expect(qs).toEqual('subPropertyKey=sub&pageStart=33&pageCount=22');
    })
  })
});

describe("Lookup api", () => {
  it("should returns all lookups", async () => {
    const response: PagedResponse<LookupValue> = await restClient.getLookupValues();
    expect(response.status).toEqual("success");
    expect(response.type).toEqual(ResourceTypes.PROPERTY_LOOKUP);
    expect(response.count).toBeGreaterThan(200);
    expect(response.results).toHaveLength(25);
    for(const lookup of response.results) {
      expect(isLookupValue(lookup)).toBeTruthy();
    }
  }, 10000)
  it("should returns a specific choice for a PropertyKey", async () => {
    const response: PagedResponse<LookupValue> = await restClient.getPropertyLookupValues('hourlyPricingDayAheadERCOT');
    expect(response.status).toEqual("success");
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
