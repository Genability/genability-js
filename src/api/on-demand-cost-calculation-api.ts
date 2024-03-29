/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {
  RestApiClient,
  SingleResponse,
} from '../rest-client';

import {
  CalculatedCostSummary,
  GroupBy,
  DetailLevel,
  PropertyData,
  CalculatedCost,
  Address,
  CalculationScenario
} from '../types/on-demand-cost-calculation';

import { TariffRate, ChargeClass } from '../types';
import { CalculatedCostRequest } from '../types/on-demand-cost-calculation';
export class GetCalculatedCostRequest implements CalculatedCostRequest {
  public isBillingPeriod?: boolean;
  public autoBaseline?: string|null;
  public useIntelligentBaselining?: boolean;
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
      keyName : 'baselineType',
      dataValue : 'typicalElectricity',
      operator : '+',
      dataFactor : dataFactor
    };
    // @ts-ignore
    const buildingIdObj: PropertyData = {
      keyName : 'buildingId',
      dataValue : buildingId
    };

    if (!this.propertyInputs) {
      this.propertyInputs = [baselineTypeObj, buildingIdObj];
    } else if (!this.hasPropertyKey('baselineType') && !this.hasPropertyKey('buildingId')) {
      // propertyInputs other than baselineType and buildingId
      this.propertyInputs.push(baselineTypeObj, buildingIdObj);
    } else {
      const newPropertyInputs: PropertyData[] | undefined = [];
      this.propertyInputs.forEach(inputObj => {
        if (inputObj.keyName === 'baselineType') {
          newPropertyInputs.push(baselineTypeObj);
        } else if (inputObj.keyName === 'buildingId' && inputObj.dataValue !== buildingId) {
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

export class GetMassCalculationRequest implements CalculatedCostRequest {
  public fromDateTime!: string;
  public toDateTime!: string;
  public masterTariffId!: number;
  public detailLevel?: DetailLevel;
  public groupBy?: GroupBy;
  public billingPeriod?: boolean;
  public scenarios!: CalculationScenario[];
  public sharedScenario?: CalculationScenario;
  public applyUtilityTax?: boolean;
  public address?: Address;
  public minimums?: boolean;
  public excludeChargeClass?: ChargeClass[];
  public tariffEffectiveOn?: string;
  public useIntelligentBaselining?: boolean;
}

export class CalculatedCostApi extends RestApiClient {
  public async runCalculation(request: GetCalculatedCostRequest): Promise<SingleResponse<CalculatedCost>> {
    return this.post('/rest/v1/ondemand/calculate', request);
  }

  public async runMassCalculation(request: GetMassCalculationRequest): Promise<SingleResponse<CalculatedCost>> {
    return this.post('/rest/v1/ondemand/calculate/mass', request);
  }
}

