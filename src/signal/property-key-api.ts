import {
  RestApiClient,
  RestApiCredentials,
  PagedResponse,
  BasePagedRequest,
  AddParamCallback,
  Constant
} from '../rest-client';
import {
  GenPropertyKey,
  PropertyDataType
} from '../types';

export class GetPropertyKeysRequest extends BasePagedRequest {
  public excludeGlobal?: boolean;
  public keySpace?: string;
  public family?: string;
  public entityId?: number;
  public entityType?: string;
  public propertyDataType?: PropertyDataType;

  addParams(addParam: AddParamCallback): void {
    addParam('excludeGlobal', this.excludeGlobal);
    addParam('keySpace', this.keySpace);
    addParam('family', this.family);
    addParam('entityId', this.entityId);
    addParam('entityType', this.entityType);
    addParam('propertyDataType', this.propertyDataType);
  }
}

export class PropertyKeyApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    super(Constant.baseURL, credentials);
  }

  public async getPropertyKeys(request: GetPropertyKeysRequest): Promise<PagedResponse<GenPropertyKey>> {
    const response = await this.axiosInstance.get(`/rest/public/properties`, { params: request } );
    return new PagedResponse(response.data);
  }

  public async getPropertyKey(keyName: string): Promise<GenPropertyKey> {
    const response = await this.axiosInstance.get(`/rest/public/properties/${keyName}`);
    return response.data.results[0];
  }
}
