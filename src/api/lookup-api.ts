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
  public keyName: string;
  public subKeyName?: string;
  public fromDateTime?: string;
  public toDateTime?: string;

  constructor(keyName: string, options?: { pageCount?: number; pageStart?: number; subKeyName?: string; fromDateTime?: string; toDateTime?: string }) {
    super();

    if (!keyName.trim()) {
      throw new Error("keyName is required and cannot be empty.");
    }

    this.keyName = keyName;

    if (options) {
      this.pageCount = options.pageCount;
      this.pageStart = options.pageStart;
      this.subKeyName = options.subKeyName;
      this.fromDateTime = options.fromDateTime;
      this.toDateTime = options.toDateTime;
    }
  }

  addParams(addParam: AddParamCallback): void {
    addParam('keyName', this.keyName);
    addParam('subKeyName', this.subKeyName);
    addParam('fromDateTime', this.fromDateTime);
    addParam('toDateTime', this.toDateTime);
  }
}

export class LookupApi extends RestApiClient { 
  public async getLookupValues(request: GetLookupsRequest): Promise<PagedResponse<LookupValue>> {
    const keyName = request.keyName;
    if (!keyName) {
      throw new Error('keyName is required');
    }
    return this.getPaged(`/rest/public/properties/${keyName}/lookups`, { params: request } );
  }

  /**
   * @deprecated This method is deprecated and will be remvoved in future versions
   */
  public async getPropertyLookupValues(keyName: string, request?: GetLookupsRequest): Promise<PagedResponse<LookupValue>> {
    if (!keyName) {
      throw new Error('keyName is required');
    }
    return this.getPaged(`/rest/public/properties/${keyName}/lookups`, { params: request } );
  }

  public async getPropertyLookupStats(keyName: string): Promise<SingleResponse<LookupStats>> {
    return this.getSingle(`/rest/public/properties/${keyName}/stats`);
  }
}
