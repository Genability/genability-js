import { 
  TerritoryApi,
  GetTerritoriesRequest
} from './territory-api';
import { PagedResponse } from '../rest-client'
import {
  ResourceTypes,
  Territory,
  isTerritory,
  ItemType
} from '../types';
import { credentialsFromFile } from '../rest-client/credentials';

const credentials = credentialsFromFile('unitTest');
const restClient = new TerritoryApi(credentials);

describe("GetTerritories request", () => {
  describe("call to queryStringify", () => {
    it("handles no parameters", async () => {
      const request: GetTerritoriesRequest = new GetTerritoriesRequest();
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it("handles lseId parameter", async () => {
      const request: GetTerritoriesRequest = new GetTerritoriesRequest();
      request.lseId = 1;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('lseId=1');
    })
    it("handles several parameters", async () => {
      const request: GetTerritoriesRequest = new GetTerritoriesRequest();
      request.country = 'USA';
      request.masterTariffId = 1;
      request.containsItemType = ItemType.CITY;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('masterTariffId=1&country=USA&containsItemType=CITY');
    })
    it("handles undefined parameters", async () => {
      const request: GetTerritoriesRequest = new GetTerritoriesRequest();
      request.country = undefined;
      request.masterTariffId = undefined;
      request.containsItemType = undefined;
      request.lseId = undefined;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it("handles both pagination", async () => {
      const request: GetTerritoriesRequest = new GetTerritoriesRequest();
      request.country = 'USA';
      request.pageCount = 22;
      request.pageStart = 33;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('country=USA&pageStart=33&pageCount=22');
    })
    it("handles both pagination via constructor", async () => {
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

describe("Territory api", () => {
  describe("get one endpoint", () => {
    it("returns the territory", async () => {
      const request: GetTerritoriesRequest = new GetTerritoriesRequest();
      const response: PagedResponse<Territory> = await restClient.getTerritories(request);
      const { territoryId } = response.results[0];
      const territory: Territory = await restClient.getTerritory(territoryId);
      expect(territory).toEqual(response.results[0]);
    })
  })
  describe("get n endpoint", () => {
    it("returns a list of territories", async () => {
      const request: GetTerritoriesRequest = new GetTerritoriesRequest();
      request.country = 'USA';
      const response: PagedResponse<Territory> = await restClient.getTerritories(request);
      expect(response.status).toEqual("success");
      expect(response.type).toEqual(ResourceTypes.TERRITORY);
      for(const territory of response.results) {
        expect(isTerritory(territory)).toBeTruthy();
      }
    })
  })
});