import {
  RestApiClient,
  PagedResponse,
  BasePagedRequest,
  AddParamCallback,
  SingleResponse
} from '../rest-client';
import {
  UsageType,
  ItemType,
  Territory,
} from '../types';

export class GetTerritoriesRequest extends BasePagedRequest {
  public lseId?: number;
  public masterTariffId?: number;
  public postCode?: string;
  public country?: string;
  public address?: string;
  public populateItems?: boolean;
  public usageTypes?: UsageType;
  public populateLses?: boolean;
  public containsItemType?: ItemType;
  public containsItemValue?: string;

  addParams(addParam: AddParamCallback): void {
    addParam('lseId', this.lseId);
    addParam('masterTariffId', this.masterTariffId);
    addParam('postCode', this.postCode);
    addParam('country', this.country);
    addParam('address', this.address);
    addParam('populateItems', this.populateItems);
    addParam('usageTypes', this.usageTypes);
    addParam('populateLses', this.populateLses);
    addParam('containsItemType', this.containsItemType);
    addParam('containsItemValue', this.containsItemValue);
  }
}

export class TerritoryApi extends RestApiClient {
  public async getTerritories(request: GetTerritoriesRequest): Promise<PagedResponse<Territory>> {
    return this.getPaged(`/rest/public/territories`, { params: request } );
  }

  public async getTerritory(territoryId: number): Promise<SingleResponse<Territory>> {
    return this.getSingle(`/rest/public/territories/${territoryId}`);
  }
}
