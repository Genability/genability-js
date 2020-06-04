import {
  RestApiClient,
  RestApiCredentials,
  AddParamCallback,
  Constant,
  BasePagedRequest,
  PagedResponse
} from '../rest-client';
import {
  Lookup,
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
  public constructor(credentials: RestApiCredentials) {
    super(Constant.baseURL, credentials);
  }

  public async getLookups(request: GetLookupsRequest): Promise<PagedResponse<Lookup>> {
    const response = await this.axiosInstance.get('/rest/public/properties/lookups', { params: request } );
    return new PagedResponse(response.data);
  }

  public async getPropertyLookups(propertyKey: string, request: GetLookupsRequest): Promise<PagedResponse<Lookup>> {
    const response = await this.axiosInstance.get(`/rest/public/properties/${propertyKey}/lookups`, { params: request } );
    return new PagedResponse(response.data);
  }

  public async getPropertyLookupStats(propertyKey: string): Promise<PagedResponse<Lookup>> {
    const response = await this.axiosInstance.get(`/rest/public/properties/${propertyKey}/stats`);
    return new PagedResponse(response.data);
  }
}
