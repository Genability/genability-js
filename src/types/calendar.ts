export enum CalendarType {
  HOLIDAY = "HOLIDAY",
  BILLING = "BILLING",
  PRICING_PERIOD = "PRICING_PERIOD"
}

export enum DateDefinitionType {
  FIXED_DATE = "FIXED_DATE",
  MANUAL = "MANUAL",
  FLOATING_DATE = "FLOATING_DATE",
  EASTER_DATE = "EASTER_DATE"
}

export interface Calendar {
  calendarId: number;
  calendarName: string;
  calendarType: CalendarType;
  lseId: string;
  events: CalendarEvent[];
}

export interface CalendarEvent {
  calendarEventId: number;
  calendarEventName: string;
  lseId: number;
  calendarEventType: CalendarType;
  dateDefinitionType: DateDefinitionType;
  locale: string;
  seededUntil: Date;
  fixedMonth: number;
  fixedDay: number;
  dayOfWeek: number;
  weekOfMonth: number;
  adjustment: number;
}

export interface CalendarDate {
  eventDateId: number;
  subKey: string;
  eventName: string;
  startDateTime: Date;
  endDateTime: Date;
  calendarEventId: number;
  lseId: number;
}
