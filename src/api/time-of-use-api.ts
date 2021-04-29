import {
  RestApiClient,
  RestApiCredentials,
  GenabilityConfig,
  PagedResponse
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

  public async getTimeOfUseGroup(lseId: number, touGroupId: number): Promise<TimeOfUseGroup> {
    const response = await this.axiosInstance.get(`/rest/public/timeofuses/${lseId}/${touGroupId}`);
    return response.data.results[0];
  }

  public async getTimeOfUseGroupIntervals(lseId: number, touGroupId: number): Promise<PagedResponse<TimeOfUseInterval>> {
    return this.getPaged(`/rest/public/timeofuses/${lseId}/${touGroupId}/intervals`);
  }

}
