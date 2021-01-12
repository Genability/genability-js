import {
  RestApiClient,
  RestApiCredentials,
  AddParamCallback,
  GenabilityConfig,
} from '../rest-client';

import {
  CalculationScenario,
  MassCalculation
} from '../types/mass-calculation';
import {
  GroupBy,
  DetailLevel,
  Address,
} from '../types/on-demand-cost-calculation';

export class GetMassCalculationRequest{
  public fromDateTime!: string;
  public toDateTime!: string;
  public detailLevel?: DetailLevel;
  public groupBy?: GroupBy;
  public billingPeriod?: boolean;
  public scenarios?: CalculationScenario[];
  public sharedScenario?: CalculationScenario;
  public applyUtilityTax?: boolean;
  public address?: Address;
  public minimums?: boolean;
  public excludeChargeClass?: string;
  public tariffEffectiveOn?: string;

  addParams(addParam: AddParamCallback): void {
    addParam('fromDateTime', this.fromDateTime);
    addParam('toDateTime', this.toDateTime);
    addParam('detailLevel', this.detailLevel);
    addParam('groupBy', this.groupBy);
    addParam('billingPeriod', this.billingPeriod);
    addParam('scenarios', this.scenarios);
    addParam('sharedScenario', this.sharedScenario);
    addParam('applyUtilityTax', this.applyUtilityTax);
    addParam('address', this.address);
    addParam('minimums', this.minimums);
    addParam('excludeChargeClass', this.excludeChargeClass);
    addParam('tariffEffectiveOn', this.tariffEffectiveOn);
  }
}

export class MassCalculationApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    const Config = GenabilityConfig.config();
    super(Config.baseURL, credentials);
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
