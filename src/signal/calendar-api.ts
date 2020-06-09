import {
  RestApiClient,
  RestApiCredentials,
  PagedResponse,
  BasePagedRequest,
  AddParamCallback,
  Constant
} from '../rest-client';
import {
  Calendar, CalendarType,
} from '../types';

export class GetCalendarsRequest extends BasePagedRequest {
  public lseId?: number;
  public calendarType?: CalendarType;

  addParams(addParam: AddParamCallback): void {
    addParam('lseId', this.lseId);
    addParam('calendarType', this.calendarType);
  }
}

export class CalendarApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    super(Constant.baseURL, credentials);
  }

  public async getCalendars(request: GetCalendarsRequest): Promise<PagedResponse<Calendar>> {
    const response = await this.axiosInstance.get(`/rest/public/calendars`, { params: request } );
    return new PagedResponse(response.data);
  }

  public async getCalendar(calendarId: number): Promise<Calendar> {
    const response = await this.axiosInstance.get(`/rest/public/calendars/${calendarId}`);
    return response.data.results[0];
  }
}

