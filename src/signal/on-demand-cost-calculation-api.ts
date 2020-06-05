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
} from '../types/on-demand-cost-calculation';

export class GetCalculatedCostRequest {
  public masterTariffId?: number;
  public fromDateTime?: string;
  public toDateTime?: string;
  public propertyInputs?: PropertyData[];
  public expected?: Map;
  public billingPeriod?: boolean;
  public detailLevel?: DetailLevel;
  public groupBy?: GroupBy;
}

export class CalculatedCostApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    const Config = GenabilityConfig.config();
    super(Config.baseURL, credentials);
  }

  public async runCalculation(request: GetCalculatedCostRequest): Promise<CalculatedCost> {
    const response = await this.axiosInstance.post(`/rest/v1/ondemand/calculate`, request);
    return response.data.results[0];
  }
}
