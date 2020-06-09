export interface LookupValue {
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

export interface LookupStats {
  keyName: string;
  minFromDateTime: number;
  maxToDateTime: number;
  lookupCount: number;
  meanValue: number;
  totalDuration: number;
  meanDuration: number;
  missingDuration: number;
  lastUpdatedDate: number;
}

/**
 * User Defined Type Guard for LookupValue, LookupStats
 */
export function isLookupValue(arg: LookupValue): arg is LookupValue {
  return arg.lookupId !== undefined &&
    arg.propertyKey !== undefined &&
    arg.fromDateTime !== undefined &&
    arg.toDateTime !== undefined;
}

export function isLookupStats(arg: LookupStats): arg is LookupStats {
  return arg.keyName !== undefined &&
    arg.minFromDateTime !== undefined &&
    arg.maxToDateTime !== undefined &&
    arg.lookupCount !== undefined &&
    arg.meanValue !== undefined &&
    arg.totalDuration !== undefined &&
    arg.meanDuration !== undefined &&
    arg.missingDuration !== undefined &&
    arg.lastUpdatedDate !== undefined;
}
