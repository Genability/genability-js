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
  displayName: string;
  family: string;
  keyspace: string;
  description: string;
  propertyDataType: PropertyDataType;
  quantityUnit?: string;
  formulaDetail?: string;
  lookbackPeriod?: string;
  entityId?: number;
  entityType?: string;
  privacy?: PrivacyFlag;
  choices?: GenPropertyChoice[];
}

export interface GenPropertyChoice {
  displayValue: number;
  dataValue: string;
  likelihood?: number;
}

/**
 * User Defined Type Guard for GenPropertyKey
 */
export function isGenPropertyKey(arg: GenPropertyKey): arg is GenPropertyKey {
  return arg.keyName !== undefined;
}
