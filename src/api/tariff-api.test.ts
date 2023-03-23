import { 
  TariffApi,
  GetTariffsRequest,
  GetTariffRequest
} from './tariff-api';
import { SingleResponse, PagedResponse, GenabilityConfig } from '../rest-client'
import {
  TariffType,
  CustomerClass,
  ChargeType,
  Tariff,
  isTariff,
  isTariffDocument
} from '../types/tariff';
import { ResourceTypes } from '../types/resource-types';
import { ServiceType } from '../types/load-serving-entity';
import { PrivacyFlag } from '../types/property-key';
import { Fields } from '../rest-client/contract';


jest.setTimeout(20000);
describe('GetTariffs request', () => {
  describe('call to queryStringify', () => {
    it('handles no parameters', async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it('handles lseId parameter', async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      request.lseId = 1;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('lseId=1');
    })
    it('handles several parameters', async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      request.masterTariffId = 2;
      request.effectiveOn = '2020-05-19';
      request.tariffTypes = [TariffType.ALTERNATIVE,TariffType.DEFAULT];
      const qs: string = request.queryStringify();
      expect(qs).toEqual('masterTariffId=2&effectiveOn=2020-05-19&tariffTypes=ALTERNATIVE,DEFAULT');
    })
    it('handles array type parameters', async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      request.lseId = 1;
      request.masterTariffId = 2;
      request.effectiveOn = '2020-05-19';
      request.customerClasses = [CustomerClass.GENERAL,CustomerClass.PROPOSED];
      request.serviceTypes = [ServiceType.ELECTRICITY]
      request.tariffTypes = [TariffType.ALTERNATIVE,TariffType.DEFAULT];
      request.chargeTypes = [ChargeType.CONSUMPTION_BASED,ChargeType.DEMAND_BASED];
      const qs: string = request.queryStringify();
      expect(qs).toEqual('lseId=1&masterTariffId=2&effectiveOn=2020-05-19&customerClasses=GENERAL,PROPOSED&serviceTypes=ELECTRICITY&tariffTypes=ALTERNATIVE,DEFAULT&chargeTypes=CONSUMPTION_BASED,DEMAND_BASED');
    })
    it('handles some other parameters', async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      request.lseId = 1;
      request.masterTariffId = 2;
      request.privacyFlags = [PrivacyFlag.PRIVATE, PrivacyFlag.PUBLIC];
      request.populateRates = false;
      request.demand = 1;
      request.filterRiderRates = false;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('lseId=1&masterTariffId=2&privacyFlags=PRIVATE,PUBLIC&populateRates=false&demand=1&filterRiderRates=false');
    })
    it('handles undefined parameters', async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      request.lseId = undefined;
      request.masterTariffId = undefined;
      request.customerClasses = undefined;
      request.tariffTypes = undefined;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it('handles both pagination', async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      request.lseId = 1;
      request.pageCount = 22;
      request.pageStart = 33;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('lseId=1&pageStart=33&pageCount=22');
    })
    it('handles both pagination via constructor', async () => {
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

describe('Tariff api', async () => {
  let config = new GenabilityConfig({profileName:'unitTest'});
  let restClient: TariffApi;
  beforeAll(async () => {
    if (config.useCredentialsFromFile) {
      const configFromFile = await config.getCredentialsFromFile();
      config = configFromFile || config;
    }
    restClient = new TariffApi(config);
  });
  describe('get one endpoint', () => {
    it('returns a tariff', async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      const assignResponse: PagedResponse<Tariff> = await restClient.getTariffs(request);
      const { masterTariffId } = assignResponse.results[0];
      const response: SingleResponse<Tariff> = await restClient.getTariff(masterTariffId);
      expect(response.result).toBeTruthy();
      expect(response.errors).toBeUndefined();
      if(response.result == null) fail('response.result null');
      expect(response.result.masterTariffId).toEqual(masterTariffId);
    })
    it('returns a tariff with TariffDocument populated if populateDocuments true', async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      request.populateDocuments = true;
      const assignResponse: PagedResponse<Tariff> = await restClient.getTariffs(request);
      const { masterTariffId } = assignResponse.results[0];
      const response: SingleResponse<Tariff> = await restClient.getTariff(masterTariffId, request);
      expect(response.result).toBeTruthy();
      expect(response.errors).toBeUndefined();
      if(response.result == null) fail('response.result null');
      expect(response.result.masterTariffId).toEqual(masterTariffId);
      expect(response.result.documents).toBeDefined();
      if(response.result.documents == null) fail('response.result does not contain documents');
      expect(isTariffDocument(response.result.documents[0])).toEqual(true)
    })
    it('returns a tariff with rates and properties', async () => {
      const masterTariffId = 522;
      const tariffRequest: GetTariffRequest = new GetTariffRequest();
      tariffRequest.populateProperties = true;
      tariffRequest.populateRates = true;
      tariffRequest.fields = Fields.EXTENDED;
      const response: SingleResponse<Tariff> = await restClient.getTariff(masterTariffId, tariffRequest);
      expect(response.result).toBeTruthy();
      expect(response.errors).toBeUndefined();
      if(response.result == null) fail('response.result null');
      expect(isTariff(response.result)).toEqual(true);
      const tariff: Tariff = response.result;
      expect(tariff.masterTariffId).toEqual(masterTariffId);
      expect(tariff.rates).toEqual(expect.any(Array));
      expect(tariff.rates?.length).toBeGreaterThan(0);
      expect(tariff.properties).toEqual(expect.any(Array));
      expect(tariff).toHaveProperty('closedDate');
      if(tariff.rates) {
        for(const tariffRate of tariff.rates) {
          if(tariffRate.chargeClass) {
            expect(tariffRate.chargeClass).toBeInstanceOf(Array);
          }
        }
      } else {
        fail('no rates');
      }
    })
    it('returns the tariff history', async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      request.serviceTypes = [ServiceType.ELECTRICITY]
      const assignResponse: PagedResponse<Tariff> = await restClient.getTariffs(request);
      const { masterTariffId } = assignResponse.results[0];
      const response: SingleResponse<Tariff> = await restClient.getTariffHistory(masterTariffId);
      expect(response.result).toBeTruthy();
      expect(response.errors).toBeUndefined();
      expect(response.result && response.result.masterTariffId).toEqual(masterTariffId);
    })
  })
  describe('get n endpoint', () => {
    it('returns a list of tariffs', async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      const response: PagedResponse<Tariff> = await restClient.getTariffs(request);
      expect(response.status).toEqual('success');
      expect(response.type).toEqual(ResourceTypes.TARIFF);
      expect(response.count).toBeGreaterThan(200);
      expect(response.results).toHaveLength(25);
      for(const tariff of response.results) {
        expect(isTariff(tariff)).toBeTruthy();
      }
    })
    it('returns a list of tariffs with documents if populateDocuments true', async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      request.populateDocuments = true;
      const response: PagedResponse<Tariff> = await restClient.getTariffs(request);
      expect(response.status).toEqual('success');
      expect(response.type).toEqual(ResourceTypes.TARIFF);
      expect(response.count).toBeGreaterThan(200);
      expect(response.results).toHaveLength(25);
      for(const tariff of response.results) {
        expect(isTariff(tariff)).toBeTruthy();
        expect(tariff.documents).toBeDefined();
        if(tariff.documents) {
          expect(isTariffDocument(tariff.documents[0])).toBeTruthy();
        } else {
          fail('no documents');
        }
      }
    })
    it('returns a list of tariffs with rates and properties', async () => {
      const request: GetTariffsRequest = new GetTariffsRequest();
      request.masterTariffId = 522;
      request.populateProperties = true;
      request.populateRates = true;
      request.fields = Fields.EXTENDED;

      const response: PagedResponse<Tariff> = await restClient.getTariffs(request);
      expect(response.status).toEqual('success');
      expect(response.type).toEqual(ResourceTypes.TARIFF);
      expect(response.count).toBeGreaterThan(40); // as of 2021-03-29, mtid: 522 has a count of 42
      expect(response.results).toHaveLength(25);
      for(const tariff of response.results) {
        expect(isTariff(tariff)).toBeTruthy();
        if(tariff.rates) {
          for(const tariffRate of tariff.rates) {
            if(tariffRate.chargeClass) {
              expect(tariffRate.chargeClass).toBeInstanceOf(Array);
            }
          }
        }
      }
    })
  })
});