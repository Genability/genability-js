import {
  RestApiClient,
  PagedResponse,
  BasePagedRequest,
  AddParamCallback,
} from '../rest-client';
import { Price } from '../types';
import { GroupBy } from '../types/on-demand-cost-calculation';

export class GetSmartPriceRequest extends BasePagedRequest {
  public fromDateTime?: string;
  public toDateTime?: string;
  public masterTariffId?: number;
  public zipCode?: string;
  public postCode?: string;
  public country?: string;
  public addressString?: string;
  public customerClass?: string;
  public endUse?: string;
  public groupBy?: GroupBy;
  public territoryId?: number;
  public consumptionAmount?: number;
  public demandAmount?: number;

  addParams(addParam: AddParamCallback): void {
    addParam('fromDateTime', this.fromDateTime);
    addParam('toDateTime', this.toDateTime);
    addParam('masterTariffId', this.masterTariffId);
    addParam('zipCode', this.zipCode);
    addParam('postCode', this.postCode);
    addParam('country', this.country);
    addParam('addressString', this.addressString);
    addParam('customerClass', this.customerClass);
    addParam('endUse', this.endUse);
    addParam('groupBy', this.groupBy);
    addParam('territoryId', this.territoryId);
    addParam('consumptionAmount', this.consumptionAmount);
    addParam('demandAmount', this.demandAmount);
  }
}

export class SmartPriceApi extends RestApiClient {
  public async getSmartPrices(request?: GetSmartPriceRequest): Promise<PagedResponse<Price>> {
    return this.getPaged(`/rest/v1/prices/smart`, { params: request });
  }
}
