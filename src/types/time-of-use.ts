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
  // TODO add Season - pull update from develop after merge.
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
