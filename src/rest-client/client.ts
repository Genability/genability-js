import axios, { AxiosInstance } from 'axios';
import { isQueryStringified } from './contract'

export interface RestApiCredentials {
  appId: string;
  appKey: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function restParamsSerialize(params: any): string {
  if(params === undefined)
    return "";
  else if(isQueryStringified(params))
    return params.queryStringify();
  return "";
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      paramsSerializer: (params: any) => restParamsSerialize(params),
    });
  }
}
