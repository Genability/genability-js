import {
  CalculatedCostApi,
  GetCalculatedCostRequest,
  GetMassCalculationRequest,
} from './on-demand-cost-calculation-api';
import { TariffApi, GetTariffsRequest } from './tariff-api'
import { PagedResponse } from '../rest-client'
import {
  isCalculatedCost,
  CalculatedCost,
  MassCalculation,
  isMassCalculation,
} from '../types/on-demand-cost-calculation';
import {
  Tariff
} from '../types/tariff';
import { credentialsFromFile } from '../rest-client/credentials';

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
  }, 10000)

  it("should return calculated cost for property inputs", async () => {
    const tariffRequest: GetTariffsRequest = new GetTariffsRequest();
    const tariffResponse: PagedResponse<Tariff> = await tariffRestClient.getTariffs(tariffRequest);
    const { masterTariffId } = tariffResponse.results[0];
    const request: GetCalculatedCostRequest = new GetCalculatedCostRequest();
    request.fromDateTime = '2019-07-13T00:00:00-07:00';
    request.toDateTime = '2020-05-11T00:00:00-07:00';
    request.masterTariffId = masterTariffId;
    const propertyData = JSON.parse('[{"keyName": "baselineType", "dataValue": "typicalElectricity"},{"keyName": "isSmartRateCustomer", "dataValue": true}]');
    request.propertyInputs = propertyData;
    request.useTypicalElectricity("SMALL_COMMERCIAL", 2);
    const response: CalculatedCost = await restClient.runCalculation(request);
    expect(isCalculatedCost(response)).toBeTruthy();
  }, 10000);

  it("should return calculated cost for property inputs when dataSeriesAttributes is present", async () => {
    const tariffRequest: GetTariffsRequest = new GetTariffsRequest();
    const tariffResponse: PagedResponse<Tariff> = await tariffRestClient.getTariffs(tariffRequest);
    const { masterTariffId } = tariffResponse.results[0];
    const request: GetCalculatedCostRequest = new GetCalculatedCostRequest();
    request.fromDateTime = '2019-07-13T00:00:00-07:00';
    request.toDateTime = '2020-05-11T00:00:00-07:00';
    request.masterTariffId = masterTariffId;
    const propertyData = JSON.parse('[{"keyName": "baselineType", "dataValue": "typicalElectricity", "dataSeriesAttributes": ["FIXED_NOT_DST","MISSING_DST_PRORATE"]}]');
    request.propertyInputs = propertyData;
    const response: CalculatedCost = await restClient.runCalculation(request);
    expect(isCalculatedCost(response)).toBeTruthy();
  }, 10000);

  it("should return mass calculation", async () => {
    const request: GetMassCalculationRequest = new GetMassCalculationRequest();
    request.fromDateTime = '2016-07-13T00:00:00-07:00';
    request.toDateTime = '2016-08-11T00:00:00-07:00';
    request.scenarios = JSON.parse('[{"scenarioName": "E-1", "masterTariffId": "522"}, {"scenarioName": "E-6-TOU", "masterTariffId": "525"}, {"scenarioName": "E-6-TOU-SmartRate", "masterTariffId": "525", "propertyInputs": [{"keyName": "isSmartRateCustomer", "dataValue": "true"}]}]')
    const response: MassCalculation = await restClient.runMassCalculation(request);
    expect(isMassCalculation(response)).toBeTruthy();
  }, 10000)

  it("should return mass calculation for sharedScenario", async () => {
    const request: GetMassCalculationRequest = new GetMassCalculationRequest();
    request.fromDateTime = '2016-07-13T00:00:00-07:00';
    request.toDateTime = '2016-08-11T00:00:00-07:00';
    request.scenarios = JSON.parse('[{"scenarioName": "E-1", "masterTariffId": "522"}, {"scenarioName": "E-6-TOU", "masterTariffId": "525"}, {"scenarioName": "E-6-TOU-SmartRate", "masterTariffId": "525", "propertyInputs": [{"keyName": "isSmartRateCustomer", "dataValue": "true"}]}]')
    request.sharedScenario = JSON.parse('{"scenarioName": "E-1", "masterTariffId": "522"}')
    const response: MassCalculation = await restClient.runMassCalculation(request);
    expect(isMassCalculation(response)).toBeTruthy();
  }, 10000)

  it("should return mass calculation for sharedScenario when propertyInputs is set", async () => {
    const request: GetMassCalculationRequest = new GetMassCalculationRequest();
    request.fromDateTime = '2016-07-13T00:00:00-07:00';
    request.toDateTime = '2016-08-11T00:00:00-07:00';
    request.scenarios = JSON.parse('[{"scenarioName": "E-1", "masterTariffId": "522"}, {"scenarioName": "E-6-TOU", "masterTariffId": "525"}, {"scenarioName": "E-6-TOU-SmartRate", "masterTariffId": "525", "propertyInputs": [{"keyName": "isSmartRateCustomer", "dataValue": "true"}]}]')
    request.sharedScenario = JSON.parse('{"propertyInputs": [{"keyName": "consumption","dataValue": 1000}]}')
    const response: MassCalculation = await restClient.runMassCalculation(request);
    expect(isMassCalculation(response)).toBeTruthy();
  }, 10000)

  it("should return mass calculation for sharedScenario when propertyInputs is set", async () => {
    const request: GetMassCalculationRequest = new GetMassCalculationRequest();
    request.fromDateTime = '2016-07-13T00:00:00-07:00';
    request.toDateTime = '2016-08-11T00:00:00-07:00';
    request.scenarios = JSON.parse('[{"scenarioName": "E-1", "masterTariffId": "522"}, {"scenarioName": "E-6-TOU", "masterTariffId": "525"}, {"scenarioName": "E-6-TOU-SmartRate", "masterTariffId": "525", "propertyInputs": [{"keyName": "isSmartRateCustomer", "dataValue": "true"}]}]')
    request.sharedScenario = JSON.parse('{"propertyInputs": [{"keyName": "consumption","dataValue": 1000}]}')
    const response: MassCalculation = await restClient.runMassCalculation(request);
    expect(isMassCalculation(response)).toBeTruthy();
  }, 10000)

  it("should return mass calculation for sharedScenario when expected is set", async () => {
    const request: GetMassCalculationRequest = new GetMassCalculationRequest();
    request.fromDateTime = '2016-07-13T00:00:00-07:00';
    request.toDateTime = '2016-08-11T00:00:00-07:00';
    request.scenarios = JSON.parse('[{"scenarioName": "E-1", "masterTariffId": "522"}, {"scenarioName": "E-6-TOU", "masterTariffId": "525"}, {"scenarioName": "E-6-TOU-SmartRate", "masterTariffId": "525", "propertyInputs": [{"keyName": "isSmartRateCustomer", "dataValue": "true"}]}]')
    request.sharedScenario = JSON.parse('{"expected": {"totalCost": 170.20,"adjustedTotalCost": 170.18,"kWh": 1266.48}}')
    const response: MassCalculation = await restClient.runMassCalculation(request);
    expect(isMassCalculation(response)).toBeTruthy();
  }, 10000)
});

describe("test useTypicalElectricity", () => {
  it("should add propertyinputs when no other inputs on the list", async () => {
    const request: GetCalculatedCostRequest = new GetCalculatedCostRequest();
    request.useTypicalElectricity("SMALL_COMMERCIAL", 2);
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
  })

  it("should add baselineType and buildingId inputs when other different inputs are on the list already", async () => {
    const request: GetCalculatedCostRequest = new GetCalculatedCostRequest();
    const propertyData = JSON.parse('[{"keyName": "isSmartRateCustomer", "dataValue": true}]');
    request.propertyInputs = propertyData;
    request.useTypicalElectricity("SMALL_COMMERCIAL", 2);
    const propertyInputs = [
      {
        keyName: "isSmartRateCustomer",
        dataValue: true
      },
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
  });
  
  it("should not add buildingId input when same dataValue is present already", async () => {
    const request: GetCalculatedCostRequest = new GetCalculatedCostRequest();
    const propertyData = JSON.parse('[{"keyName": "baselineType", "dataValue": "typicalElectricity", "operator": "+", "dataFactor": 1},{"keyName": "buildingId", "dataValue": "SMALL_COMMERCIAL"}]');
    request.propertyInputs = propertyData;
    request.useTypicalElectricity("SMALL_COMMERCIAL", 3);
    const propertyInputs = [
      {
        keyName : "baselineType",
        dataValue : "typicalElectricity",
        operator : "+",
        dataFactor : 3
      },{
        keyName : "buildingId",
        dataValue : "SMALL_COMMERCIAL"
      }
    ];
    expect(request.propertyInputs).toEqual(propertyInputs);
  });

  it("should update the dataFactor from the lastest call", async () => {
    const request: GetCalculatedCostRequest = new GetCalculatedCostRequest();
    const propertyData = JSON.parse('[{"keyName": "baselineType", "dataValue": "typicalElectricity", "operator": "+", "dataFactor": 1},{"keyName": "buildingId", "dataValue": "SMALL_COMMERCIAL"}]');
    request.propertyInputs = propertyData;
    request.useTypicalElectricity("SMALL_COMMERCIAL", 3);
    const propertyInputs = [
      {
        keyName : "baselineType",
        dataValue : "typicalElectricity",
        operator : "+",
        dataFactor : 3
      },{
        keyName : "buildingId",
        dataValue : "SMALL_COMMERCIAL"
      }
    ];
    expect(request.propertyInputs).toEqual(propertyInputs);
  });

  it("should add buildingId input when different dataValue is provided", async () => {
    const request: GetCalculatedCostRequest = new GetCalculatedCostRequest();
    const propertyData = JSON.parse('[{"keyName": "baselineType", "dataValue": "typicalElectricity", "operator": "+", "dataFactor": 1},{"keyName": "buildingId", "dataValue": "SMALL_COMMERCIAL"}]');
    request.propertyInputs = propertyData;
    request.useTypicalElectricity("RESIDENTIAL", 3);
    const propertyInputs = [
      {
        keyName : "baselineType",
        dataValue : "typicalElectricity",
        operator : "+",
        dataFactor : 3
      },{
        keyName : "buildingId",
        dataValue : "SMALL_COMMERCIAL"
      },{
        keyName : "buildingId",
        dataValue : "RESIDENTIAL"
      }
    ];
    expect(request.propertyInputs).toEqual(propertyInputs);
  });
});

