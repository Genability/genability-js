import { 
  TerritoryApi,
  GetTerritoriesRequest
} from './territory-api';
import { GenabilityConfig, PagedResponse, SingleResponse } from '../rest-client'
import { ResourceTypes } from '../types/resource-types'
import {
  Territory,
  isTerritory,
  ItemType
} from '../types/territory';

describe('GetTerritories request', () => {

  describe('call to queryStringify', () => {
    it('handles no parameters', async () => {
      const request: GetTerritoriesRequest = new GetTerritoriesRequest();
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it('handles lseId parameter', async () => {
      const request: GetTerritoriesRequest = new GetTerritoriesRequest();
      request.lseId = 1;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('lseId=1');
    })
    it('handles several parameters', async () => {
      const request: GetTerritoriesRequest = new GetTerritoriesRequest();
      request.country = 'USA';
      request.masterTariffId = 1;
      request.containsItemType = ItemType.CITY;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('masterTariffId=1&country=USA&containsItemType=CITY');
    })
    it('handles undefined parameters', async () => {
      const request: GetTerritoriesRequest = new GetTerritoriesRequest();
      request.country = undefined;
      request.masterTariffId = undefined;
      request.containsItemType = undefined;
      request.lseId = undefined;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it('handles both pagination', async () => {
      const request: GetTerritoriesRequest = new GetTerritoriesRequest();
      request.country = 'USA';
      request.pageCount = 22;
      request.pageStart = 33;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('country=USA&pageStart=33&pageCount=22');
    })
    it('handles both pagination via constructor', async () => {
      const request: GetTerritoriesRequest = new GetTerritoriesRequest({
        pageCount: 22,
        pageStart: 33
      });
      request.country = 'USA';
      const qs: string = request.queryStringify();
      expect(qs).toEqual('country=USA&pageStart=33&pageCount=22');
    })
  })
});

describe('Territory api', () => {
  let config;
  let restClient: TerritoryApi;

  beforeAll(async () => {
    config = new GenabilityConfig({profileName:'unitTest'});
    if (config.useCredentialsFromFile) {
      const configFromFile = await config.getCredentialsFromFile();
      config = configFromFile || config;;
    }
    restClient = new TerritoryApi(config);
  })
  describe('get one endpoint', () => {
    it('returns the territory', async () => {
      const request: GetTerritoriesRequest = new GetTerritoriesRequest();
      const assignResponse: PagedResponse<Territory> = await restClient.getTerritories(request);
      const { territoryId } = assignResponse.results[0];
      const response: SingleResponse<Territory> = await restClient.getTerritory(territoryId);
      expect(response.result).toBeTruthy();
      expect(response.errors).toBeUndefined();
      if(response.result == null) fail('response.result null');
      expect(isTerritory(response.result)).toEqual(true);
      expect(response.result).toEqual(response.results[0]);
    })
  })
  describe('get n endpoint', () => {
    it('returns a list of territories', async () => {
      const request: GetTerritoriesRequest = new GetTerritoriesRequest();
      request.country = 'USA';
      const response: PagedResponse<Territory> = await restClient.getTerritories(request);
      expect(response.status).toEqual('success');
      expect(response.type).toEqual(ResourceTypes.TERRITORY);
      for(const territory of response.results) {
        expect(isTerritory(territory)).toBeTruthy();
      }
    })
  })
});