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
    const masterTariffId = 522;
    const request: GetCalculatedCostRequest = new GetCalculatedCostRequest();
    request.fromDateTime = '2019-07-13T00:00:00-07:00';
    request.toDateTime = '2020-05-11T00:00:00-07:00';
    request.masterTariffId = masterTariffId;
    const propertyData: PropertyData = JSON.parse('{"keyName": "baselineType", "dataValue": "typicalElectricity"}');
    request.propertyInputs = [propertyData];
    const response: CalculatedCost = await restClient.runCalculation(request);
    expect(isCalculatedCost(response)).toBeTruthy();
  })
});