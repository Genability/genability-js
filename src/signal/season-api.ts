import {
  RestApiClient,
  RestApiCredentials,
  AddParamCallback,
  GenabilityConfig,
  BasePagedRequest,
  PagedResponse
} from '../rest-client';
import {
  SeasonGroup,
} from '../types';

export class GetSeasonGroupsRequest extends BasePagedRequest {
  public lseId?: number;

  addParams(addParam: AddParamCallback): void {
    addParam('lseId', this.lseId);
  }
}

export class SeasonGroupApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    const Config = GenabilityConfig.config();
    super(Config.baseURL, credentials);
  }

  public async getSeasonGroups(request: GetSeasonGroupsRequest): Promise<PagedResponse<SeasonGroup>> {
    const response = await this.axiosInstance.get(`/rest/public/seasons`, { params: request } );
    return new PagedResponse(response.data);
  }
}
