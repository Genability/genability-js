import {
  RestApiClient,
  RestApiCredentials,
  PagedResponse,
  BasePagedRequest,
  AddParamCallback,
  Constant
} from '../rest-client';

import {
  Map,
  GroupBy,
  DetailLevel,
  PropertyData,
  CalculatedCost,
} from '../types/on-demand-cost-calculation';

export class GetCalculatedCostRequest extends BasePagedRequest {
  public masterTariffId?: number;
  public fromDateTime?: string;
  public toDateTime?: string;
  public propertyInputs?: PropertyData[];
  public expected?: Map;
  public billingPeriod?: boolean;
  public detailLevel?: DetailLevel;
  public groupBy?: GroupBy;

  addParams(addParam: AddParamCallback): void {
    addParam('masterTariffId', this.masterTariffId);
    addParam('fromDateTime', this.fromDateTime);
    addParam('toDateTime', this.toDateTime);
    addParam('propertyInputs', this.propertyInputs);
    addParam('expected', this.expected);
    addParam('billingPeriod', this.billingPeriod);
    addParam('detailLevel', this.detailLevel);
    addParam('groupBy', this.groupBy);
  }
}

export class CalculatedCostApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    super(Constant.baseURL, credentials);
  }

  public async getCalculatedCosts(request: GetCalculatedCostRequest): Promise<PagedResponse<CalculatedCost>> {
    const response = await this.axiosInstance.get(`/rest/v1/ondemand/calculate`, { params: request } );
    return new PagedResponse(response.data);
  }
}
