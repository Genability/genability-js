import { 
  SmartPriceApi,
  GetSmartPriceRequest
} from './smart-price-api';
import { GenabilityConfig, PagedResponse } from '../rest-client'
import { ResourceTypes } from "../types/resource-types";
import { Price, isPrice, isPriceChange } from '../types/smart-price';
import { GroupBy } from '../types/on-demand-cost-calculation';

const config = new GenabilityConfig({profileName:'unitTest'});
const restClient = new SmartPriceApi(config);

describe("GetSmartPrice request", () => {
  describe("call to queryStringify", () => {
    it("handles no parameters", async () => {
      const request: GetSmartPriceRequest = new GetSmartPriceRequest();
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it("handles masterTariffId parameter", async () => {
      const request: GetSmartPriceRequest = new GetSmartPriceRequest();
      request.masterTariffId = 1
      const qs: string = request.queryStringify();
      expect(qs).toEqual('masterTariffId=1');
    })
    it("handles several parameters", async () => {
      const request: GetSmartPriceRequest = new GetSmartPriceRequest();
      request.masterTariffId = 2;
      request.fromDateTime = '2013-02-15T18:04:16+00:00';
      request.country = 'USA';
      request.groupBy = GroupBy.HOUR;
      const qs: string = request.queryStringify();
      expect(qs).toEqual("fromDateTime=2013-02-15T18:04:16%2B00:00&masterTariffId=2&country=USA&groupBy=HOUR");
    })
    it("handles some other parameters", async () => {
      const request: GetSmartPriceRequest = new GetSmartPriceRequest();
      request.territoryId = 1;
      request.masterTariffId = 2;
      request.consumptionAmount = 0.083300;
      request.customerClass = 'RESIDENTIAL';
      request.addressString = 'addressString';
      request.demandAmount = 0.083300;
      request.zipCode = '94105';
      const qs: string = request.queryStringify();
      expect(qs).toEqual("masterTariffId=2&zipCode=94105&addressString=addressString&customerClass=RESIDENTIAL&territoryId=1&consumptionAmount=0.0833&demandAmount=0.0833");
    })
    it("handles undefined parameters", async () => {
      const request: GetSmartPriceRequest = new GetSmartPriceRequest();
      request.masterTariffId = undefined;
      request.country = undefined;
      request.territoryId = undefined;
      request.groupBy = undefined;
      request.demandAmount = undefined;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it("handles both pagination", async () => {
      const request: GetSmartPriceRequest = new GetSmartPriceRequest();
      request.masterTariffId = 1;
      request.pageCount = 22;
      request.pageStart = 33;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('masterTariffId=1&pageStart=33&pageCount=22');
    })
    it("handles both pagination via constructor", async () => {
      const request: GetSmartPriceRequest = new GetSmartPriceRequest({
        pageCount: 22,
        pageStart: 33
      });
      request.masterTariffId = 1;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('masterTariffId=1&pageStart=33&pageCount=22');
    })
  })
});

describe("SmartPrice api", () => {
  it("returns smart price", async () => {
    const request: GetSmartPriceRequest = new GetSmartPriceRequest();
    const response: PagedResponse<Price> = await restClient.getSmartPrices(request);
    expect(response.status).toEqual("success");
    expect(response.type).toEqual(ResourceTypes.PRICE);
    for(const price of response.results) {
      expect(isPrice(price)).toBeTruthy();
      for(const priceChange of price.priceChanges) {
        expect(isPriceChange(priceChange)).toBeTruthy();
      }
    }
  })
  it("returns smart price for masterTariffId 522", async () => {
    const request: GetSmartPriceRequest = new GetSmartPriceRequest();
    request.masterTariffId = 522;
    const response: PagedResponse<Price> = await restClient.getSmartPrices(request);
    expect(response.status).toEqual("success");
    expect(response.type).toEqual(ResourceTypes.PRICE);
    for(const price of response.results) {
      expect(isPrice(price)).toBeTruthy();
      expect(price.masterTariffId).toEqual(522);
      for(const priceChange of price.priceChanges) {
        expect(isPriceChange(priceChange)).toBeTruthy();
      }
    }
  })
  it("returns error for invalid masterTariffId", async () => {
    const request: GetSmartPriceRequest = new GetSmartPriceRequest();
    request.masterTariffId = -1;
    const response: PagedResponse<Price> = await restClient.getSmartPrices(request);
    expect(response.status).toEqual("error");
    expect(response.type).toEqual(ResourceTypes.Error);
  })
});