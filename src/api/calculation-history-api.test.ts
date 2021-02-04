import {
  CalculatedCostApi,
  GetCalculatedCostRequest
} from './on-demand-cost-calculation-api';
import { TariffApi, GetTariffsRequest } from './tariff-api'
import { PagedResponse } from '../rest-client'
import {
  CalculatedCost,
  isCalculatedCost
} from '../types/on-demand-cost-calculation';
import {
  Tariff
} from '../types/tariff';
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
    const requestId = calculatedCost.requestId;
    const response: CalculatedCost = await restClient.calculateHistoryResponses(requestId);
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
    const response: GetCalculatedCostRequest = await restClient.calculateHistoryRequests(requestId);
    expect(response.masterTariffId).toEqual(masterTariffId);
  }, 40000);
});

