import {
  PropertyData,
  CalculatedCost,
} from './on-demand-cost-calculation';
import { TariffRate } from './tariff';

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

export function isMassCalculation(arg: MassCalculation): arg is MassCalculation {
  return arg.fromDateTime !== undefined &&
    arg.toDateTime !== undefined &&
    arg.scenarios !== undefined
}