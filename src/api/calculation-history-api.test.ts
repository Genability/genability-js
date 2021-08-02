import {
  CalculatedCostApi, GetCalculatedCostRequest,
  GetMassCalculationRequest
} from './on-demand-cost-calculation-api';
import {GetTariffsRequest, TariffApi} from './tariff-api'
import {CalculationHistoryApi} from './calculation-history-api';
import { credentialsFromFile } from '../rest-client/credentials';
import { SingleResponse, PagedResponse } from "../rest-client";
import {
  CalculatedCost,
  CalculatedCostRequest, isCalculatedCost, isCalculatedCostRequest, isMassCalculation, isMassCalculationRequest,
} from "../types/on-demand-cost-calculation";
import {Tariff} from "../types";


const credentials = credentialsFromFile('unitTest');
const calculatedCostRestClient: CalculatedCostApi = new CalculatedCostApi(credentials);
const tariffRestClient: TariffApi = new TariffApi(credentials);
const restClient: CalculationHistoryApi = new CalculationHistoryApi(credentials);

describe("Calculation history api", () => {
  it("should return calculated history response", async () => {
    const tariffRequest: GetTariffsRequest = new GetTariffsRequest();
    const tariffResponse: PagedResponse<Tariff> = await tariffRestClient.getTariffs(tariffRequest);
    const { masterTariffId } = tariffResponse.results[0];
    const request: GetCalculatedCostRequest = new GetCalculatedCostRequest();
    request.fromDateTime = '2019-07-13T00:00:00-07:00';
    request.toDateTime = '2020-05-11T00:00:00-07:00';
    request.masterTariffId = masterTariffId;
    request.propertyInputs = [];
    const calcResponse: SingleResponse<CalculatedCost> = await calculatedCostRestClient.runCalculation(request);
    if(calcResponse.requestId == null) fail(`requestId null`);
    if(calcResponse.result == null) fail(`calcResponse.result null`);
    const requestId: string = calcResponse.requestId;
    // timeout to wait for the calc response to populate
    await new Promise(r => setTimeout(r, 5000));
    const response: CalculatedCost = await restClient.getCalculateHistoryResponse(requestId);
    expect(response.calculatedCostId).toEqual(calcResponse.result.calculatedCostId);
    expect(isCalculatedCost(response)).toBeTruthy();
  }, 40000);
  it("should return calculated history request", async () => {
    const tariffRequest: GetTariffsRequest = new GetTariffsRequest();
    const tariffResponse: PagedResponse<Tariff> = await tariffRestClient.getTariffs(tariffRequest);
    const { masterTariffId } = tariffResponse.results[0];
    const request: GetCalculatedCostRequest = new GetCalculatedCostRequest();
    request.fromDateTime = '2019-07-13T00:00:00-07:00';
    request.toDateTime = '2020-05-11T00:00:00-07:00';
    request.masterTariffId = masterTariffId;
    request.propertyInputs = [];
    const calcResponse: SingleResponse<CalculatedCost> = await calculatedCostRestClient.runCalculation(request);
    if(calcResponse.requestId == null) fail(`requestId null`);
    const requestId = calcResponse.requestId;
    // timeout to wait for the calc request to populate
    await new Promise(r => setTimeout(r, 5000));
    const response: CalculatedCostRequest = await restClient.getCalculateHistoryRequest(requestId);
    expect(response.masterTariffId).toEqual(masterTariffId);
    expect(response.requestId).toEqual(requestId);
    expect(isCalculatedCostRequest(response)).toBeTruthy();
  }, 40000);
  it("should return calculated history request and response", async () => {
    const tariffRequest: GetTariffsRequest = new GetTariffsRequest();
    const tariffResponse: PagedResponse<Tariff> = await tariffRestClient.getTariffs(tariffRequest);
    const { masterTariffId } = tariffResponse.results[0];
    const request: GetCalculatedCostRequest = new GetCalculatedCostRequest();
    request.fromDateTime = '2019-07-13T00:00:00-07:00';
    request.toDateTime = '2020-05-11T00:00:00-07:00';
    request.masterTariffId = masterTariffId;
    request.propertyInputs = [];
    const calcResponse: SingleResponse<CalculatedCost> = await calculatedCostRestClient.runCalculation(request);
    if(calcResponse.requestId == null) fail(`requestId null`);
    if(calcResponse.result == null) fail(`calcResponse.result null`);
    const requestId = calcResponse.requestId;
    // timeout to wait for the calc request to populate
    await new Promise(r => setTimeout(r, 5000));
    const requestResponse: CalculatedCostRequest = await restClient.getCalculateHistoryRequest(requestId);
    expect(requestResponse.masterTariffId).toEqual(masterTariffId);
    expect(requestResponse.requestId).toEqual(requestId);
    expect(isCalculatedCostRequest(requestResponse)).toBeTruthy();
    const response: CalculatedCost = await restClient.getCalculateHistoryResponse(requestId);
    expect(response.calculatedCostId).toEqual(calcResponse.result.calculatedCostId);
    expect(isCalculatedCost(response)).toBeTruthy();
  }, 40000);
  it("should return mass calc history response", async () => {
    const request: GetMassCalculationRequest = new GetMassCalculationRequest();
    request.fromDateTime = '2016-07-13T00:00:00-07:00';
    request.toDateTime = '2016-08-11T00:00:00-07:00';
    request.scenarios = JSON.parse('[{"scenarioName": "E-1", "masterTariffId": "522"}]')
    const calcResponse: SingleResponse<CalculatedCost> = await calculatedCostRestClient.runMassCalculation(request);
    if(calcResponse.requestId == null) fail(`requestId null`);
    if(calcResponse.result == null) fail(`calcResponse.result null`);
    const requestId = calcResponse.requestId;
    // timeout to wait for the calc response to populate
    await new Promise(r => setTimeout(r, 5000));
    const response: CalculatedCost = await restClient.getCalculateHistoryResponse(requestId);
    expect(response.calculatedCostId).toEqual(calcResponse.result.calculatedCostId);
    expect(isMassCalculation(response)).toBeTruthy();
  }, 40000);
  it("should return mass calc history request", async () => {
    const request: GetMassCalculationRequest = new GetMassCalculationRequest();
    request.fromDateTime = '2016-07-13T00:00:00-07:00';
    request.toDateTime = '2016-08-11T00:00:00-07:00';
    request.scenarios = JSON.parse('[{"scenarioName": "E-1", "masterTariffId": "522"}]');
    const calcResponse: SingleResponse<CalculatedCost> = await calculatedCostRestClient.runMassCalculation(request);
    if(calcResponse.requestId == null) fail(`requestId null`);
    const requestId = calcResponse.requestId;
    // timeout to wait for the calc request to populate
    await new Promise(r => setTimeout(r, 5000));
    const response: CalculatedCostRequest = await restClient.getCalculateHistoryRequest(requestId);
    expect(response.type).toEqual('CalculationRequest');
    expect(response.requestId).toEqual(requestId);
    expect(isMassCalculationRequest(response)).toBeTruthy();
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

