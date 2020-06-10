import * as credentials from './rest-client/credentials';
import { RestApiCredentials } from './rest-client';
import {
  PropertyKeyApi,
  LoadServingEntityApi,
  TariffApi,
  CalendarApi,
  CalculatedCostApi,
  TerritoryApi,
  SeasonGroupApi,
  TimeOfUseApi,
  TypicalBaselineApi
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
  private _calendars: CalendarApi | undefined;
  private _calculation: CalculatedCostApi | undefined;
  private _territories: TerritoryApi | undefined;
  private _seasons: SeasonGroupApi | undefined;
  private _timeofuses: TimeOfUseApi | undefined;
  private _typicals: TypicalBaselineApi | undefined;

  private constructor(config?: Partial<GenabilityConfig>)
  {
    if (credentials.credentialsInEnv()) {
      this.credentials = credentials.credentialsFromEnv();
      return;
    }
    this.credentials = credentials.credentialsFromFile(config?.profileName);
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

  public get lses(): LoadServingEntityApi {
    if(this._lses === undefined)
      this._lses = new LoadServingEntityApi(this.credentials)
    return this._lses;
  }

  public get tariffs(): TariffApi {
    if(this._tariffs === undefined)
      this._tariffs = new TariffApi(this.credentials)
    return this._tariffs;
  }

  public get calendars(): CalendarApi {
    if(this._calendars === undefined)
      this._calendars = new CalendarApi(this.credentials)
    return this._calendars;
  }

  public get calculation(): CalculatedCostApi {
    if(this._calculation === undefined)
      this._calculation = new CalculatedCostApi(this.credentials)
    return this._calculation;
  }

  public get territories(): TerritoryApi {
    if(this._territories === undefined)
      this._territories = new TerritoryApi(this.credentials)
    return this._territories;
  }

  public get seasons(): SeasonGroupApi {
    if(this._seasons === undefined)
      this._seasons = new SeasonGroupApi(this.credentials)
    return this._seasons;
  }

  public get timeofuses(): TimeOfUseApi {
    if(this._timeofuses === undefined)
      this._timeofuses = new TimeOfUseApi(this.credentials)
    return this._timeofuses;
  }

  public get typicals(): TypicalBaselineApi {
    if(this._typicals === undefined)
      this._typicals = new TypicalBaselineApi(this.credentials)
    return this._typicals;
  }
}
