import {
  GenabilityConfig,
  GenabilityConfigOptions
} from './rest-client';

import {
  PropertyKeyApi,
  LoadServingEntityApi,
  TariffApi,
  CalculatedCostApi,
  TerritoryApi,
  SeasonGroupApi,
  TimeOfUseApi,
  LookupApi,
  TypicalBaselineApi,
  DocumentApi,
} from './api';

/**
 *@todo If using credentials file, always check if {__config.useCredentialsFile} is true, then call __config.setCredentialsFromFile
 */
export class Genability {
  private static _instance: Genability | undefined;
  // REST APIs
  private _config: GenabilityConfig;
  private _properties: PropertyKeyApi | undefined;
  private _lses: LoadServingEntityApi | undefined;
  private _tariffs: TariffApi | undefined;
  private _calculation: CalculatedCostApi | undefined;
  private _territories: TerritoryApi | undefined;
  private _seasons: SeasonGroupApi | undefined;
  private _timeofuses: TimeOfUseApi | undefined;
  private _lookups: LookupApi | undefined;
  private _typicals: TypicalBaselineApi | undefined;
  private _documents: DocumentApi | undefined;

  private constructor(options?: Partial<GenabilityConfigOptions>) {
    this._config = new GenabilityConfig(options);
  }

  public static configure(config?: Partial<GenabilityConfigOptions>): Genability
  {
    return this._instance || (this._instance = new this(config));
  }

  public get properties(): PropertyKeyApi {
    if(this._properties === undefined)
      this._properties = new PropertyKeyApi(this._config)
    return this._properties;
  }

  public get lses(): LoadServingEntityApi {
    if(this._lses === undefined)
      this._lses = new LoadServingEntityApi(this._config)
    return this._lses;
  }

  public get tariffs(): TariffApi {
    if(this._tariffs === undefined)
      this._tariffs = new TariffApi(this._config)
    return this._tariffs;
  }

  public get calculation(): CalculatedCostApi {
    if(this._calculation === undefined)
      this._calculation = new CalculatedCostApi(this._config)
    return this._calculation;
  }

  public get territories(): TerritoryApi {
    if(this._territories === undefined)
      this._territories = new TerritoryApi(this._config)
    return this._territories;
  }

  public get seasons(): SeasonGroupApi {
    if(this._seasons === undefined)
      this._seasons = new SeasonGroupApi(this._config)
    return this._seasons;
  }

  public get timeofuses(): TimeOfUseApi {
    if(this._timeofuses === undefined)
      this._timeofuses = new TimeOfUseApi(this._config)
    return this._timeofuses;
  }

  public get lookups(): LookupApi {
    if(this._lookups === undefined)
      this._lookups = new LookupApi(this._config)
    return this._lookups;
  }

  public get typicals(): TypicalBaselineApi {
    if(this._typicals === undefined)
      this._typicals = new TypicalBaselineApi(this._config)
    return this._typicals;
  }

  public get documents(): DocumentApi {
    if(this._documents === undefined)
      this._documents = new DocumentApi(this._config)
    return this._documents;
  }

  // Return this instance's configuration object for testing/debug purposes

  public get __config(): GenabilityConfig {
    return this._config
  }

  // Reset the single instance for testing. TODO: Reconsider this design!

  public static __deconfigure(): void
  {
    delete this._instance;
  }
}
