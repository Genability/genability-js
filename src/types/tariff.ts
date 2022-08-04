import { GenPropertyKey } from '../types';
import { ServiceType } from './load-serving-entity';
import { Territory } from './territory';
import { Document, isDocument } from './document';
import { Season, PredominanceRule } from './season';
import { TimeOfUse } from './time-of-use';
import { PrivacyFlag } from './property-key';

export enum TariffType {
  DEFAULT = "DEFAULT",
  ALTERNATIVE = "ALTERNATIVE",
  RIDER = "RIDER",
  OPTIONAL_EXTRA = "OPTIONAL_EXTRA",
  INCENTIVE = "INCENTIVE",
  PROPOSED = "PROPOSED"
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

export enum ChargePeriod {
  ONE_TIME = "ONE_TIME",
  HOURLY = "HOURLY",
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
  INFO = "INFO"
}

export enum TimeOfUseType {
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

export enum ProrationRule {
  SPLIT_DEMAND_VERSION_CHANGE = "SPLIT_DEMAND_VERSION_CHANGE",
  SINGLE_DEMAND_SEASON_CHANGE = "SINGLE_DEMAND_SEASON_CHANGE",
}
export interface TariffDocument {
  tariffId: number;
  documentId: number;
  documentSectionId: number;
  document: Document;
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
  lseCode?: null | string;
  serviceType?: ServiceType;
  priorTariffId?: number;
  distributionLseId?: number;
  tariffType?: TariffType;
  customerClass?: CustomerClass | null;
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
  documents?: TariffDocument[];
}


export interface TariffRate {
  tariffRateId: number | null;
  masterTariffRateId?: number | null;
  tariffId: number | null;
  riderTariffId?: number;
  riderId: number | null;
  tariffSequenceNumber: number | null;
  rateGroupName: string;
  rateName: string;
  fromDateTime?: string | null;
  toDateTime?: string | null;
  chargeType?: ChargeType;
  chargeClass?: ChargeClass[];
  chargePeriod?: ChargePeriod;
  transactionType?: TransactionType;
  quantityKey?: string;
  applicabilityKey?: string;
  variableLimitKey?: string;
  variableRateKey?: string;
  variableFactorKey?: string;
  edgePredominance?: PredominanceRule | null;
  territory?: Territory;
  season?: Season;
  timeOfUse?: TimeOfUse;
  rateBands?: TariffRateBand[];
  prorationRules?: ProrationRule[];
}

export interface TariffRateBand {
  tariffRateBandId?: number | null;
  tariffRateId?: number | null;
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
  period?: TimeOfUseType;
  propertyTypes: TariffPropertyType;
  operator?: '=' | '<' | '<=' | '>' | '>=' | 'between' | '' | null;
  propertyValue?: string;
  minValue?: string;
  maxValue?: string;
  isDefault?: boolean;
}

function hasOwnProperty<X extends {}, Y extends PropertyKey>
(obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop)
}

export function toStringFromChargeClasses(chargeClasses: ChargeClass[]): string {
  if(chargeClasses === undefined || chargeClasses.length == 0) {
    return "";
  }
  return chargeClasses.toString();
}

export function toChargeClassesFromString(jsonString: string): ChargeClass[] {
  if(jsonString && jsonString.length > 0) {
    return jsonString.split(",") as Array<ChargeClass>;
  } else {
    return [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toTariffFromApi(json: any): Tariff {
  if(hasOwnProperty(json,"rates")) {
    for(const tariffRate of json.rates) {
      if(hasOwnProperty(tariffRate, "chargeClass")) {
        if(typeof tariffRate.chargeClass === 'string') {
          tariffRate.chargeClass = toChargeClassesFromString(tariffRate.chargeClass);
        }
      }
    }
  }
  return json as Tariff;
}

export function toApiFromTariff(tariff: Tariff): {[key: string]: any} { // eslint-disable-line @typescript-eslint/no-explicit-any
  const returnJson = {...tariff} as {[key: string]: any}; // eslint-disable-line @typescript-eslint/no-explicit-any
  if(returnJson.rates) {
    for(const tariffRate of returnJson.rates) {
      if(tariffRate && tariffRate.chargeClass) {
        tariffRate.chargeClass = toStringFromChargeClasses(tariffRate?.chargeClass);
      }
    }
  }
  return returnJson;
}

/**
 * User Defined Type Guard for Tariff
 */
export function isTariffDocument(arg: TariffDocument): arg is TariffDocument {
  return arg.tariffId !== undefined &&
    arg.documentId !== undefined &&
    arg.documentSectionId !== undefined &&
    arg.document !== undefined &&
    isDocument(arg.document)
}

export function isTariff(arg: Tariff): arg is Tariff {
  return arg.tariffId !== undefined &&
    arg.masterTariffId !== undefined &&
    arg.tariffCode !== undefined &&
    arg.tariffName !== undefined &&
    arg.lseId !== undefined &&
    arg.lseName !== undefined
}

export function hasTiers(tariffRate: TariffRate): boolean {
  const hasTiersHelper = (rateBands: TariffRateBand[]): boolean => {
    const set = new Set()
    for (const rateBand of rateBands) {
      if (set.has(rateBand.applicabilityValue)) {
        return true
      } else {
        set.add(rateBand.applicabilityValue)
      }
    }
    return false
  }
  if (!tariffRate.rateBands || (tariffRate.rateBands.length < 2)) {
    return false
  } else {
    return hasTiersHelper(tariffRate.rateBands)
  }
}

export function uniquePropertyKeys(tariff: Tariff): Set<string> {
  const mySet: Set<string> = new Set<string>();
  tariff.properties && tariff.properties.forEach((tariffProperty: TariffProperty) =>  mySet.add(tariffProperty.keyName))
  tariff.rates && tariff.rates.forEach((tariffRate: TariffRate) =>  {
    tariffRate.quantityKey && mySet.add(tariffRate.quantityKey)
    tariffRate.applicabilityKey && mySet.add(tariffRate.applicabilityKey)
    tariffRate.variableLimitKey && mySet.add(tariffRate.variableLimitKey)
    tariffRate.variableRateKey && mySet.add(tariffRate.variableRateKey)
    tariffRate.variableFactorKey && mySet.add(tariffRate.variableFactorKey)
  });
  return mySet;
}

export function hasVariableOrCalculationFactor(tariffRate: TariffRate): boolean {
  const calculationFactorPopulated = (
    rateBands: TariffRateBand[]|undefined
  ): boolean => {
    return rateBands ? 
      rateBands.some(
        (rateBand: TariffRateBand) => !!rateBand.calculationFactor
      ): false
  }
  return !!tariffRate.variableFactorKey ||
    calculationFactorPopulated(tariffRate.rateBands)
}

export function isTariffProperty(arg: TariffProperty): arg is TariffProperty {
  return arg.keyName !== undefined &&
        arg.propertyTypes !== undefined &&
        arg.dataType !== undefined;
}
