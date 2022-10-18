import {
  RestApiClient,
  AddParamCallback,
  BasePagedRequest,
  PagedResponse,
  SingleResponse
} from '../rest-client';
import {
  LookupValue, LookupStats,
} from '../types';

export class GetLookupsRequest extends BasePagedRequest {
  public propertyKey?: string;
  public subPropertyKey?: string;
  public fromDateTime?: string;
  public toDateTime?: string;

  addParams(addParam: AddParamCallback): void {
    addParam('propertyKey', this.propertyKey);
    addParam('subPropertyKey', this.subPropertyKey);
    addParam('fromDateTime', this.fromDateTime);
    addParam('toDateTime', this.toDateTime);
  }
}

export class LookupApi extends RestApiClient {
  public async getLookupValues(request?: GetLookupsRequest): Promise<PagedResponse<LookupValue>> {
    return this.getPaged('/rest/public/properties/lookups', { params: request } );
  }

  public async getPropertyLookupValues(propertyKey: string, request?: GetLookupsRequest): Promise<PagedResponse<LookupValue>> {
    return this.getPaged(`/rest/public/properties/${propertyKey}/lookups`, { params: request } );
  }

  public async getPropertyLookupStats(propertyKey: string): Promise<SingleResponse<LookupStats>> {
    return this.getSingle(`/rest/public/properties/${propertyKey}/stats`);
  }
}
