/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import {
  GenPropertyKey,
} from '../types';

export enum TariffType {
  DEFAULT = <any>"DEFAULT",
  ALTERNATIVE = <any>"ALTERNATIVE",
  RIDER = <any>"RIDER",
  OPTIONAL_EXTRA = <any>"OPTIONAL_EXTRA",
}

export enum CustomerClass {
  GENERAL = <any>"GENERAL",
  RESIDENTIAL = <any>"RESIDENTIAL",
  SPECIAL_USE = <any>"SPECIAL_USE",
  PROPOSED = <any>"PROPOSED",
}

export enum ChargeType {
  FIXED_PRICE = <any>"FIXED_PRICE",
  CONSUMPTION_BASED = <any>"CONSUMPTION_BASED",
  DEMAND_BASED = <any>"DEMAND_BASED",
  QUANTITY = <any>"QUANTITY",
  MINIMUM = <any>"MINIMUM",
  TAX = <any>"TAX",
  NET_EXCESS_GENERATION = <any>"NET_EXCESS_GENERATION",
}

export enum ChargeClass {
  SUPPLY = <any>"SUPPLY",
  TRANSMISSION = <any>"TRANSMISSION",
  DISTRIBUTION = <any>"DISTRIBUTION",
  TAX = <any>"TAX",
  CONTRACTED = <any>"CONTRACTED",
  USER_ADJUSTED = <any>"USER_ADJUSTED",
  AFTER_TAX = <any>"AFTER_TAX",
  OTHER = <any>"OTHER",
  NON_BYPASSABLE = <any>"NON_BYPASSABLE",
}

export enum ChargePeriod {
  DAILY = <any>"DAILY",
  MONTHLY = <any>"MONTHLY",
  QUARTERLY = <any>"QUARTERLY",
  ANNUALLY = <any>"ANNUALLY",
}

export enum TransactionType {
  BUY = <any>"BUY",
  SELL = <any>"SELL",
  NET = <any>"NET",
  BUY_IMPORT = <any>"BUY_IMPORT",
  SELL_EXPORT = <any>"SELL_EXPORT",
}

export enum PropertyType {
  APPLICABILITY = <any>"APPLICABILITY",
  RATE_CRITERIA = <any>"RATE_CRITERIA",
  BENEFIT = <any>"BENEFIT",
  DATA_REPUTATION = <any>"DATA_REPUTATION",
  SERVICE_TERMS = <any>"SERVICE_TERMS",
}

export interface Tariff {
  tariffId: number;
  masterTariffId: number;
  tariffCode: string;
  tariffName: string;
  lseId: number;
  lseName: string;
  serviceType: string;
  priorTariffId: number;
  distributionLseId: number;
  tariffType: string;
  customerClass: string;
  customerCount: number;
  customerLikelihood: number;
  customerCountSource: string;
  territoryId: string;
  effectiveDate: string;
  endDate: string;
  closedDate: string;
  timeZone: string;
  billingPeriod: string;
  currency: string;
  chargeTypes: string;
  chargePeriod: string;
  minMonthlyConsumption: number;
  maxMonthlyConsumption: number;
  minMonthlyDemand: number;
  maxMonthlyDemand: number;
  hasTimeOfUseRates: boolean;
  hasTieredRates: boolean;
  hasContractedRates: boolean;
  hasRateApplicability: boolean;
  hasNetMetering: boolean;
  properties?: GenPropertyKey[];
  rates: Rate[];
}


export interface Rate {
  tariffRateId: number;
  tariffId: number;
  riderTariffId: number;
  riderId: number;
  tariffSequenceNumber: number;
  rateGroupName: string;
  rateName: string;
  fromDateTime: string;
  toDateTime: string;
  chargeType: ChargeType;
  chargeClass: ChargeClass;
  chargePeriod: ChargePeriod;
  transactionType: TransactionType;
  quantityKey: string;
  applicabilityKey: string;
  variableLimitKey: string;
  variableRateKey: string;
  variableFactorKey: string;
  rateBands: RateBand[];
}

export interface RateBand {
  tariffRateBandId: number;
  tariffRateId: number;
  rateSequenceNumber: number;
  hasConsumptionLimit: boolean;
  consumptionUpperLimit: number;
  hasDemandLimit: boolean;
  demandUpperLimit: number;
  hasPropertyLimit: boolean;
  propertyUpperLimit: number;
  applicabilityValue: string;
  calculationFactor: number;
  rateAmount: number;
  rateUnit: string;
  isCredit: boolean;
}

/**
 * User Defined Type Guard for Tariff
 */
export function isTariff(arg: any): arg is Tariff {
  return arg.tariffId !== undefined;
}
