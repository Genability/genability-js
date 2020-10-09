import {
  RestApiClient,
  RestApiCredentials,
  PagedResponse,
  BasePagedRequest,
  AddParamCallback,
  GenabilityConfig,
} from '../rest-client';
import {
  Calendar, CalendarType, DateDefinitionType, CalendarDate
} from '../types';

export class GetCalendarsRequest extends BasePagedRequest {
  public lseId?: number;
  public calendarType?: CalendarType;

  addParams(addParam: AddParamCallback): void {
    addParam('lseId', this.lseId);
    addParam('calendarType', this.calendarType);
  }
}

export class GetCalendarDatesRequest extends BasePagedRequest {
  public calendarId?: number;
  public lseId?: number;
  public locale?: string;
  public fromDateTime?: string;
  public toDateTime?: string;
  public calendarEventTypes?: CalendarType;
  public dateDefinitionTypes?: DateDefinitionType;

  addParams(addParam: AddParamCallback): void {
    addParam('calendarId', this.calendarId);
    addParam('lseId', this.lseId);
    addParam('locale', this.locale);
    addParam('fromDateTime', this.fromDateTime);
    addParam('toDateTime', this.toDateTime);
    addParam('calendarEventTypes', this.calendarEventTypes);
    addParam('dateDefinitionTypes', this.dateDefinitionTypes);
  }
}

export class CalendarApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    const Config = GenabilityConfig.config();
    super(Config.baseURL, credentials);
  }

  public async getCalendars(request: GetCalendarsRequest): Promise<PagedResponse<Calendar>> {
    const response = await this.axiosInstance.get(`/rest/public/calendars`, { params: request } );
    return new PagedResponse(response.data);
  }

  public async getCalendar(calendarId: number): Promise<Calendar> {
    const response = await this.axiosInstance.get(`/rest/public/calendars/${calendarId}`);
    return response.data.results[0];
  }

  public async getCalendarDates(request: GetCalendarDatesRequest): Promise<PagedResponse<CalendarDate>> {
    const response = await this.axiosInstance.get(`/rest/public/calendars/dates`, { params: request } );
    return new PagedResponse(response.data);
  }
}
