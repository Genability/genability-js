import {
  RestApiClient,
  RestApiCredentials,
  AddParamCallback,
  GenabilityConfig,
  BasePagedRequest,
  PagedResponse
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
  public constructor(credentials: RestApiCredentials) {
    const Config = GenabilityConfig.config();
    super(Config.baseURL, credentials);
  }

  public async getLookupValues(request?: GetLookupsRequest): Promise<PagedResponse<LookupValue>> {
    return this.getPaged('/rest/public/properties/lookups', { params: request } );
  }

  public async getPropertyLookupValues(propertyKey: string, request?: GetLookupsRequest): Promise<PagedResponse<LookupValue>> {
    return this.getPaged(`/rest/public/properties/${propertyKey}/lookups`, { params: request } );
  }

  public async getPropertyLookupStats(propertyKey: string): Promise<LookupStats> {
    const response = await this.axiosInstance.get(`/rest/public/properties/${propertyKey}/stats`);
    return response.data.results[0];
  }
}
