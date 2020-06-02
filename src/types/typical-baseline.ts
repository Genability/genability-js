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
  "kWh.quantityAmount": number;
  "kWh.rateAmount": number;
  "kW.quantityAmount": number;
  "kW.rateAmount": number;
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
    arg.buildingType !== undefined &&
    arg.climateZone !== undefined &&
    arg.factors !== undefined;
}
