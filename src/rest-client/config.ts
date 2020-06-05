export class GenabilityConfigOptions {
  profileName?: string;
  baseURL?: string;
}

export class GenabilityConfig {
  private static _instance: GenabilityConfig;
  private _baseURL: string;
  private _profileName: string;

  private constructor(configOptions?: Partial<GenabilityConfigOptions>) {
    this._baseURL = configOptions?.baseURL ?? 'https://api.genability.com';
    this._profileName =  configOptions?.profileName ?? 'default';
  }

  public static config(configOptions?: Partial<GenabilityConfigOptions>): GenabilityConfig {
    return this._instance || (this._instance = new this(configOptions));
  }

  get baseURL(): string {
    return this._baseURL;
  }

  get profileName(): string {
    return this._profileName;
  }
}
