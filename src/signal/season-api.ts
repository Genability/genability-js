import {
  RestApiClient,
  RestApiCredentials,
  AddParamCallback,
  Constant
} from '../rest-client';
import {
  SeasonGroup,
} from '../types';

export class GetSeasonGroupsRequest {
  public lseId?: number;

  addParams(addParam: AddParamCallback): void {
    addParam('lseId', this.lseId);
  }
}

export class SeasonGroupApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    super(Constant.baseURL, credentials);
  }

  public async getSeasonGroups(request: GetSeasonGroupsRequest): Promise<SeasonGroup> {
    const response = await this.axiosInstance.get(`/rest/public/seasons`, { params: request } );
    return new response.data;
  }
}
