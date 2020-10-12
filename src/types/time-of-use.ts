import { 
  Season
} from './season';
export interface TimeOfUseInterval {
  touId: number;
  touName?: string;
  touGroupId?: number;
  fromDateTime?: string;
  toDateTime?: string;
}

export interface TimeOfUsePeriod {
  touPeriodId: number;
  touId?: number;
  fromDayOfWeek?: number;
  fromHour?: number;
  fromMinute?: number;
  toDayOfWeek?: number;
  toHour?: number;
  toMinute?: number;
}

export interface TimeOfUse {
  touId: number;
  touName?: string;
  touGroupId?: number;
  lseId?: number;
  calendarId?: number;
  season?: Season;
  isDynamic?: boolean;
  touPeriods?: TimeOfUsePeriod[];
  privacy?: string;
}

export interface TimeOfUseGroup {
  lseId: number;
  touGroupId: number;
  timeOfUses?: TimeOfUse[];
}

/**
 * User Defined Type Guard for isTimeOfUseGroup, TimeOfUse, TimeOfUseInterval, TimeOfUsePeriod
 */
export function isTimeOfUseGroup(arg: TimeOfUseGroup): arg is TimeOfUseGroup {
  return arg.lseId !== undefined &&
    arg.touGroupId !== undefined;
}

export function isTimeOfUse(arg: TimeOfUse): arg is TimeOfUse {
  return arg.touId !== undefined
}

export function isTimeOfUseInterval(arg: TimeOfUseInterval): arg is TimeOfUseInterval {
  return arg.touId !== undefined
}

export function isTimeOfUsePeriod(arg: TimeOfUsePeriod): arg is TimeOfUsePeriod {
  return arg.touPeriodId !== undefined;
}
