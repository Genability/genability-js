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
}

export enum KeySpace {
  TARIFF = "tariff",
  ELECTRICITY = "electricity",
  LIGHTING = "lighting",
  CUSTOMER = "customer",
  BUILDING = "building",
  SOLAR_PV = "solarPV",
  GENABILITY = "genability"
}

export enum Family {
  // KeySpace TARIFF
  INCENTIVE_SPECIFICATIONS = "incentiveSpecifications",
  FORMULA = "formula",
  LOOKUP_PRICE = "lookupPrice",
  PEAK_DEMAND = "peakDemand",
  RATCHET_DEMAND = "ratchetDemand",
  SYSTEM_DEMAND = "systemDemand",
  CONTRACTED_CAPACITY = "contractedCapacity",
  // CONNECTION is in KeySpace TARIFF and ELECTRICITY
  CONNECTION = "connection",
  // KeySpace ELECTRICITY
  BILLING = "billing",
  END_USE = "endUse",
  FIXTURE = "fixture",
  GENERATION = "generation",
  HVAC = "HVAC",
  LOAD = "load",
  MAJOR_APPLIANCE = "majorAppliance",
  METERING = "metering",
  MOTORS_ENGINES = "motorsEngines",
  SERVICE = "service",
  SOURCE = "source",
  WATER_HEATING = "waterHeating",
  // KeySpace LIGHTING
  COMPACT_FLUORESCENT = "compactFluorescent",
  INCANDESCENT = "incandescent",
  LED = "led",
  INDUCTION = "induction",
  HIGH_PRESSURE_SODIUM_VAPOR = "highPressureSodiumVapor",
  LOW_PRESSURE_SODIUM_VAPOR = "lowPressureSodiumVapor",
  METAL_HALIDE = "metalHalide",
  MERCURY_VAPOR = "mercuryVapor",
  // KeySpace CUSTOMER
  CUSTOMER_CLASS = "customerClass",
  CUSTOMER_STATUS = "customerStatus",
  BILLING_CYCLE = "billingCycle",
  // KeySpace BUILDING
  SPECIFICATIONS = "specifications",
  PROJECT = "project",
  // KeySpace SOLAR_PV
  SYSTEM = "system",
  PRODUCTION = "production",
  INSOLATION = "insolation",
  // KeySpace GENABILITY
  RESOURCE = "resource",
  QOS = "qos"
}

export const KeySpaceFamilyMap = {
  "tariff": [Family.INCENTIVE_SPECIFICATIONS, Family.FORMULA, Family.LOOKUP_PRICE, Family.PEAK_DEMAND,
    Family.RATCHET_DEMAND, Family.SYSTEM_DEMAND, Family.CONTRACTED_CAPACITY, Family.CONNECTION],
  "electricity": [Family.CONNECTION, Family.BILLING, Family.END_USE, Family.FIXTURE, Family.GENERATION, Family.HVAC,
    Family.LOAD, Family.MAJOR_APPLIANCE, Family.METERING, Family.MOTORS_ENGINES, Family.SERVICE, Family.SOURCE,
    Family.WATER_HEATING],
  "lighting": [Family.COMPACT_FLUORESCENT, Family.INCANDESCENT, Family.LED, Family.INDUCTION,
    Family.HIGH_PRESSURE_SODIUM_VAPOR, Family.LOW_PRESSURE_SODIUM_VAPOR, Family.METAL_HALIDE, Family.MERCURY_VAPOR],
  "customer": [Family.CUSTOMER_CLASS, Family.CUSTOMER_STATUS, Family.BILLING_CYCLE],
  "building": [Family.SPECIFICATIONS, Family.PROJECT],
  "solarPV": [Family.SYSTEM, Family.PRODUCTION, Family.INSOLATION],
  "genability": [Family.RESOURCE, Family.QOS]
}

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
  dataValue: string;
  likelihood?: number;
}

/**
 * User Defined Type Guard for GenPropertyKey
 */
export function isGenPropertyKey(arg: GenPropertyKey): arg is GenPropertyKey {
  return arg.keyName !== undefined;
}
