import {
  CalculatedCostApi,
  GetCalculatedCostRequest
} from './on-demand-cost-calculation-api';
import { TariffApi, GetTariffsRequest } from './tariff-api'
import { PagedResponse } from '../rest-client'
import {
  ResourceTypes,
  isCalculatedCost,
  CalculatedCost,
  Tariff
} from '../types';
import { credentialsFromFile } from '../rest-client/credentials';

const credentials = credentialsFromFile('unitTest');
const restClient = new CalculatedCostApi(credentials);
const tariffRestClient = new TariffApi(credentials);

describe("CalculatedCost api", () => {
  it("should returns calculated cost", async () => {
    const tariffRequest: GetTariffsRequest = new GetTariffsRequest();
    const tariffResponse: PagedResponse<Tariff> = await tariffRestClient.getTariffs(tariffRequest);
    const { masterTariffId } = tariffResponse.results[0];
    const request: GetCalculatedCostRequest = new GetCalculatedCostRequest();
    request.fromDateTime = '2019-07-13T00:00:00-07:00';
    request.toDateTime = '2020-05-11T00:00:00-07:00';
    request.masterTariffId = masterTariffId;
    request.propertyInputs = [];
    const response: PagedResponse<CalculatedCost> = await restClient.getCalculatedCosts(request);
    expect(response.status).toEqual("success");
    expect(response.type).toEqual(ResourceTypes.CALCULATED_COST);
    for(const cc of response.results) {
      expect(isCalculatedCost(cc)).toBeTruthy();
    }
  })
});