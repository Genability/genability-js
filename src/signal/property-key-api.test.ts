import { PropertyKeyApi } from './property-key-api';
import { GenPropertyKey, DataType } from '../types/property-key';
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
});