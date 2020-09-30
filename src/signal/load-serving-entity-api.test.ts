import { 
  LoadServingEntityApi,
  GetLoadServingEntitiesRequest
} from './load-serving-entity-api';
import { PagedResponse } from '../rest-client'
import {
  LoadServingEntity,
  ServiceType,
  isLoadServingEntity,
  Ownership
} from '../types/load-serving-entity';
import { ResourceTypes } from '../types/resource-types'
import { credentialsFromFile } from '../rest-client/credentials';

const credentials = credentialsFromFile('unitTest');
const restClient = new LoadServingEntityApi(credentials);

describe("GetLoadServingEntities request", () => {
  describe("call to queryStringify", () => {
    it("handles no parameters", async () => {
      const request: GetLoadServingEntitiesRequest = new GetLoadServingEntitiesRequest();
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it("handles postCode parameter", async () => {
      const request: GetLoadServingEntitiesRequest = new GetLoadServingEntitiesRequest();
      request.postCode = '1';
      const qs: string = request.queryStringify();
      expect(qs).toEqual('postCode=1');
    })
    it("handles several parameters", async () => {
      const request: GetLoadServingEntitiesRequest = new GetLoadServingEntitiesRequest();
      request.country = 'USA';
      request.serviceTypes = [ServiceType.ELECTRICITY, ServiceType.GAS];
      const qs: string = request.queryStringify();
      expect(qs).toEqual('country=USA&fields=ext&serviceTypes=ELECTRICITY,GAS');
    })
    it("handles undefined parameters", async () => {
      const request: GetLoadServingEntitiesRequest = new GetLoadServingEntitiesRequest();
      request.country = undefined;
      request.serviceTypes = undefined;
      request.ownerships = undefined;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it("returns all parameters", async () => {
      const request: GetLoadServingEntitiesRequest = new GetLoadServingEntitiesRequest();
      request.postCode = '0001';
      request.country = 'USA';
      request.serviceTypes = [ServiceType.ELECTRICITY, ServiceType.GAS];
      request.ownerships = [Ownership.INVESTOR, Ownership.COOP];
      const qs: string = request.queryStringify();
      expect(qs).toEqual('postCode=0001&country=USA&fields=ext&serviceTypes=ELECTRICITY,GAS&ownerships=INVESTOR,COOP');
    })
    it("handles both pagination", async () => {
      const request: GetLoadServingEntitiesRequest = new GetLoadServingEntitiesRequest();
      request.postCode = '0001';
      request.pageCount = 22;
      request.pageStart = 33;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('postCode=0001&pageStart=33&pageCount=22');
    })
    it("handles both pagination via constructor", async () => {
      const request: GetLoadServingEntitiesRequest = new GetLoadServingEntitiesRequest({
        pageCount: 22,
        pageStart: 33
      });
      request.postCode = '0001';
      const qs: string = request.queryStringify();
      expect(qs).toEqual('postCode=0001&pageStart=33&pageCount=22');
    })
  })
});

describe("LoadServingEntity api", () => {
  describe("get one endpoint", () => {
    it("returns the load serving entity", async () => {
      const request: GetLoadServingEntitiesRequest = new GetLoadServingEntitiesRequest();
      const response: PagedResponse<LoadServingEntity> = await restClient.getLoadServingEntities(request);
      const { lseId } = response.results[0];
      const lse: LoadServingEntity = await restClient.getLoadServingEntity(lseId);
      expect(lse).toEqual(response.results[0]);
    })
  })
  describe("get n endpoint", () => {
    it("returns a list of load serving entities", async () => {
      const request: GetLoadServingEntitiesRequest = new GetLoadServingEntitiesRequest();
      request.serviceTypes = [ServiceType.ELECTRICITY];
      const response: PagedResponse<LoadServingEntity> = await restClient.getLoadServingEntities(request);
      expect(response.status).toEqual("success");
      expect(response.type).toEqual(ResourceTypes.LOAD_SERVING_ENTITY);
      expect(response.count).toBeGreaterThan(200);
      expect(response.results).toHaveLength(25);
      for(const lse of response.results) {
        expect(isLoadServingEntity(lse)).toBeTruthy();
      }
    })
  })
});