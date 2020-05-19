import { credentialsFromFile } from './rest-client/credentials';
import { RestApiCredentials } from './rest-client';
import { 
  PropertyKeyApi,
  GetPropertyKeysRequest,
  LoadServingEntityApi,
  GetLoadServingEntityRequest,
  TariffApi,
  GetTariffsRequest
} from './signal';

export class GenabilityConfig {
  profileName?: string;
}

export class Genability {
  private static _instance: Genability;
  private credentials: RestApiCredentials;

  // REST APIs
  private _properties: PropertyKeyApi | undefined;
  private _lses: LoadServingEntityApi | undefined;
  private _tariffs: TariffApi | undefined;

  private constructor(config?: Partial<GenabilityConfig>)
  {
    this.credentials = credentialsFromFile(config?.profileName);
  }

  public static configure(config?: Partial<GenabilityConfig>): Genability
  {
    return this._instance || (this._instance = new this(config));
  }

  public get properties(): PropertyKeyApi {
    if(this._properties === undefined)
      this._properties = new PropertyKeyApi(this.credentials)
    return this._properties;
  }

  public getPropertyKeyRequest(): GetPropertyKeysRequest {
    return new GetPropertyKeysRequest();
  }

  public get lses(): LoadServingEntityApi {
    if(this._lses === undefined)
      this._lses = new LoadServingEntityApi(this.credentials)
    return this._lses;
  }

  public getLseRequest(): GetLoadServingEntityRequest {
    return new GetLoadServingEntityRequest();
  }

  public get tariffs(): TariffApi {
    if(this._tariffs === undefined)
      this._tariffs = new TariffApi(this.credentials)
    return this._tariffs;
  }

  public getTariffsRequest(): GetTariffsRequest {
    return new GetTariffsRequest();
  }
}
