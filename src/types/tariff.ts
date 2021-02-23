import { GenPropertyKey } from '../types';
import { ServiceType } from './load-serving-entity';
import { Territory } from './territory';
import { Season } from './season';
import { TimeOfUse } from './time-of-use';
import { PrivacyFlag } from './property-key';

export enum TariffType {
  DEFAULT = "DEFAULT",
  ALTERNATIVE = "ALTERNATIVE",
  RIDER = "RIDER",
  OPTIONAL_EXTRA = "OPTIONAL_EXTRA",
}

export enum CustomerClass {
  GENERAL = "GENERAL",
  RESIDENTIAL = "RESIDENTIAL",
  SPECIAL_USE = "SPECIAL_USE",
  PROPOSED = "PROPOSED",
}

export enum ChargeType {
  FIXED_PRICE = "FIXED_PRICE",
  CONSUMPTION_BASED = "CONSUMPTION_BASED",
  DEMAND_BASED = "DEMAND_BASED",
  QUANTITY = "QUANTITY",
  MINIMUM = "MINIMUM",
  MAXIMUM = "MAXIMUM",
  TAX = "TAX",
  NET_EXCESS_GENERATION = "NET_EXCESS_GENERATION",
}

export enum ChargeClass {
  SUPPLY = "SUPPLY",
  TRANSMISSION = "TRANSMISSION",
  DISTRIBUTION = "DISTRIBUTION",
  TAX = "TAX",
  CONTRACTED = "CONTRACTED",
  USER_ADJUSTED = "USER_ADJUSTED",
  AFTER_TAX = "AFTER_TAX",
  OTHER = "OTHER",
  NON_BYPASSABLE = "NON_BYPASSABLE",
}

export class ChargeClasses  {
  public chargeClasses: Array<ChargeClass>;
  public constructor(chargeClassString: string) {
    this.chargeClasses = chargeClassString.split(",") as Array<ChargeClass>;
  }
  public toJSON(): string {
    return this.chargeClasses.toString();
  }
  public static getChargeClasses(chargeClasses: Array<string>): ChargeClasses {
    return new ChargeClasses(chargeClasses.toString());
  }
}

export enum ChargePeriod {
  DAILY = "DAILY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  ANNUALLY = "ANNUALLY",
}

export enum TransactionType {
  BUY = "BUY",
  SELL = "SELL",
  NET = "NET",
  BUY_IMPORT = "BUY_IMPORT",
  SELL_EXPORT = "SELL_EXPORT",
}

export enum TariffPropertyType {
  APPLICABILITY = "APPLICABILITY",
  RATE_CRITERIA = "RATE_CRITERIA",
  BENEFIT = "BENEFIT",
  DATA_REPUTATION = "DATA_REPUTATION",
  SERVICE_TERMS = "SERVICE_TERMS",
}

export enum Period {
  ON_PEAK = "ON_PEAK",
  PARTIAL_PEAK = "PARTIAL_PEAK",
  OFF_PEAK = "OFF_PEAK",
  CRITICAL_PEAK = "CRITICAL_PEAK",
}

export enum RateUnit {
  COST_PER_UNIT = "COST_PER_UNIT",
  PERCENTAGE = "PERCENTAGE",
  BLOCK = "BLOCK",
  BLOCK_SELL_BACK = "BLOCK_SELL_BACK",
}

export interface Tariff {
  tariffId: number;
  masterTariffId: number;
  tariffCode: string;
  tariffBookName?: string;
  privacy?: null | PrivacyFlag; 
  tariffName: string;
  lseId: number;
  lseName: string;
  lseCode?: null | number;
  serviceType?: ServiceType;
  priorTariffId?: number;
  distributionLseId?: number;
  tariffType?: TariffType;
  customerClass?: CustomerClass;
  customerCount?: number;
  customerLikelihood?: number | null;
  customerCountSource?: string;
  territoryId?: number;
  effectiveDate?: string;
  endDate?: string | null;
  closedDate?: string | null;
  isActive?: boolean;
  timeZone?: string;
  billingPeriod?: ChargePeriod;
  currency?: string;
  chargeTypes?: ChargeType[];
  chargePeriod?: ChargePeriod;
  minMonthlyConsumption?: number | null;
  maxMonthlyConsumption?: number | null;
  minMonthlyDemand?: number | null;
  maxMonthlyDemand?: number | null;
  hasTimeOfUseRates?: boolean;
  hasTieredRates?: boolean;
  hasContractedRates?: boolean;
  hasTariffApplicability?: boolean;
  hasRateApplicability?: boolean;
  hasNetMetering?: boolean | null;
  properties?: TariffProperty[];
  rates?: TariffRate[];
}


export interface TariffRate {
  tariffRateId: number | null;
  masterTariffRateId?: number;
  tariffId: number | null;
  riderTariffId?: number;
  riderId: number | null;
  tariffSequenceNumber: number | null;
  rateGroupName: string;
  rateName: string;
  fromDateTime?: string;
  toDateTime?: string;
  chargeType?: ChargeType;
  chargeClass?: ChargeClasses;
  chargePeriod?: ChargePeriod;
  transactionType?: TransactionType;
  quantityKey?: string;
  applicabilityKey?: string;
  variableLimitKey?: string;
  variableRateKey?: string;
  variableFactorKey?: string;
  territory?: Territory;
  season?: Season;
  timeOfUse?: TimeOfUse;
  rateBands?: TariffRateBand[];
}

export interface TariffRateBand {
  tariffRateBandId?: number;
  tariffRateId?: number;
  rateSequenceNumber?: number;
  hasConsumptionLimit?: boolean;
  consumptionUpperLimit?: number;
  hasDemandLimit?: boolean;
  demandUpperLimit?: number;
  hasPropertyLimit?: boolean;
  propertyUpperLimit?: number;
  applicabilityValue?: string;
  calculationFactor?: number;
  rateAmount?: number;
  rateUnit?: RateUnit;
  isCredit?: boolean;
}

export interface TariffProperty extends GenPropertyKey {
  quantityKey?: string;
  period?: Period;
  propertyTypes: TariffPropertyType;
  operator?: '=' | '<' | '<=' | '>' | '>=' | 'between' | '' | null;
  propertyValue?: string;
  minValue?: string;
  maxValue?: string;
  isDefault?: boolean;
}

/**
 * User Defined Type Guard for Tariff
 */
export function isTariff(arg: Tariff): arg is Tariff {
  return arg.tariffId !== undefined &&
    arg.masterTariffId !== undefined &&
    arg.tariffCode !== undefined &&
    arg.tariffName !== undefined &&
    arg.lseId !== undefined &&
    arg.lseName !== undefined
}
