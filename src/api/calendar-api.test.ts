import { 
  CalendarApi,
  GetCalendarsRequest,
  GetCalendarDatesRequest
} from './calendar-api';
import { GenabilityConfig, isResponseError, PagedResponse } from '../rest-client'
import {
  CalendarType,
  Calendar,
  CalendarDate,
  isCalendar,
  isCalendarDate,
  DateDefinitionType
} from '../types/calendar';
import { ResourceTypes } from '../types/resource-types';

describe('GetCalendarsRequest unit tests', () => {
  describe('call to queryStringify', () => {
    it('handles no parameters', async () => {
      const request: GetCalendarsRequest = new GetCalendarsRequest();
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it('handles lseId parameter', async () => {
      const request: GetCalendarsRequest = new GetCalendarsRequest();
      request.lseId = 1;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('lseId=1');
    })
    it('handles all parameters', async () => {
      const request: GetCalendarsRequest = new GetCalendarsRequest();
      request.lseId = 1;
      request.calendarType = CalendarType.BILLING;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('lseId=1&calendarType=BILLING');
    })
    it('handles undefined parameters', async () => {
      const request: GetCalendarsRequest = new GetCalendarsRequest();
      request.lseId = undefined;
      request.calendarType = undefined;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it('handles both pagination', async () => {
      const request: GetCalendarsRequest = new GetCalendarsRequest();
      request.lseId = 1;
      request.pageCount = 22;
      request.pageStart = 33;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('lseId=1&pageStart=33&pageCount=22');
    })
    it('handles both pagination via constructor', async () => {
      const request: GetCalendarsRequest = new GetCalendarsRequest({
        pageCount: 22,
        pageStart: 33
      });
      request.lseId = 1;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('lseId=1&pageStart=33&pageCount=22');
    })
  })
});

describe('GetCalendarDatesRequest unit tests', () => {
  describe('call to queryStringify', () => {
    it('handles no parameters', async () => {
      const request: GetCalendarDatesRequest = new GetCalendarDatesRequest();
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it('handles calendarId parameter', async () => {
      const request: GetCalendarDatesRequest = new GetCalendarDatesRequest();
      request.calendarId = 1;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('calendarId=1');
    })
    it('handles all parameters', async () => {
      const request: GetCalendarDatesRequest = new GetCalendarDatesRequest();
      request.calendarId = 1;
      request.lseId = 1;
      request.locale = 'test'
      request.fromDateTime = '2011-06-12T19:00:00.0-0700'
      request.toDateTime = '2011-06-12T19:00:00.0-0700'
      request.calendarEventTypes = CalendarType.BILLING
      request.dateDefinitionTypes = DateDefinitionType.EASTER_DATE
      const qs: string = request.queryStringify();
      expect(qs).toEqual('calendarId=1&lseId=1&locale=test&fromDateTime=2011-06-12T19:00:00.0-0700&toDateTime=2011-06-12T19:00:00.0-0700&calendarEventTypes=BILLING&dateDefinitionTypes=EASTER_DATE');
    })
    it('handles undefined parameters', async () => {
      const request: GetCalendarDatesRequest = new GetCalendarDatesRequest();
      request.lseId = undefined;
      request.locale = undefined;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it('handles both pagination', async () => {
      const request: GetCalendarDatesRequest = new GetCalendarDatesRequest();
      request.calendarId = 1;
      request.pageCount = 22;
      request.pageStart = 33;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('calendarId=1&pageStart=33&pageCount=22');
    })
    it('handles both pagination via constructor', async () => {
      const request: GetCalendarDatesRequest = new GetCalendarDatesRequest({
        pageCount: 22,
        pageStart: 33
      });
      request.calendarId = 1;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('calendarId=1&pageStart=33&pageCount=22');
    })
  })
});

jest.setTimeout(20000)
describe('Calendar api integration tests', () => {
  let config = new GenabilityConfig({profileName:'unitTest'});
  let restClient = new CalendarApi(config);
  beforeAll(async () => {
    if (config.useCredentialsFromFile) {      
      const configFromFile = await config.getCredentialsFromFile();
      config = configFromFile || config;
    }
    restClient = new CalendarApi(config);
  });
  describe('get one endpoint', () => {
    it('returns the calendar for valid ID', async () => {
      const request: GetCalendarsRequest = new GetCalendarsRequest();
      const response: PagedResponse<Calendar> = await restClient.getCalendars(request);
      const { calendarId } = response.results[0];
      const { result } = await restClient.getCalendar(calendarId);
      expect(result && result.calendarId).toEqual(calendarId);
    })
  })
  describe('get n endpoint', () => {
    it('returns a list of calendars', async () => {
      const request: GetCalendarsRequest = new GetCalendarsRequest();
      const response: PagedResponse<Calendar> = await restClient.getCalendars(request);
      expect(response.status).toEqual('success');
      expect(response.type).toEqual(ResourceTypes.CALENDAR);
      expect(response.count).toBeGreaterThan(200);
      expect(response.results).toHaveLength(25);
      for(const calendar of response.results) {
        expect(isCalendar(calendar)).toBeTruthy();
      }
    })
  })
  describe('get calendar dates endpoint', () => {
    it('returns a list of calendar dates', async () => {
      const request: GetCalendarDatesRequest = new GetCalendarDatesRequest();
      const response: PagedResponse<CalendarDate> = await restClient.getCalendarDates(request);
      expect(response.status).toEqual('success');
      expect(response.type).toEqual(ResourceTypes.CALENDAR_DATE);
      expect(response.count).toBeGreaterThan(200);
      expect(response.results).toHaveLength(25);
      for(const calendarDate of response.results) {
        expect(isCalendarDate(calendarDate)).toBeTruthy();
      }
    })

    it('returns an error because of bad date', async () => {
      const request: GetCalendarDatesRequest = new GetCalendarDatesRequest();
      request.fromDateTime = 'not-a-valid-date'; // bad
      const response: PagedResponse<CalendarDate> = await restClient.getCalendarDates(request);
      expect(response.status).toEqual('error');
      expect(response.type).toEqual(ResourceTypes.Error);
      expect(response.count).toEqual(1);
      expect(response.errors).toHaveLength(1);
      expect(response.results).toHaveLength(0);
      response.errors?.forEach(responseError => {
        expect(isResponseError(responseError)).toBeTruthy();
      });
    })

  })
});