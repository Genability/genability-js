import {
  RestApiClient,
  PagedResponse,
  SingleResponse,
  DefaultPagedRequest
} from '../rest-client';
import {
  TimeOfUseGroup,
  TimeOfUseInterval
} from '../types';

export class TimeOfUseApi extends RestApiClient {
  public async getTimeOfUseGroups(lseId: number, request?: DefaultPagedRequest): Promise<PagedResponse<TimeOfUseGroup>> {
    return this.getPaged(`/rest/public/lses/${lseId}/tougroups`, { params: request });
  }

  public async getTimeOfUseGroup(lseId: number, touGroupId: number): Promise<SingleResponse<TimeOfUseGroup>> {
    return this.getSingle(`/rest/public/timeofuses/${lseId}/${touGroupId}`);
  }

  public async getTimeOfUseGroupIntervals(lseId: number, touGroupId: number): Promise<PagedResponse<TimeOfUseInterval>> {
    return this.getPaged(`/rest/public/timeofuses/${lseId}/${touGroupId}/intervals`);
  }
}