import {
  CalculatedCostApi,
  GetCalculatedCostRequest
} from './on-demand-cost-calculation-api';
import { TariffApi, GetTariffsRequest } from './tariff-api'
import { PagedResponse } from '../rest-client'
import {
  isCalculatedCost,
  CalculatedCost,
} from '../types/on-demand-cost-calculation';
import {
  Tariff
} from '../types/tariff';
import { credentialsFromFile } from '../rest-client/credentials';
import {
  PropertyData
} from '../types/on-demand-cost-calculation';

const credentials = credentialsFromFile('unitTest');
const restClient = new CalculatedCostApi(credentials);
const tariffRestClient = new TariffApi(credentials);

describe("CalculatedCost api", () => {
  it("should return calculated cost", async () => {
    const tariffRequest: GetTariffsRequest = new GetTariffsRequest();
    const tariffResponse: PagedResponse<Tariff> = await tariffRestClient.getTariffs(tariffRequest);
    const { masterTariffId } = tariffResponse.results[0];
    const request: GetCalculatedCostRequest = new GetCalculatedCostRequest();
    request.fromDateTime = '2019-07-13T00:00:00-07:00';
    request.toDateTime = '2020-05-11T00:00:00-07:00';
    request.masterTariffId = masterTariffId;
    request.propertyInputs = [];
    const response: CalculatedCost = await restClient.runCalculation(request);
    expect(isCalculatedCost(response)).toBeTruthy();
  })

  it("should return calculated cost for property inputs", async () => {
    const tariffRequest: GetTariffsRequest = new GetTariffsRequest();
    const tariffResponse: PagedResponse<Tariff> = await tariffRestClient.getTariffs(tariffRequest);
    const { masterTariffId } = tariffResponse.results[0];
    const request: GetCalculatedCostRequest = new GetCalculatedCostRequest();
    request.fromDateTime = '2019-07-13T00:00:00-07:00';
    request.toDateTime = '2020-05-11T00:00:00-07:00';
    request.masterTariffId = masterTariffId;
    const propertyData: PropertyData = JSON.parse('{"keyName": "baselineType", "dataValue": "typicalElectricity"}');
    request.propertyInputs = [propertyData];
    const response: CalculatedCost = await restClient.runCalculation(request);
    expect(request.propertyInputs).toEqual([propertyData]);
    expect(isCalculatedCost(response)).toBeTruthy();
  })

  it("initializes the property inputs correctly if they haven't been initialized before the call", async () => {
    const tariffRequest: GetTariffsRequest = new GetTariffsRequest();
    const tariffResponse: PagedResponse<Tariff> = await tariffRestClient.getTariffs(tariffRequest);
    const { masterTariffId } = tariffResponse.results[0];
    const request: GetCalculatedCostRequest = new GetCalculatedCostRequest();
    request.fromDateTime = '2019-07-13T00:00:00-07:00';
    request.toDateTime = '2020-05-11T00:00:00-07:00';
    request.masterTariffId = masterTariffId;
    expect(request.propertyInputs).toBe(undefined);
    const response: CalculatedCost = await restClient.runCalculation(request);
    const propertyInputs = [
      {
        keyName : "baselineType",
        dataValue : "typicalElectricity",
        operator : "+",
        dataFactor : 1
      },{
        keyName : "buildingId",
        dataValue : "RESIDENTIAL"
      }
    ];
    expect(request.propertyInputs).toEqual(propertyInputs);
    expect(isCalculatedCost(response)).toBeTruthy();
  })

  it("if useTypicalElectricity called multiple times, does not add the inputs multiple times.", async () => {
    const tariffRequest: GetTariffsRequest = new GetTariffsRequest();
    const tariffResponse: PagedResponse<Tariff> = await tariffRestClient.getTariffs(tariffRequest);
    const { masterTariffId } = tariffResponse.results[0];
    const request: GetCalculatedCostRequest = new GetCalculatedCostRequest();
    request.fromDateTime = '2019-07-13T00:00:00-07:00';
    request.toDateTime = '2020-05-11T00:00:00-07:00';
    request.masterTariffId = masterTariffId;
    request.useTypicalElectricity("SMALL_COMMERCIAL", 2);
    request.useTypicalElectricity("LARGE_COMMERCIAL", 3);
    const propertyInputs = [
      {
        keyName : "baselineType",
        dataValue : "typicalElectricity",
        operator : "+",
        dataFactor : 2
      },{
        keyName : "buildingId",
        dataValue : "SMALL_COMMERCIAL"
      }
    ];
    expect(request.propertyInputs).toEqual(propertyInputs);
    const response: CalculatedCost = await restClient.runCalculation(request);
    expect(request.propertyInputs).toEqual(propertyInputs);
    expect(isCalculatedCost(response)).toBeTruthy();
  })
});