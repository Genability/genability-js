import {
  RestApiClient,
  PagedResponse,
  SingleResponse,
  BasePagedRequest,
  AddParamCallback,
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
  public dataType?: PropertyDataType;

  addParams(addParam: AddParamCallback): void {
    addParam('excludeGlobal', this.excludeGlobal);
    addParam('keySpace', this.keySpace);
    addParam('family', this.family);
    addParam('entityId', this.entityId);
    addParam('entityType', this.entityType);
    addParam('dataType', this.dataType);
  }
}

export class PropertyKeyApi extends RestApiClient {
  public async getPropertyKeys(request: GetPropertyKeysRequest): Promise<PagedResponse<GenPropertyKey>> {
    return this.getPaged('/rest/public/properties', { params: request } );
  }

  public async getPropertyKey(keyName: string): Promise<SingleResponse<GenPropertyKey>> {
    return this.getSingle(`/rest/public/properties/${keyName}`);
  }
}
