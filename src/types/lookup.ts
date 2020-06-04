export interface Lookup {
  lookupId: number;
  propertyKey: string;
  subPropertyKey: string;
  fromDateTime: string;
  toDateTime: string;
  bestValue: number;
  bestAccuracy: number;
  actualValue: number;
  lseForecastValue: number;
  lseForecastAccuracy: number;
  forecastValue: number;
  forecastAccuracy: number;
}

/**
 * User Defined Type Guard for Lookup
 */
export function isLookup(arg: Lookup): arg is Lookup {
  return arg.lookupId !== undefined &&
    arg.propertyKey !== undefined &&
    arg.subPropertyKey !== undefined &&
    arg.fromDateTime !== undefined &&
    arg.toDateTime !== undefined &&
    arg.bestValue !== undefined &&
    arg.bestAccuracy !== undefined &&
    arg.actualValue !== undefined &&
    arg.lseForecastValue !== undefined &&
    arg.lseForecastAccuracy !== undefined &&
    arg.forecastValue !== undefined &&
    arg.forecastAccuracy !== undefined;
}
