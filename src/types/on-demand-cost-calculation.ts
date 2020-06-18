import {
  ChargeType,
  RateUnit,
  ChargeClass,
  Period,
  TransactionType
} from "./tariff"
import { GenPropertyKey } from '../types';

export enum GroupBy {
  ALL = "ALL",
  YEAR = "YEAR",
  MONTH = "MONTH",
  DAY = "DAY",
  HOUR = "HOUR",
  QTRHOUR = "QTRHOUR"
}

export enum DetailLevel {
  TOTAL = "TOTAL",
  CHARGE_TYPE = "CHARGE_TYPE",
  CHARGE_TYPE_AND_TOU = "CHARGE_TYPE_AND_TOU",
  RATE = "RATE",
  ALL = "ALL"
}

export interface Map {
  subTotalCost: number;
  preTaxMinimumCost: number;
  preTaxMaximumCost: number;
  taxCost: number;
  totalCost: number;
  adjustedTotalCost: number;
  nonBypassableCost: number; 
  kWh: number;
  kW: number;
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
  items: CalculatedCostItem[];
  assumptions: PropertyData[]; 
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
  quantityKey: string;
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
  duration?: number;
  touId?: number;
  touName?: string;
  seasonId?: number;
  seasonName?: string;
  formula: string;
  transactionType: TransactionType;
}

export interface PropertyData extends GenPropertyKey {
  fromDateTime?: string;
  toDateTime?: string;
  period: Period;
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
export function isCalculatedCost(arg: CalculatedCost): arg is CalculatedCost {
  return arg.masterTariffId !== undefined &&
    arg.fromDateTime !== undefined &&
    arg.toDateTime !== undefined &&
    arg.assumptions !== undefined
}