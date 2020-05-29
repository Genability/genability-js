import {
  RestApiClient,
  RestApiCredentials,
  Constant
} from '../rest-client';

import {
  TimeOfUse,
  TimeOfUsePeriod
} from '../types';

export class TimeOfUseApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    super(Constant.baseURL, credentials);
  }

  public async getTimeOfUse(touId: number): Promise<TimeOfUse> {
    const response = await this.axiosInstance.get(`/rest/public/timeofuses/${touId}`);
    return response.data.results[0];
  }

  public async getTimeOfUseGroup(lseId: number, touGroupId: number): Promise<TimeOfUsePeriod> {
    const response = await this.axiosInstance.get(`/rest/public/timeofuses/${lseId}/${touGroupId}`);
    return response.data.results[0];
  }
}
