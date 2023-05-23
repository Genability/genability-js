import {
  RestApiClient,
  AddParamCallback,
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
  public async getSeasonGroups(request: GetSeasonGroupsRequest): Promise<PagedResponse<SeasonGroup>> {
    return this.getPaged('/rest/public/seasons', { params: request } );
  }
}
