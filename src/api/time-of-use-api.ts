import {
  RestApiClient,
  RestApiCredentials,
  GenabilityConfig,
  PagedResponse,
  SingleResponse
} from '../rest-client';
import {
  TimeOfUseGroup,
  TimeOfUseInterval
} from '../types';

export class TimeOfUseApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    const Config = GenabilityConfig.config();
    super(Config.baseURL, credentials);
  }

  public async getTimeOfUseGroups(lseId: number): Promise<PagedResponse<TimeOfUseGroup>> {
    return this.getPaged(`/rest/public/lses/${lseId}/tougroups`);
  }

  public async getTimeOfUseGroup(lseId: number, touGroupId: number): Promise<SingleResponse<TimeOfUseGroup>> {
    return this.getSingle(`/rest/public/timeofuses/${lseId}/${touGroupId}`);
  }

  public async getTimeOfUseGroupIntervals(lseId: number, touGroupId: number): Promise<PagedResponse<TimeOfUseInterval>> {
    return this.getPaged(`/rest/public/timeofuses/${lseId}/${touGroupId}/intervals`);
  }

}
