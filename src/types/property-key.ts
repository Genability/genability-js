export enum PrivacyFlag {
  PUBLIC = "PUBLIC",
  UNLISTED = "UNLISTED",
  PRIVATE = "PRIVATE",
}

export enum PropertyDataType {
  STRING = "STRING",
  CHOICE = "CHOICE",
  BOOLEAN = "BOOLEAN",
  DATE = "DATE",
  DECIMAL = "DECIMAL",
  INTEGER = "INTEGER",
  FORMULA = "FORMULA",
  LOOKUP = "LOOKUP",
  DEMAND = "DEMAND"
};

export const CommonPropertyKeyNames = {
  CONSUMPTION: "consumption",
  DEMAND: "demand",
  CITY_LIMITS: "cityLimits",
  HAS_ELECTRIC_VEHICLE: "hasElectricVehicle"
}

export interface GenPropertyKey {
  keyName: string;
  subKeyname?: string;
  displayName: string;
  family: string;
  keyspace: string;
  description: string;
  dataType: PropertyDataType;
  quantityUnit?: string;
  formulaDetail?: string;
  lookbackIntervalQuantity?: number;
  lookbackQuantity?: number;
  lookbackPeriod?: string;
  lookbackTimeOfUseId?: number;
  lookbackSeasonId?: number;
  entityId?: number;
  entityType?: string;
  privacy?: PrivacyFlag;
  choices?: GenPropertyChoice[];
}

export interface GenPropertyChoice {
  displayValue: string;
  value: string;
  dataValue: string;
  likelihood?: number;
}

/**
 * User Defined Type Guard for GenPropertyKey
 */
export function isGenPropertyKey(arg: GenPropertyKey): arg is GenPropertyKey {
  return arg.keyName !== undefined;
}
