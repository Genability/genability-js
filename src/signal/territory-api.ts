import {
  RestApiClient,
  RestApiCredentials,
  PagedResponse,
  BasePagedRequest,
  AddParamCallback,
  Constant
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
  public constructor(credentials: RestApiCredentials) {
    super(Constant.baseURL, credentials);
  }

  public async getTerritories(request: GetTerritoriesRequest): Promise<PagedResponse<Territory>> {
    const response = await this.axiosInstance.get(`/rest/public/territories`, { params: request } );
    return new PagedResponse(response.data);
  }

  public async getTerritory(territoryId: number): Promise<Territory> {
    const response = await this.axiosInstance.get(`/rest/public/territories/${territoryId}`);
    return response.data.results[0];
  }
}
