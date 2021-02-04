import {
  CalculatedCostApi,
  GetCalculatedCostRequest
} from './on-demand-cost-calculation-api';
import { TariffApi, GetTariffsRequest } from './tariff-api'
import { PagedResponse } from '../rest-client'
import {
  CalculatedCost,
  isCalculatedCost
} from '../types';
import {
  Tariff
} from '../types';
import { CalculationHistoryApi } from './calculation-history-api';
import { credentialsFromFile } from '../rest-client/credentials';
import { GenabilityConfig } from "../rest-client";


const credentials = credentialsFromFile('unitTest');
let calculatedCostRestClient: CalculatedCostApi;
let tariffRestClient: TariffApi;
let restClient: CalculationHistoryApi;

describe("Calculation history api", () => {
  beforeAll(() => {
    GenabilityConfig.__deconfigure();
    // For now we are using the dev server for calculation. To be removed in future when api
    // moves to production server
    GenabilityConfig.config({proxy:'http://api-dev.genability.com'});
    calculatedCostRestClient = new CalculatedCostApi(credentials);
    tariffRestClient = new TariffApi(credentials);
    restClient = new CalculationHistoryApi(credentials);
  });
  afterAll(() => {
    GenabilityConfig.__deconfigure();
  });
  it("should return calculated history responses", async () => {
    const tariffRequest: GetTariffsRequest = new GetTariffsRequest();
    const tariffResponse: PagedResponse<Tariff> = await tariffRestClient.getTariffs(tariffRequest);
    const { masterTariffId } = tariffResponse.results[0];
    const request: GetCalculatedCostRequest = new GetCalculatedCostRequest();
    request.fromDateTime = '2019-07-13T00:00:00-07:00';
    request.toDateTime = '2020-05-11T00:00:00-07:00';
    request.masterTariffId = masterTariffId;
    request.propertyInputs = [];
    const calculatedCost: CalculatedCost = await calculatedCostRestClient.runCalculation(request);
    console.log('calculated cost' + calculatedCost.requestId);
    const requestId = calculatedCost.requestId;
    // timeout to wait for the calc response to populate
    await new Promise(r => setTimeout(r, 5000));
    const response: CalculatedCost = await restClient.getCalculateHistoryResponse(requestId);
    expect(isCalculatedCost(response)).toBeTruthy();
  }, 40000);
  it("should return calculated history requests", async () => {
    const tariffRequest: GetTariffsRequest = new GetTariffsRequest();
    const tariffResponse: PagedResponse<Tariff> = await tariffRestClient.getTariffs(tariffRequest);
    const { masterTariffId } = tariffResponse.results[0];
    const request: GetCalculatedCostRequest = new GetCalculatedCostRequest();
    request.fromDateTime = '2019-07-13T00:00:00-07:00';
    request.toDateTime = '2020-05-11T00:00:00-07:00';
    request.masterTariffId = masterTariffId;
    request.propertyInputs = [];
    const calculatedCost: CalculatedCost = await calculatedCostRestClient.runCalculation(request);
    const requestId = calculatedCost.requestId;
    // timeout to wait for the calc request to populate
    await new Promise(r => setTimeout(r, 5000));
    const response: GetCalculatedCostRequest = await restClient.getCalculateHistoryRequest(requestId);
    expect(response.masterTariffId).toEqual(masterTariffId);
  }, 40000);
  it("calculateHistoryRequest should return an error due to bad request ID", async () => {
    try {
      await restClient.getCalculateHistoryRequest('badRequestId');
      fail('Request succeeded incorrectly');
    } catch (err) {
      expect(err.message).toEqual('Request failed with status code 404');
    }
  }, 40000);
  it("calculateHistoryResponse should return an error due to bad request ID", async () => {
    try {
      await restClient.getCalculateHistoryResponse('badRequestId');
      fail('Request succeeded incorrectly');
    } catch (err) {
      expect(err.message).toEqual('Request failed with status code 404');
    }
  }, 40000);
});

