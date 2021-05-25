/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import {
  isQueryStringified,
  isResponse,
  Response,
  SingleResponse,
  PagedResponse,
} from './contract';

export interface RestApiCredentialsObject {
  appId?: string;
  appKey?: string;
  jwt?: string;
  proxyReq?: {(config: any): any}; // For additional transformations to request required by proxies
}

/**
 * Pass in a function implementing this signature to generate API credentials dynamically.
 */
export type RestApiCredentialsFunction = () => Promise<RestApiCredentialsObject>;

/**
 * This is a composite type that exposes to the SDK user the option to pass credentials as either an object or a function.
 */
export type RestApiCredentials = RestApiCredentialsObject | RestApiCredentialsFunction;

/**
 * Pass in a function implementing this signature to the various get, post, put
 * methods to read or manipulate the Axios Response, including the raw JSON data,
 * before its returned as a StandardResponse or PagedResponse object.
 */
export type ResponseInterceptorFunction = (response: AxiosResponse) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function restParamsSerialize(params: any): string {
  if(params === undefined)
    return "";
  else if(isQueryStringified(params))
    return params.queryStringify();
  return "";
}

/**
 * Override axios so that our error HTTP status do not throw an exception
 * @param status HTTPS status of response
 * @returns true for resolve, false for reject/exception
 */
function validateStatus(status: number): boolean {
  // Codes from https://developer.genability.com/api-reference/basics/responses/#http-status-codes
  return ((status >= 200 && status < 300) || (status >= 400 && status <= 404));
}

function axiosErrorToResponse<T>(axiosError: AxiosError): Response<T> {
  return {
    status: 'error',
    type: 'Error',
    count: 1,
    results: [],
    errors: [{
      code: (axiosError.code ? axiosError.code : 'none'),
      message: axiosError.message,
      objectName: 'Axios',
    }]
  };
}

function exceptionToResponse<T>(exception: Error): Response<T> {
  return {
    status: 'error',
    type: 'Error',
    count: 1,
    results: [],
    errors: [{
      code: exception.name,
      message: exception.message,
      objectName: 'UnexpectedError',
    }]
  };
}

export abstract class RestApiClient {
  protected axiosInstance: AxiosInstance;
  private readonly _credentials: RestApiCredentials;

  public constructor(baseURL: string, credentials: RestApiCredentials) {
    this._credentials = credentials;

    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        Authorization: typeof credentials !== "function" ? RestApiClient.createAuthHeader(credentials) : "",
        'Content-Type': 'application/json;charset=UTF-8'
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      paramsSerializer: (params: any) => restParamsSerialize(params),
    });

    if (typeof credentials !== "function" && credentials?.proxyReq) {
      this.axiosInstance.interceptors.request.use(credentials.proxyReq);
    }
  }

  private static createAuthHeader(credentials: RestApiCredentialsObject): string {
    let authHeader = '';

    if (credentials?.appId !== undefined &&  credentials?.appKey !== undefined) {
      const authString = Buffer.from(`${credentials.appId}:${credentials.appKey}`).toString('base64');
      authHeader = `Basic ${authString}`;
    } else if (credentials?.jwt !== undefined) {
      authHeader = `Bearer ${credentials.jwt}`;
    }

    return authHeader;
  }

  private async getCredentials(): Promise<RestApiCredentialsObject> {
    if (typeof this._credentials === "function") {
      const credentials: RestApiCredentialsObject = (await this._credentials()) as RestApiCredentialsObject;
      if (credentials.proxyReq) {
        this.axiosInstance.interceptors.request.use(credentials.proxyReq);
      }
      return credentials;
    } else {
      return this._credentials;
    }
  }

  private static getHeaders(credentials: RestApiCredentialsObject): AxiosRequestConfig {
    return {
      headers: {
        Authorization: RestApiClient.createAuthHeader(credentials),
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };
  }

  async getSingle<T>(
    url: string,
    config?: AxiosRequestConfig | undefined,
    responseProcessor?: ResponseInterceptorFunction | undefined
  ): Promise<SingleResponse<T>> {
    try {
      const response = await this.axiosInstance.get(url, { ...config, ...RestApiClient.getHeaders(await this.getCredentials()), validateStatus });
      if(responseProcessor) {
        responseProcessor(response);
      }
      return new SingleResponse(response.data);
    } catch (err) {
      if(isResponse(err.response.data)) {
        return new SingleResponse(err.response.data);
      } else if (axios.isAxiosError(err)) {
        return new SingleResponse(axiosErrorToResponse(err));
      } else {
        return new SingleResponse(exceptionToResponse(err));
      }
    }
  }

  async getPaged<T>(
    url: string,
    config?: AxiosRequestConfig | undefined,
    responseProcessor?: ResponseInterceptorFunction | undefined
  ): Promise<PagedResponse<T>> {
    try {
      const response = await this.axiosInstance.get(url,  { ...config, ...RestApiClient.getHeaders(await this.getCredentials()), validateStatus });
      if(responseProcessor) {
        responseProcessor(response);
      }
      return new PagedResponse(response.data);
    } catch (err) {
      if(isResponse(err.response.data)) {
        return new PagedResponse(err.response.data);
      } else if (axios.isAxiosError(err)) {
        return new PagedResponse(axiosErrorToResponse(err));
      } else {
        return new PagedResponse(exceptionToResponse(err));
      }
    }
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined,
    responseProcessor?: ResponseInterceptorFunction | undefined
  ): Promise<SingleResponse<T>> {
    try {
      const response = await this.axiosInstance.post(url, data, { ...config, ...RestApiClient.getHeaders(await this.getCredentials()), validateStatus });
      if(responseProcessor) {
        responseProcessor(response);
      }
      return new SingleResponse(response.data);
    } catch (err) {
      if(isResponse(err.response.data)) {
        return new SingleResponse(err.response.data);
      } else if (axios.isAxiosError(err)) {
        return new SingleResponse(axiosErrorToResponse(err));
      } else {
        return new SingleResponse(exceptionToResponse(err));
      }
    }
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined,
    responseProcessor?: ResponseInterceptorFunction | undefined
  ): Promise<SingleResponse<T>> {
    try {
      const response = await this.axiosInstance.put(url, data, { ...config, ...RestApiClient.getHeaders(await this.getCredentials()), validateStatus });
      if(responseProcessor) {
        responseProcessor(response);
      }
      return new SingleResponse(response.data);
    } catch (err) {
      if(isResponse(err.response.data)) {
        return new SingleResponse(err.response.data);
      } else if (axios.isAxiosError(err)) {
        return new SingleResponse(axiosErrorToResponse(err));
      } else {
        return new SingleResponse(exceptionToResponse(err));
      }
    }
  }

}
