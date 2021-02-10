/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {
  RestApiClient,
  RestApiCredentials,
  GenabilityConfig,
} from '../rest-client';

import {CalculatedCostRequest, CalculatedCost} from "../types/on-demand-cost-calculation";

export class CalculationHistoryApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    const Config = GenabilityConfig.config();
    super(Config.baseURL, credentials);
  }

  public async getCalculateHistoryResponse(requestId: string): Promise<CalculatedCost> {
    const response = await this.axiosInstance.get(`/beta/calculate/history/responses/${requestId}`);
    const responseData = response.data.results[0];
    responseData.requestId = response.data.requestId;
    responseData.type = response.data.type;
    return responseData;
  }

  public async getCalculateHistoryRequest(requestId: string): Promise<CalculatedCostRequest> {
    const response = await this.axiosInstance.get(`/beta/calculate/history/requests/${requestId}`);
    const responseData = response.data.results[0];
    responseData.requestId = response.data.requestId;
    responseData.type = response.data.type;
    return responseData;
  }
}
