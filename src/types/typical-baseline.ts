import { PropertyData } from "./on-demand-cost-calculation";
import { Territory } from "./territory";
import { ServiceType } from "./load-serving-entity";
import { CustomerClass } from "./tariff";

export enum MeasureUnit {
  TOTAL = "total",
  INTENSITY = "intensity",
  PROPORTION = "proportion"
}

export interface Baseline {
  baselineId: string;
  name: string;
  buildingType: BuildingType;
  serviceType: ServiceType;
  sourceId: string;
  startDay: number;
  climateZone: Territory;
  properties: PropertyData[];
  factors: Factor;
  type: string;
  measureDuration: number;
  measureValue: string;
  measureUnit: MeasureUnit;
  measures: BaselineMeasure[];
  intervals: IntervalInfo[];
}

export interface BaselineMeasure {
  i: number;
  v: number;
}

export interface IntervalInfo {
  fromDateTime: string;
  toDateTime: string;
  duration: number;
  kWh: QuantityRateAmount;
  kW: QuantityRateAmount;
}

export interface QuantityRateAmount {
  quantityAmount: number;
  rateAmount: number;
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
