import { PropertyKeyApi, GetPropertyKeysRequest } from './property-key-api';
import { PagedResponse } from '../rest-client'
import {
  ResourceTypes
} from '../types';
import {
  GenPropertyKey,
  DataType,
  isGenPropertyKey
} from '../types/property-key';
import { credentialsFromFile } from '../rest-client/credentials';

const credentials = credentialsFromFile('unitTest');
const restClient = new PropertyKeyApi(credentials);

const demandPk: GenPropertyKey = {
  dataType: DataType.DEMAND, 
  description: "Quantity in kW of load that is used for a given period", 
  displayName: "Demand (kW)", 
  family: "load",
  keyName: "demand",
  keyspace: "electricity"
}

describe("GetPropertyKeys request", () => {
  describe("call to queryStringify", () => {
    it("handles no parameters", async () => {
      const request: GetPropertyKeysRequest = new GetPropertyKeysRequest();
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it("handles electricity parameter", async () => {
      const request: GetPropertyKeysRequest = new GetPropertyKeysRequest();
      request.keySpace = 'electricity';
      const qs: string = request.queryStringify();
      expect(qs).toEqual('keySpace=electricity');
    })
    it("handles several parameters", async () => {
      const request: GetPropertyKeysRequest = new GetPropertyKeysRequest();
      request.excludeGlobal = true;
      request.keySpace = 'electricity';
      const qs: string = request.queryStringify();
      expect(qs).toEqual('excludeGlobal=true&keySpace=electricity');
    })
    it("handles undefined parameters", async () => {
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
    it("returns all parameters", async () => {
      const request: GetPropertyKeysRequest = new GetPropertyKeysRequest();
      request.excludeGlobal = true;
      request.keySpace = 'electricity';
      request.family = 'family';
      request.entityId = 734;
      request.entityType = 'LSE';
      request.dataType = DataType.DEMAND;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('excludeGlobal=true&keySpace=electricity&family=family&entityId=734&entityType=LSE&dataType=DEMAND');
    })
  })
});

describe("PropertyKey api", () => {
  describe("get one endpoint", () => {
    it("returns the demand property key", async () => {
      const pk: GenPropertyKey = await restClient.getPropertyKey('demand');
      expect(pk).toEqual(demandPk);
    })
  })
  describe("get n endpoint", () => {
    it("returns a list of property keys", async () => {
      const request: GetPropertyKeysRequest = new GetPropertyKeysRequest();
      request.keySpace = 'electricity';
      const response: PagedResponse<GenPropertyKey> = await restClient.getPropertyKeys(request);
      //console.log(response);
      expect(response.status).toEqual("success");
      expect(response.type).toEqual(ResourceTypes.PROPERTY_KEY);
      expect(response.count).toBeGreaterThan(200);
      expect(response.results).toHaveLength(25);
      for(const pk of response.results) {
        expect(isGenPropertyKey(pk)).toBeTruthy();
      }
    })
  })
});