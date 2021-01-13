import { 
  GetMassCalculationRequest,
  MassCalculationApi,
} from './mass-calculation-api';
import {
  MassCalculation,
  isMassCalculation,
} from '../types/mass-calculation';
import { credentialsFromFile } from '../rest-client/credentials';

const credentials = credentialsFromFile('unitTest');
const restClient = new MassCalculationApi(credentials);

describe("MassCalculation api", () => {
  it("should return mass calculation", async () => {
    const request: GetMassCalculationRequest = new GetMassCalculationRequest();
    request.fromDateTime = '2016-07-13T00:00:00-07:00';
    request.toDateTime = '2016-08-11T00:00:00-07:00';
    request.scenarios = JSON.parse('[{"scenarioName": "E-1", "masterTariffId": "522"}, {"scenarioName": "E-6-TOU", "masterTariffId": "525"}, {"scenarioName": "E-6-TOU-SmartRate", "masterTariffId": "525", "propertyInputs": [{"keyName": "isSmartRateCustomer", "dataValue": "true"}]}]')
    const response: MassCalculation = await restClient.runMassCalculation(request);
    expect(isMassCalculation(response)).toBeTruthy();
  }, 10000)
});
