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

