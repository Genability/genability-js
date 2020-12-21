/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {
  RestApiClient,
  RestApiCredentials,
  GenabilityConfig,
} from '../rest-client';

import {
  CalculatedCostSummary,
  GroupBy,
  DetailLevel,
  PropertyData,
  CalculatedCost,
  Address,
  CalculationScenario,
  MassCalculation
} from '../types/on-demand-cost-calculation';

import { TariffRate, ChargeClass } from '../types/tariff';
import { CalculatedCostRequest } from '../types/calculation-history';
export class GetCalculatedCostRequest implements CalculatedCostRequest{
  public isBillingPeriod?: boolean;
  public calcNetExcessGeneration?: boolean;
  public autoBaseline?: string|null;
  public useIntelligentBaselining?: boolean;
  public testRatePredominance?: string|null;
  public masterTariffId!: number;
  public fromDateTime!: string;
  public toDateTime!: string;
  public propertyInputs?: PropertyData[];
  public expected?: CalculatedCostSummary;
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
    } else if (!this.hasPropertyKey("baselineType") && !this.hasPropertyKey("buildingId")) {
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

  // returns true when "keyName" exists on propertyInputs
  private hasPropertyKey(keyName: string): boolean {
    if (!this.propertyInputs) return false
    return this.propertyInputs.some(inputObj => inputObj.keyName === keyName);
  }
}

export class GetMassCalculationRequest {
  public fromDateTime!: string;
  public toDateTime!: string;
  public detailLevel?: DetailLevel;
  public groupBy?: GroupBy;
  public billingPeriod?: boolean;
  public scenarios!: CalculationScenario[];
  public sharedScenario?: CalculationScenario;
  public applyUtilityTax?: boolean;
  public address?: Address;
  public minimums?: boolean;
  public excludeChargeClass?: string;
  public tariffEffectiveOn?: string;
}

export class CalculatedCostApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    const Config = GenabilityConfig.config();
    super(Config.baseURL, credentials);
  }

  public async runCalculation(request: GetCalculatedCostRequest): Promise<CalculatedCost> {
    const response = await this.axiosInstance.post(`/rest/v1/ondemand/calculate`, request);
    const responseData = response.data.results[0];
    responseData.requestId = response.data.requestId;
    return responseData;
  }

  public async runMassCalculation(request: GetMassCalculationRequest): Promise<MassCalculation> {
    const response = await this.axiosInstance.post(`/rest/v1/ondemand/calculate/mass`, request);
    const responseData = response.data.results[0];
    const scenarios = responseData.scenarios;
    for (const scenarioName in scenarios) {
      scenarios[scenarioName].requestId = response.data.requestId
    }
    return responseData;
  }
}
