import { 
  CalendarType,
  CalendarEvent,
  Calendar,
  CalendarDate,
  DateDefinitionType,
  isCalendar,
  isCalendarDate,
  isCalendarEvent
} from './calendar';

describe('calendar types', () => {
  describe('test that JSON to enum', () => {
    it('works for CalendarType', () => {
      const calendar: Calendar = JSON.parse('{"calendarId": 1, "calendarType": "HOLIDAY"}');
      expect(calendar.calendarType).toEqual(CalendarType.HOLIDAY);
      expect(calendar.calendarId).toEqual(1);
    })
    it('works for DateDefinitionType', () => {
      const calendarEvent: CalendarEvent = JSON.parse('{"calendarEventId": 1, "dateDefinitionType": "FIXED_DATE"}');
      expect(calendarEvent.dateDefinitionType).toEqual(DateDefinitionType.FIXED_DATE);
      expect(calendarEvent.calendarEventId).toEqual(1);
    })
  });
  describe('isCalendar function', () => {
    it('should be false for invalid JSON', () => {
      const calendar: Calendar = JSON.parse(
        '{\
          "calendarId": 1,\
          "calendarName": "numberCalendarName"\
        }'
      );
      expect(isCalendar(calendar)).toEqual(false);
    })
    it('should be true for valid JSON', () => {
      const calendar: Calendar = JSON.parse(
        '{\
          "calendarId": 1,\
          "calendarName": "numberCalendarName",\
          "calendarType": "BILLING",\
          "lseId": 2\
        }'
      );
      expect(isCalendar(calendar)).toEqual(true);
    })
  });
  describe('isCalendarDate function', () => {
    it('should be false for invalid JSON', () => {
      const calendarDate: CalendarDate = JSON.parse(
        '{\
          "eventDateId": 1,\
          "calendarEventId": 2\
        }'
      );
      expect(isCalendarDate(calendarDate)).toEqual(false);
    })
    it('should be true for valid JSON', () => {
      const calendarDate: CalendarDate = JSON.parse(
        '{\
          "eventDateId": 2,\
          "subKey": null,\
          "eventName": "New Year\'s Day",\
          "startDateTime": "2010-01-01T00:00:00+00:00",\
          "endDateTime": null,\
          "calendarEventId": 2,\
          "lseId": 2654\
        }'
      );
      expect(isCalendarDate(calendarDate)).toEqual(true);
    })
  });
  describe('works for CalendarEvent', () => {
    it('should be true with empty events', () => {
      const calendar: Calendar = JSON.parse(
        '{\
          "calendarId": 1,\
          "calendarName": "numberCalendarName",\
          "calendarType": "BILLING",\
          "lseId": 2,\
          "events": []\
        }'
      );
      expect(isCalendar(calendar)).toEqual(true);
      expect(calendar.events).toEqual([]);
    })
    it('should be true with events', () => {
      const eventsJson = '[{\
        "calendarEventId": 1,\
        "calendarEventName": "testEventName",\
        "lseId": 2,\
        "calendarEventType": "BILLING"\
       }]';
      const calendar: Calendar = JSON.parse(
        `{\
          "calendarId": 1,\
          "calendarName": "numberCalendarName",\
          "calendarType": "BILLING",\
          "lseId": 2,\
          "events": ${eventsJson}
        }`
      );
      const events: Array<CalendarEvent> = JSON.parse(eventsJson);
      expect(isCalendar(calendar)).toEqual(true);
      expect(isCalendarEvent(events[0])).toEqual(true);
      expect(calendar.events).toEqual(events);
    })
  });
});
