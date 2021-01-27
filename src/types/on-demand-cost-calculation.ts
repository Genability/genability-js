import {
  ChargeType,
  RateUnit,
  ChargeClass,
  Period,
  TransactionType
} from "./tariff"
import { GenPropertyKey } from '../types';
import { TariffRate } from './tariff';

export enum GroupBy {
  NONE = "NONE",
  ALL = "ALL",
  YEAR = "YEAR",
  MONTH = "MONTH",
  DAY = "DAY",
  HOUR = "HOUR",
  QTRHOUR = "QTRHOUR"
}

export enum DetailLevel {
  ALL = "ALL",
  TOTAL = "TOTAL",
  CHARGE_TYPE = "CHARGE_TYPE",
  CHARGE_TYPE_AND_TOU = "CHARGE_TYPE_AND_TOU",
  RATE = "RATE"
}

export enum DataSeriesAttributes {
  FIXED_NOT_DST = "FIXED_NOT_DST",
  MISSING_DST_PRORATE = "MISSING_DST_PRORATE",
  MISSING_DST_DUPLICATE = "MISSING_DST_PRORATE"
}

export interface ExpectedMap {
  totalCost: number;
  adjustedTotalCost: number;
  kWh: number;
  kW?: number;
}

export interface ScenariosMap {
  [key: string]: CalculatedCost;
}

export interface CalculationScenario {
  masterTariffId?: number;
  scenarioName?: string;
  propertyInputs?: PropertyData[];
  rateInputs?: TariffRate[];
  expected?: ExpectedMap;
}

export interface MassCalculation {
  fromDateTime: string;
  toDateTime: string;
  scenarios: ScenariosMap;
}

export interface CalculatedCostSummary {
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
  requestId: string;
  masterTariffId: number;
  tariffName: string;
  totalCost: number;
  fromDateTime: string;
  toDateTime: string;
  accuracy: number;
  currency?: string;
  summary?: CalculatedCostSummary;
  items: CalculatedCostItem[];
  assumptions: PropertyData[]; 
  calculatedCostId: string;
}

export interface CalculatedCostItem {
  tariffId?: number;
  tariffRateId: number;
  tariffRateBandId: number;
  rateSequenceNumber: number;
  rateGroupName: string;
  rateName: string;
  fromDateTime: string;
  toDateTime: string;
  quantityKey: string;
  quantityKeyDescription?: string;
  rateType: RateUnit;
  rateAmount: number;
  tierLowerLimit?: number;
  tierUpperLimit?: number;
  itemQuantity: number;
  cost: number;
  rateProration?: number;
  chargeType?: ChargeType;
  chargeClass?: ChargeClass;
  period?: Period;
  demandInterval?: string;
  duration?: number;
  touId?: number;
  touName?: string;
  seasonId?: number;
  seasonName?: string;
  formula?: string;
  transactionType?: TransactionType;
}

export interface PropertyData extends GenPropertyKey {
  keyName: string;
  fromDateTime?: string;
  toDateTime?: string;
  period?: Period;
  dataValue?: string;
  dataSeries?: number[];
  exportDataSeries?: number[];
  duration?: number;
  dataFactor?: number;
  operator?: '+' | '-';
  unit?: string;
  accuracy?: number;
}

export interface Address {
  addressString: string;
  addressName?: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  lon: number;
  lat: number;
}

/**
 * User Defined Type Guard for CalculatedCost
 */
export function isCalculatedCost(arg: CalculatedCost): arg is CalculatedCost {
  return arg.requestId !== undefined &&
    arg.masterTariffId !== undefined &&
    arg.tariffName !== undefined &&
    arg.totalCost !== undefined &&
    arg.fromDateTime !== undefined &&
    arg.toDateTime !== undefined &&
    arg.accuracy !== undefined &&
    arg.calculatedCostId !== undefined
}

export function isMassCalculation(arg: MassCalculation): arg is MassCalculation {
  return arg.fromDateTime !== undefined &&
    arg.toDateTime !== undefined &&
    arg.scenarios !== undefined
}