import axios, { AxiosInstance } from 'axios';

export interface RestApiCredentials {
  appId: string;
  appKey: string;
}

export interface RestApiResponse<T> {
  status: string;
  type: string;
  count: number;
  pageCount?: number;
  pageStart?: number;
  requestId?: string;
  results: T;
}

export abstract class RestApiClient {
  protected readonly axiosInstance: AxiosInstance;

  public constructor(baseURL: string, credentials: RestApiCredentials) {
    const auth = Buffer.from(`${credentials.appId}:${credentials.appKey}`).toString('base64');
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
  }
}
