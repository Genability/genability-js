/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {
  RestApiClient,
  RestApiCredentials,
  GenabilityConfig,
} from '../rest-client';

import {
  CalculatedCost
} from '../types';

import { GetCalculatedCostRequest } from './on-demand-cost-calculation-api';

export class CalculationHistoryApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    const Config = GenabilityConfig.config();
    super(Config.baseURL, credentials);
  }

  public async getCalculateHistoryResponse(requestId: string): Promise<CalculatedCost> {
    const response = await this.axiosInstance.get(`/beta/calculate/history/responses/${requestId}`);
    const responseData = response.data.results[0];
    responseData.requestId = response.data.requestId;
    return responseData;
  }

  public async getCalculateHistoryRequest(requestId: string): Promise<GetCalculatedCostRequest> {
    const response = await this.axiosInstance.get(`/beta/calculate/history/requests/${requestId}`);
    return response.data.results[0];
  }
}
