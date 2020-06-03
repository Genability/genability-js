import {
  RestApiClient,
  RestApiCredentials,
  Constant,
  PagedResponse
} from '../rest-client';

import {
  TimeOfUse,
  TimeOfUsePeriod,
  Interval
} from '../types';

export class TimeOfUseApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    super(Constant.baseURL, credentials);
  }

  public async getTimeOfUse(touId: number): Promise<PagedResponse<TimeOfUse>> {
    const response = await this.axiosInstance.get(`/rest/public/timeofuses/${touId}`);
    return new PagedResponse(response.data);
  }

  public async getTimeOfUseGroup(lseId: number, touGroupId: number): Promise<TimeOfUsePeriod> {
    const response = await this.axiosInstance.get(`/rest/public/timeofuses/${lseId}/${touGroupId}`);
    return response.data.results[0];
  }

  public async getTimeOfUseGroupIntervals(lseId: number, touGroupId: number): Promise<PagedResponse<Interval>> {
    const response = await this.axiosInstance.get(`/rest/public/timeofuses/${lseId}/${touGroupId}/intervals`);
    return new PagedResponse(response.data);
  }
}
