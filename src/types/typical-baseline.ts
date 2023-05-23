import { PropertyData } from './on-demand-cost-calculation';
import { Territory } from './territory';
import { ServiceType } from './load-serving-entity';
import { CustomerClass, Tariff } from './tariff';

export enum MeasureUnit {
  TOTAL = 'total',
  INTENSITY = 'intensity',
  PROPORTION = 'proportion'
}

export interface Baseline {
  baselineId: string;
  name: string;
  buildingType: BuildingType;
  serviceType?: ServiceType;
  sourceId?: string;
  startDay?: number;
  climateZone: Territory;
  properties?: PropertyData[];
  factors: Factor;
  type?: string;
  measureDuration?: number;
  measureValue?: string;
  measureUnit?: MeasureUnit;
  measures?: BaselineMeasure[];
  intervals?: IntervalInfo[];
}

export interface BaselineMeasure {
  i?: number;
  v?: number;
}

export interface IntervalInfo {
  fromDateTime?: string;
  toDateTime?: string;
  duration?: number;
  kWh: Measure;
  kW: Measure;
}

export interface Measure {
  quantityAmount?: number;
  rateAmount?: number;
  // quantityAccuracy?: number;
  // rateAccuracy?: number;
  // costAmount?: number;
  // costAccuracy?: number;
}

export interface Factor {
  peakDemand: number;
  monthlyConsumption: number;
  annualConsumption: number;
  meanAnnualConsumption: number;
  meanBuildingArea: number;
  meanIntensity: number;
  buildingArea: number;
}

export interface BuildingType {
  id: string;
  name: string;
  description?: string;
  customerClass: CustomerClass;
}

/**
 * User Defined Type Guard for Baseline
 */
export function isBaseline(arg: Baseline): arg is Baseline {
  return arg.baselineId !== undefined &&
    arg.name !== undefined &&
    Object.keys(arg.buildingType).length !== 0 &&
    Object.keys(arg.climateZone).length !== 0 &&
    Object.keys(arg.factors).length !== 0;
}

export function suitableTypicalBuildingIdForTariff(arg: Tariff): string {
  let correspondingString = '';
  if (arg.customerClass === CustomerClass.RESIDENTIAL) {
    correspondingString = 'RESIDENTIAL';
  } else if (arg.customerClass === CustomerClass.SPECIAL_USE) {
    correspondingString = 'LARGE_COMMERCIAL';
  } else if (arg.customerClass === CustomerClass.GENERAL) {
    if (!arg.minMonthlyConsumption && !arg.maxMonthlyConsumption && !arg.minMonthlyDemand && !arg.maxMonthlyDemand) {
      correspondingString = 'MEDIUM_COMMERCIAL';
    } else if (
      (arg.maxMonthlyConsumption && arg.maxMonthlyConsumption <= 10000) ||
      (arg.maxMonthlyDemand && arg.maxMonthlyDemand <= 200)
    ) {
      correspondingString = 'SMALL_COMMERCIAL';
    } else if (
      (arg.maxMonthlyConsumption && arg.maxMonthlyConsumption <= 50000) ||
      (arg.maxMonthlyDemand && arg.maxMonthlyDemand <= 400)
    ) {
      correspondingString = 'MEDIUM_COMMERCIAL';
    } else if (
      (arg.maxMonthlyConsumption && arg.maxMonthlyConsumption > 50000) ||
      (arg.maxMonthlyDemand && arg.maxMonthlyDemand > 400)
    ) {
      correspondingString = 'LARGE_COMMERCIAL';
    } else if (
      (arg.minMonthlyConsumption && arg.minMonthlyConsumption >= 250000) ||
      (arg.minMonthlyDemand && arg.minMonthlyDemand >= 500)
    ) {
      correspondingString = 'LARGE_COMMERCIAL';
    } else if (
      (arg.minMonthlyConsumption && arg.minMonthlyConsumption >= 50000) ||
      (arg.minMonthlyDemand && arg.minMonthlyDemand >= 400)
    ) {
      correspondingString = 'MEDIUM_COMMERCIAL';
    } else if (
      (arg.minMonthlyConsumption && arg.minMonthlyConsumption < 50000) ||
      (arg.minMonthlyDemand && arg.minMonthlyDemand < 400)
    ) {
      correspondingString = 'SMALL_COMMERCIAL';
    } 
  }
  return correspondingString;
}
