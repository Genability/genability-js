export interface Interval {
  touId: number;
  touName: string;
  touGroupId: number;
  fromDateTime: string;
  toDateTime: string;
}

export interface Period {
  touPeriodId: number;
  touId: number;
  fromDayOfWeek: number;
  fromHour: number;
  fromMinute: number;
  toDayOfWeek: number;
  toHour: number;
  toMinute: number;
}

export interface TimeOfUse {
  touId: number;
  touName: string;
  touGroupId: number;
  lseId: number;
  calendarId: number;
  season: string;
  isDynamic: boolean;
  touPeriods: Period[];
  privacy: string;
}

export interface TimeOfUsePeriod {
  lseId: number;
  touGroupId: number;
  timeOfUses: TimeOfUse[];
}

/**
 * User Defined Type Guard for TimeOfUsePeriod, TimeOfUse, Interval, Period
 */
export function isTimeOfUsePeriod(arg: TimeOfUsePeriod): arg is TimeOfUsePeriod {
  return arg.lseId !== undefined &&
    arg.touGroupId !== undefined;
}

export function isTimeOfUse(arg: TimeOfUse): arg is TimeOfUse {
  return arg.touId !== undefined &&
    arg.touName !== undefined &&
    arg.touGroupId !== undefined &&
    arg.lseId !== undefined;
}

export function isInterval(arg: Interval): arg is Interval {
  return arg.touId !== undefined &&
    arg.touName !== undefined &&
    arg.touGroupId !== undefined;
}

export function isPeriod(arg: Period): arg is Period {
  return arg.touId !== undefined &&
    arg.touPeriodId !== undefined;
}
