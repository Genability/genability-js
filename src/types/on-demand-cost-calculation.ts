/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-assertions */

import {
  ChargeType,
  RateUnit,
  ChargeClass,
  Period,
  TransactionType
} from "./tariff"
import { DataType } from "./property-key"

export enum Map {
  TOTAL_COST = <any>"totalCost",
  ADJUSTED_TOTAL_COST = <any>"adjustedTotalCost",
  KWH = <any>"kWh",
  KW = <any>"kW"
}

export enum QuantityKey {
  FIXED = <any>"fixed",
  CONSUMPTION = <any>"consumption",
  MINIMUM = <any>"minimum",
  DEMAND = <any>"demand"
}

export enum PropertyKeyName {
  CONSUMPTION = <any>"consumption",
  DEMAND = <any>"demand",
  CITY_LIMITS = <any>"cityLimits",
  HAS_ELECTRIC_VEHICLE = <any>"hasElectricVehicle"
}

export enum GroupBy {
  ALL = <any>"ALL",
  YEAR = <any>"YEAR",
  MONTH = <any>"MONTH",
  DAY = <any>"DAY",
  HOUR = <any>"HOUR",
  QTRHOUR = <any>"QTRHOUR"
}

export enum DetailLevel {
  TOTAL = <any>"TOTAL",
  CHARGE_TYPE = <any>"CHARGE_TYPE",
  CHARGE_TYPE_AND_TOU = <any>"CHARGE_TYPE_AND_TOU",
  RATE = <any>"RATE",
  ALL = <any>"ALL"
}

export interface CalculatedCost {
  masterTariffId: number;
  tariffName: string;
  totalCost: number;
  fromDateTime: string;
  toDateTime: string;
  accuracy: number;
  currency: string;
  summary: Map;
  items?: CalculatedCostItem[];
  assumptions?: PropertyData[]; 
  calculatedCostId: string;
}

export interface CalculatedCostItem {
  tariffId: number;
  tariffRateId: number;
  tariffRateBandId: number;
  rateSequenceNumber: number;
  rateGroupName: string;
  rateName: string;
  fromDateTime: string;
  toDateTime: string;
  quantityKey: QuantityKey;
  quantityKeyDescription: string;
  rateType: RateUnit;
  rateAmount: number;
  tierLowerLimit: number;
  tierUpperLimit: number;
  itemQuantity: number;
  cost: number;
  rateProration: number;
  chargeType: ChargeType;
  chargeClass: ChargeClass;
  period: Period;
  demandInterval: string;
  duration: number;
  touId: number;
  touName: string;
  seasonId: number;
  seasonName: string;
  formula: string;
  transactionType: TransactionType;
}

export interface PropertyData {
  keyName: PropertyKeyName;
  displayName: string;
  description: string;
  fromDateTime: string;
  toDateTime: string;
  period: Period;
  dataType: DataType;
  dataValue: string;
  dataSeries: number[];
  duration: number;
  dataFactor: number;
  operator: string;
  unit: string;
  accuracy: number;
}

/**
 * User Defined Type Guard for CalculatedCost
 */
export function isCalculatedCost(arg: any): arg is CalculatedCost {
  return arg.masterTariffId !== undefined &&
    arg.fromDateTime !== undefined &&
    arg.toDateTime !== undefined &&
    arg.assumptions !== undefined
}