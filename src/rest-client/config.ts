/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RestApiCredentials } from './client';
import * as credentials from './credentials';

export class GenabilityConfigOptions {
  profileName?: string;
  proxy?: string;
  credentials?: RestApiCredentials;
  requestInterceptor?: (
    requestConfig: AxiosRequestConfig
  ) => AxiosRequestConfig;
  responseInterceptor?: (response: AxiosResponse) => AxiosResponse;
}

export class GenabilityConfig {
  private static _instance: GenabilityConfig | undefined;
  private _baseURL: string;
  private _credentials: RestApiCredentials = {
    appId: '',
    appKey: '',
  };
  private _requestInterceptor:
  | ((requestConfig: AxiosRequestConfig) => AxiosRequestConfig)
  | undefined;
  private _responseInterceptor:
  | ((response: AxiosResponse) => AxiosResponse)
  | undefined;
  private _profileName!: string;
  private _useCredentialsFromFile!: boolean;


  
  constructor(configOptions?: Partial<GenabilityConfigOptions>) {
    this._baseURL = configOptions?.proxy ?? 'https://api.genability.com';

    this._requestInterceptor = configOptions?.requestInterceptor;
    this._responseInterceptor = configOptions?.responseInterceptor;
    // Deal with credentials last

    if (configOptions?.credentials) {
      this._credentials = configOptions?.credentials;
      return this;
    }

    if (credentials.credentialsInEnv()) {
      this._credentials = credentials.credentialsFromEnv();
      return this;
    }
    this._profileName = configOptions?.profileName || '';
    this._useCredentialsFromFile = true;
  }

  public async getCredentialsFromFile(): Promise<GenabilityConfig | null> {
    try {
      this._credentials = await credentials.credentialsFromFile(
        this._profileName
      );
      return this;
    } catch (e) {
      console.error(`Error trying to get credentials - message: ${e.message} - stack: ${e.stack}`);
      // pass
    }
    return null;
  }

  get baseURL(): string {
    return this._baseURL;
  }

  get credentials(): RestApiCredentials {
    return this._credentials;
  }

  get requestInterceptor():
  | ((requestConfig: AxiosRequestConfig) => AxiosRequestConfig)
  | undefined {
    return this._requestInterceptor;
  }

  get responseInterceptor():
  | ((response: AxiosResponse) => AxiosResponse)
  | undefined {
    return this._responseInterceptor;
  }

  get useCredentialsFromFile(): boolean {
    return this._useCredentialsFromFile;
  }
}
