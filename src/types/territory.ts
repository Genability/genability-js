export enum UsageType {
  SERVICE = 'SERVICE',
  TARIFF = 'TARIFF',
  CLIMATE_ZONE = 'CLIMATE_ZONE',
  UTILITY_CLIMATE_ZONE = 'UTILITY_CLIMATE_ZONE',
}

export enum ItemType {
  STATE = 'STATE',
  COUNTY = 'COUNTY',
  CITY = 'CITY',
  ZIPCODE = 'ZIPCODE'
}

export interface TerritoryItem {
  territoryItemId: number;
  territoryType?: string;
  value?: string;
  exclude?: boolean;
  partial?: boolean;
}

export interface TerritoryLseResponse {
  totalCount: number;
  pageCount: number;
  pageStart: number;
  list: TerritoryLse[];
}

export interface TerritoryLse {
  territoryId: number;
  lseId?: number;
  lseName?: string;
  distribution?: boolean;
  supplierResidential?: boolean;
  supplierGeneral?: boolean;
  residentialCoverage?: number;
  generalCoverage?: number;
}

export interface CenterPoint {
  latitude: number;
  longitude: number;
}

export interface Territory {
  territoryId: number;
  territoryName: string;
  lseId: number;
  lseName: string;
  parentTerritoryId?: number;
  usageType?: UsageType;
  itemTypes?: ItemType[];
  items?: TerritoryItem[];
  territoryLses?: TerritoryLseResponse;
  deregRes?: boolean;
  deregCandi?: boolean;
  centerPoint?: CenterPoint;
}

/**
 * User Defined Type Guard for Territory
 */
export function isTerritory(arg: Territory): arg is Territory {
  return arg.territoryId !== undefined &&
    arg.territoryName !== undefined &&
    arg.lseId !== undefined &&
    arg.lseName !== undefined;
}
