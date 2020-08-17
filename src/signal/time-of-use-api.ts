import {
  RestApiClient,
  RestApiCredentials,
  GenabilityConfig,
  PagedResponse
} from '../rest-client';

import {
  TimeOfUse,
  TimeOfUseGroup,
  TimeOfUseInterval
} from '../types';

export class TimeOfUseApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    const Config = GenabilityConfig.config();
    super(Config.baseURL, credentials);
  }

  public async getTimeOfUse(touId: number): Promise<PagedResponse<TimeOfUse>> {
    const response = await this.axiosInstance.get(`/rest/public/timeofuses/${touId}`);
    return new PagedResponse(response.data);
  }

  public async getTimeOfUseGroup(lseId: number, touGroupId: number): Promise<TimeOfUseGroup> {
    const response = await this.axiosInstance.get(`/rest/public/timeofuses/${lseId}/${touGroupId}`);
    return response.data.results[0];
  }

  public async getTimeOfUseGroupIntervals(lseId: number, touGroupId: number): Promise<PagedResponse<TimeOfUseInterval>> {
    const response = await this.axiosInstance.get(`/rest/public/timeofuses/${lseId}/${touGroupId}/intervals`);
    return new PagedResponse(response.data);
  }

  public async getTimeOfUseGroups(lseId: number): Promise<PagedResponse<TimeOfUseGroup>> {
    const response = await this.axiosInstance.get(`/rest/public/timeofuses/${lseId}`);
    return new PagedResponse(response.data);
  }
}
