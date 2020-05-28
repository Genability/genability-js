import {
  RestApiClient,
  RestApiCredentials,
  AddParamCallback,
  Constant
} from '../rest-client';
import {
  Season,
} from '../types';

export class GetSeasonsRequest {
  public lseId?: number;

  addParams(addParam: AddParamCallback): void {
    addParam('lseId', this.lseId);
  }
}

export class SeasonApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    super(Constant.baseURL, credentials);
  }

  public async getSeasons(request: GetSeasonsRequest): Promise<Season> {
    const response = await this.axiosInstance.get(`/rest/public/seasons`, { params: request } );
    return new response.data;
  }
}
