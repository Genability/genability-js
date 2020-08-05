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
    const propertyInputs = [
      {
        keyName : "baselineType",
        dataValue : "typicalElectricity",
        operator : "+",
        dataFactor : dataFactor
      },{
        keyName : "buildingId",
        dataValue : buildingId
      }
    ];
    if (!this.propertyInputs) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.propertyInputs = propertyInputs;
    }
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
