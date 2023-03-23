import { 
  LoadServingEntityApi,
  GetLoadServingEntitiesRequest
} from './load-serving-entity-api';
import { SingleResponse, PagedResponse, GenabilityConfig } from '../rest-client'
import {
  LoadServingEntity,
  ServiceType,
  isLoadServingEntity,
  Ownership
} from '../types/load-serving-entity';
import { ResourceTypes } from '../types/resource-types'
import { Fields } from '../rest-client/contract';

describe('GetLoadServingEntities request', () => {
  describe('call to queryStringify', () => {
    it('handles no parameters', async () => {
      const request: GetLoadServingEntitiesRequest = new GetLoadServingEntitiesRequest();
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it('handles postCode parameter', async () => {
      const request: GetLoadServingEntitiesRequest = new GetLoadServingEntitiesRequest();
      request.postCode = '1';
      const qs: string = request.queryStringify();
      expect(qs).toEqual('postCode=1');
    })
    it('handles several parameters', async () => {
      const request: GetLoadServingEntitiesRequest = new GetLoadServingEntitiesRequest();
      request.country = 'USA';
      request.fields = Fields.EXTENDED;
      request.serviceTypes = [ServiceType.ELECTRICITY, ServiceType.GAS];
      const qs: string = request.queryStringify();
      expect(qs).toEqual('country=USA&serviceTypes=ELECTRICITY,GAS&fields=ext');
    })
    it('handles undefined parameters', async () => {
      const request: GetLoadServingEntitiesRequest = new GetLoadServingEntitiesRequest();
      request.country = undefined;
      request.serviceTypes = undefined;
      request.ownerships = undefined;
      request.fields = undefined;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it('returns all parameters', async () => {
      const request: GetLoadServingEntitiesRequest = new GetLoadServingEntitiesRequest();
      request.postCode = '0001';
      request.country = 'USA';
      request.fields = Fields.EXTENDED;
      request.serviceTypes = [ServiceType.ELECTRICITY, ServiceType.GAS];
      request.ownerships = [Ownership.INVESTOR, Ownership.COOP];
      const qs: string = request.queryStringify();
      expect(qs).toEqual('postCode=0001&country=USA&serviceTypes=ELECTRICITY,GAS&ownerships=INVESTOR,COOP&fields=ext');
    })
    it('handles both pagination', async () => {
      const request: GetLoadServingEntitiesRequest = new GetLoadServingEntitiesRequest();
      request.postCode = '0001';
      request.pageCount = 22;
      request.pageStart = 33;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('postCode=0001&pageStart=33&pageCount=22');
    })
    it('handles both pagination via constructor', async () => {
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

describe('LoadServingEntity api', () => {
  let config = new GenabilityConfig({profileName:'unitTest'});
  let restClient = new LoadServingEntityApi(config);
  beforeAll(async () => {
    if (config.useCredentialsFromFile) {
      const configFromFile = await config.getCredentialsFromFile();
      config = configFromFile || config;;
    }
    restClient = new LoadServingEntityApi(config);
  });
  describe('get one endpoint', () => {
    it('returns the load serving entity', async () => {
      const request: GetLoadServingEntitiesRequest = new GetLoadServingEntitiesRequest();
      const assignResponse: PagedResponse<LoadServingEntity> = await restClient.getLoadServingEntities(request);
      const { lseId } = assignResponse.results[0];
      const response: SingleResponse<LoadServingEntity> = await restClient.getLoadServingEntity(lseId);
      expect(response.result).toBeTruthy();
      expect(response.errors).toBeUndefined();
      expect(response.result).toEqual(assignResponse.results[0]);
    })
  })
  describe('get n endpoint', () => {
    it('returns a list of load serving entities', async () => {
      const request: GetLoadServingEntitiesRequest = new GetLoadServingEntitiesRequest();
      request.serviceTypes = [ServiceType.ELECTRICITY];
      const response: PagedResponse<LoadServingEntity> = await restClient.getLoadServingEntities(request);
      expect(response.status).toEqual('success');
      expect(response.type).toEqual(ResourceTypes.LOAD_SERVING_ENTITY);
      expect(response.count).toBeGreaterThan(200);
      expect(response.results).toHaveLength(25);
      for(const lse of response.results) {
        expect(isLoadServingEntity(lse)).toBeTruthy();
      }
    })
  })
});