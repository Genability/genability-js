/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
export enum UsageType {
  SERVICE = <any>"SERVICE",
  TARIFF = <any>"TARIFF",
  CLIMATE_ZONE = <any>"CLIMATE_ZONE",
  UTILITY_CLIMATE_ZONE = <any>"UTILITY_CLIMATE_ZONE",
}

export enum ItemType {
  STATE = <any>"STATE",
  COUNTY = <any>"COUNTY",
  CITY = <any>"CITY",
  ZIPCODE = <any>"ZIPCODE"
}

export enum Centerpoint {
  LATITUDE = <any>"latitude",
  LONGITUDE = <any>"longitude"
}

export interface TerritoryItem {
  territoryItemId: number;
  territoryType: string;
  value: string;
  exclude: boolean;
  partial: boolean;
}

export interface TerritoryLse {
  territoryId: number;
  lseId: number;
  lseName: string;
  distribution: boolean;
  supplierResidential: boolean;
  supplierGeneral: boolean;
  residentialCoverage: number;
  generalCoverage: number;
}

export interface Territory {
  territoryId: number;
  territoryName: string;
  lseId: number;
  lseName: string;
  parentTerritoryId: number;
  usageType: UsageType;
  itemTypes: ItemType[];
  items?: TerritoryItem[];
  territoryLses: TerritoryLse[];
  deregRes: boolean;
  deregCandi: boolean;
  centerPoint: Centerpoint;
}
