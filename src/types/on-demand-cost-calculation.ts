/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-assertions */

export enum Map {
  TOTAL_COST = <any>"totalCost",
  ADJUSTED_TOTAL_COST = <any>"adjustedTotalCost",
  KWH = <any>"kWh",
  KW = <any>"kW"
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
  // items?: CalculatedCostItem[];
  // assumptions?: PropertyData[]; 
  calculatedCostId: string;
}
