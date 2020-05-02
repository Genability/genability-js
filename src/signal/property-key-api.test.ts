import { PropertyKeyApi } from './property-key-api';
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

describe("PropertyKey api", () => {
  describe("get one endpoint", () => {
    it("returns the demand property key", async () => {
      const pk: GenPropertyKey = await restClient.getPropertyKey('demand');
      expect(pk).toEqual(demandPk);
    })
  })
  describe("get n endpoint", () => {
    it("returns a list of property keys", async () => {
      const response: PagedResponse<GenPropertyKey> = await restClient.getPropertyKeys();
      console.log(response);
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