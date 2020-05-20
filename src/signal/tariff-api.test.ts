import { 
  TariffApi,
  GetTariffsRequest
} from './tariff-api';
import { PagedResponse } from '../rest-client'
import {
  ResourceTypes,
  TariffType,
  CustomerClass,
  ChargeType,
  Tariff,
  isTariff
} from '../types';
import { credentialsFromFile } from '../rest-client/credentials';

const credentials = credentialsFromFile('unitTest');
const restClient = new TariffApi(credentials);

describe("GetTariffs request", () => {
  describe("call to queryStringify", () => {
    it("handles no parameters", async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it("handles lseId parameter", async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      request.lseId = 1;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('lseId=1');
    })
    it("handles several parameters", async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      request.masterTariffId = 2;
      request.effectiveOn = '2020-05-19';
      request.tariffTypes = [`${TariffType.ALTERNATIVE},${TariffType.DEFAULT}`];
      const qs: string = request.queryStringify();
      expect(qs).toEqual("masterTariffId=2&effectiveOn=2020-05-19&tariffTypes=ALTERNATIVE,DEFAULT");
    })
    it("handles all parameters", async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      request.lseId = 1;
      request.masterTariffId = 2;
      request.effectiveOn = '2020-05-19';
      request.customerClasses = [`${CustomerClass.GENERAL},${CustomerClass.PROPOSED}`];
      request.tariffTypes = [`${TariffType.ALTERNATIVE},${TariffType.DEFAULT}`];
      request.chargeTypes = [`${ChargeType.CONSUMPTION_BASED},${ChargeType.DEMAND_BASED}`];
      const qs: string = request.queryStringify();
      expect(qs).toEqual("lseId=1&masterTariffId=2&effectiveOn=2020-05-19&customerClasses=GENERAL,PROPOSED&tariffTypes=ALTERNATIVE,DEFAULT&chargeTypes=CONSUMPTION_BASED,DEMAND_BASED");
    })
    it("handles undefined parameters", async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      request.lseId = undefined;
      request.masterTariffId = undefined;
      request.customerClasses = undefined;
      request.tariffTypes = undefined;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it("handles both pagination", async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      request.lseId = 1;
      request.pageCount = 22;
      request.pageStart = 33;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('lseId=1&pageStart=33&pageCount=22');
    })
    it("handles both pagination via constructor", async () => {
      const request: GetTariffsRequest = new GetTariffsRequest({
        pageCount: 22,
        pageStart: 33
      });
      request.lseId = 1;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('lseId=1&pageStart=33&pageCount=22');
    })
  })
});

describe("Tariff api", () => {
  describe("get one endpoint", () => {
    it("returns the tariff", async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      const response: PagedResponse<Tariff> = await restClient.getTariffs(request);
      const { masterTariffId } = response.results[0];
      const tariff: Tariff = await restClient.getTariff(masterTariffId);
      expect(tariff.masterTariffId).toEqual(masterTariffId);
    })
  })
  describe("get n endpoint", () => {
    it("returns a list of tariffs", async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      const response: PagedResponse<Tariff> = await restClient.getTariffs(request);
      expect(response.status).toEqual("success");
      expect(response.type).toEqual(ResourceTypes.TARIFF);
      expect(response.count).toBeGreaterThan(200);
      expect(response.results).toHaveLength(25);
      for(const tariff of response.results) {
        expect(isTariff(tariff)).toBeTruthy();
      }
    })
  })
});