/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { isQueryStringified, SingleResponse } from './contract';
import {
  PagedResponse,
} from '../rest-client';

export interface RestApiCredentials {
  appId?: string;
  appKey?: string;
  jwt?: string;
  proxyReq?: {(config: any): any}; // For additional transformations to request required by proxies
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
    let authHeader = '';
    if (credentials?.appId !== undefined &&  credentials?.appKey !== undefined) {
      const authString = Buffer.from(`${credentials.appId}:${credentials.appKey}`).toString('base64');
      authHeader = `Basic ${authString}`;
    } else if (credentials?.jwt !== undefined) {
      authHeader = `Bearer ${credentials.jwt}`;
    }

    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json;charset=UTF-8'
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      paramsSerializer: (params: any) => restParamsSerialize(params),
    });

    if (credentials?.proxyReq) {
      this.axiosInstance.interceptors.request.use(credentials.proxyReq);
    }
  }

  async getSingle<T>(url: string, config?: AxiosRequestConfig | undefined): Promise<SingleResponse<T>> {
    try {
      const response = await this.axiosInstance.get(url, config);
      return new SingleResponse(response.data);
    } catch (err) {
      return new SingleResponse(err.response.data); 
    }
  }

  async getPaged<T>(url: string, config?: AxiosRequestConfig | undefined): Promise<PagedResponse<T>> {
    try {
      const response = await this.axiosInstance.get(url, config);
      return new PagedResponse(response.data);
    } catch (err) {
      return new PagedResponse(err.response.data); 
    }
  }

}
