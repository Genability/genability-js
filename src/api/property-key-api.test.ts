import { 
  PropertyKeyApi, 
  GetPropertyKeysRequest 
} from './property-key-api';
import { SingleResponse, PagedResponse, isResponseError, GenabilityConfig } from '../rest-client'
import {
  GenPropertyKey,
  PropertyDataType,
  CommonPropertyKeyNames,
  isGenPropertyKey
} from '../types/property-key';

import { ResourceTypes } from '../types/resource-types';

const demandPk: GenPropertyKey = {
  dataType: PropertyDataType.DEMAND, 
  description: 'Quantity in kW of load that is used for a given period', 
  displayName: 'Demand (kW)', 
  family: 'load',
  keyName: CommonPropertyKeyNames.DEMAND,
  keyspace: 'electricity'
}

describe('GetPropertyKeys request', () => {
  describe('call to queryStringify', () => {
    it('handles no parameters', async () => {
      const request: GetPropertyKeysRequest = new GetPropertyKeysRequest();
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it('handles electricity parameter', async () => {
      const request: GetPropertyKeysRequest = new GetPropertyKeysRequest();
      request.keySpace = 'electricity';
      const qs: string = request.queryStringify();
      expect(qs).toEqual('keySpace=electricity');
    })
    it('handles several parameters', async () => {
      const request: GetPropertyKeysRequest = new GetPropertyKeysRequest();
      request.excludeGlobal = true;
      request.keySpace = 'electricity';
      const qs: string = request.queryStringify();
      expect(qs).toEqual('excludeGlobal=true&keySpace=electricity');
    })
    it('handles undefined parameters', async () => {
      const request: GetPropertyKeysRequest = new GetPropertyKeysRequest();
      request.excludeGlobal = undefined;
      request.keySpace = undefined;
      request.family = undefined;
      request.entityId = undefined;
      request.entityType = undefined;
      request.dataType = undefined;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it('returns all parameters', async () => {
      const request: GetPropertyKeysRequest = new GetPropertyKeysRequest();
      request.excludeGlobal = true;
      request.keySpace = 'electricity';
      request.family = 'family';
      request.entityId = 734;
      request.entityType = 'LSE';
      request.dataType = PropertyDataType.DEMAND;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('excludeGlobal=true&keySpace=electricity&family=family&entityId=734&entityType=LSE&dataType=DEMAND');
    })
    it('handles both pagination via constructor', async () => {
      const request: GetPropertyKeysRequest = new GetPropertyKeysRequest({
        pageCount: 22,
        pageStart: 33
      });
      request.keySpace = 'electricity';
      const qs: string = request.queryStringify();
      expect(qs).toEqual('keySpace=electricity&pageStart=33&pageCount=22');
    })
    it('handles both pagination via constructor', async () => {
      const request: GetPropertyKeysRequest = new GetPropertyKeysRequest();
      request.keySpace = 'electricity';
      request.pageCount = 0;
      request.pageStart = 100;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('keySpace=electricity&pageStart=100&pageCount=0');
    })
  })
});

describe('PropertyKey api', () => {
  let restClient: PropertyKeyApi;
  beforeAll(async () => {
    const config: GenabilityConfig = new GenabilityConfig({profileName:'unitTest'});
    if (config.useCredentialsFromFile) {
      await config.setCredentialsFromFile();
    }
    restClient = new PropertyKeyApi(config);
  });
  describe('get one endpoint', () => {
    it('returns the demand property key', async () => {
      const response: SingleResponse<GenPropertyKey> = await restClient.getPropertyKey(CommonPropertyKeyNames.DEMAND);
      expect(response.result).toBeTruthy();
      expect(response.errors).toBeUndefined();
      expect(response.result).toEqual(demandPk);
    })
    it('returns error on bad property key', async () => {
      const response: SingleResponse<GenPropertyKey> = await restClient.getPropertyKey('ThisPr0pertyKeyD03sN0tExist');
      expect(response.errors).toBeTruthy();
      expect(response.result).toBeNull();
      expect(response.errors && isResponseError(response.errors[0])).toEqual(true);
    })
  })
  describe('get n endpoint', () => {
    it('returns a list of property keys', async () => {
      const request: GetPropertyKeysRequest = new GetPropertyKeysRequest();
      request.keySpace = 'electricity';
      const response: PagedResponse<GenPropertyKey> = await restClient.getPropertyKeys(request);
      expect(response.status).toEqual('success');
      expect(response.type).toEqual(ResourceTypes.PROPERTY_KEY);
      expect(response.count).toBeGreaterThan(200);
      expect(response.results).toHaveLength(25);
      for(const pk of response.results) {
        expect(isGenPropertyKey(pk)).toBeTruthy();
      }
    })
  })
});