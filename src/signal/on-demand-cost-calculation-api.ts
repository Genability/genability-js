/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {
  RestApiClient,
  RestApiCredentials,
  GenabilityConfig,
} from '../rest-client';

import {
  Map,
  GroupBy,
  DetailLevel,
  PropertyData,
  CalculatedCost,
  Address
} from '../types/on-demand-cost-calculation';

import { TariffRate, ChargeClass } from '../types/tariff';

export class GetCalculatedCostRequest {
  public masterTariffId!: number;
  public fromDateTime!: string;
  public toDateTime!: string;
  public propertyInputs?: PropertyData[];
  public expected?: Map;
  public billingPeriod?: boolean;
  public detailLevel?: DetailLevel;
  public groupBy?: GroupBy;
  public minimums?: boolean;
  public excludeChargeClass?: ChargeClass[];
  public applyUtilityTax?: boolean;
  public address?: Address;
  public tariffEffectiveOn?: string;
  public rateInputs?: TariffRate[]; 

  public useTypicalElectricity(buildingId: string, dataFactor = 1): void {
    // @ts-ignore
    const baselineTypeObj: PropertyData= {
      keyName : "baselineType",
      dataValue : "typicalElectricity",
      operator : "+",
      dataFactor : dataFactor
    };
    // @ts-ignore
    const buildingIdObj: PropertyData = {
      keyName : "buildingId",
      dataValue : buildingId
    };

    if (!this.propertyInputs) {
      this.propertyInputs = [baselineTypeObj, buildingIdObj];
    } else if (this.differentInputsOnList()) {
      // propertyInputs other than baselineType and buildingId
      this.propertyInputs.push(baselineTypeObj, buildingIdObj);
    } else {
      const newPropertyInputs: PropertyData[] | undefined = [];
      this.propertyInputs.forEach(inputObj => {
        if (inputObj.keyName === "baselineType") {
          newPropertyInputs.push(baselineTypeObj);
        } else if (inputObj.keyName === "buildingId" && inputObj.dataValue !== buildingId) {
          newPropertyInputs.push(inputObj, buildingIdObj);
        } else {
          newPropertyInputs.push(inputObj);
        }
      });
      this.propertyInputs = newPropertyInputs;
    }
  }

  // returns true when propertyInputs have inputs other than "baselineType" and "buildingId"
  private differentInputsOnList(): boolean {
    if (!this.propertyInputs) return false
    let flag = true;
    this.propertyInputs.forEach(inputObj => {
      if (inputObj.keyName === "baselineType" || inputObj.keyName === "buildingId") {
        flag = false;
      } 
    });
    return flag;
  }
}

export class CalculatedCostApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    const Config = GenabilityConfig.config();
    super(Config.baseURL, credentials);
  }

  public async runCalculation(request: GetCalculatedCostRequest): Promise<CalculatedCost> {
    if (!request.propertyInputs) {
      request.useTypicalElectricity('RESIDENTIAL');
    }
    const response = await this.axiosInstance.post(`/rest/v1/ondemand/calculate`, request);
    const responseData = response.data.results[0];
    responseData.requestId = response.data.requestId;
    return responseData;
  }
}
