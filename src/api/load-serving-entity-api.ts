import {
  RestApiClient,
  PagedResponse,
  SingleResponse,
  BasePagedRequest,
  AddParamCallback
} from '../rest-client';
import {
  ServiceType,
  Ownership,
  LoadServingEntity
} from '../types';

export class GetLoadServingEntitiesRequest extends BasePagedRequest {
  public postCode?: string;
  public zipCode?: string;
  public country?: string;
  public serviceTypes?: ServiceType[];
  public ownerships?: Ownership[];

  addParams(addParam: AddParamCallback): void {
    addParam('postCode', this.postCode);
    addParam('zipCode', this.zipCode);
    addParam('country', this.country);
    addParam('serviceTypes', this.serviceTypes);
    addParam('ownerships', this.ownerships);
  }
}

export class LoadServingEntityApi extends RestApiClient {
  public async getLoadServingEntities(request: GetLoadServingEntitiesRequest): Promise<PagedResponse<LoadServingEntity>> {
    return this.getPaged(`/rest/public/lses`, { params: request } );
  }

  public async getLoadServingEntity(lseId: number): Promise<SingleResponse<LoadServingEntity>> {
    return this.getSingle(`/rest/public/lses/${lseId}`);
  }
}
