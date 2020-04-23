import { RestClient } from './client';

const credentials = {
  appId: 'test',
  appKey: '123'
}
const restClient = new RestClient(credentials);

describe("rest client", () => {
  describe("get", () => {
    it("works", () => {
      const pk: string = restClient.sendGet('/rest/public/properties/demand');
      expect(pk).toEqual('sent-get to /rest/public/properties/demand');
    })
  })
});
