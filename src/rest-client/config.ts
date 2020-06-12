import { RestApiCredentials } from './client';
import * as credentials from './credentials';

export class GenabilityConfigOptions {
  profileName?: string;
  proxy?: string;
  credentials?: RestApiCredentials;
}

export class GenabilityConfig {
  private static _instance: GenabilityConfig;
  private _baseURL: string;
  private _credentials: RestApiCredentials = {
    appId:'',
    appKey: ''
  };

  private constructor(configOptions?: Partial<GenabilityConfigOptions>) {

    this._baseURL = configOptions?.proxy ?? 'https://api.genability.com';

    // Deal with credentials last

    if (configOptions?.credentials) {
      this._credentials = configOptions?.credentials;
      return;
    }

    if (credentials.credentialsInEnv()) {
      this._credentials = credentials.credentialsFromEnv();
      return;
    }

    try {
      this._credentials = credentials.credentialsFromFile(configOptions?.profileName);
      return;
    } catch(e) {
      // pass
    }
  }

  public static config(configOptions?: Partial<GenabilityConfigOptions>): GenabilityConfig {
    return this._instance || (this._instance = new this(configOptions));
  }

  get baseURL(): string {
    return this._baseURL;
  }

  get credentials(): RestApiCredentials {
    return this._credentials;
  }
}
