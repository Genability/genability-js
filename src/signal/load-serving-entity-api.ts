import {
  RestApiClient,
  RestApiCredentials,
  PagedResponse,
  BasePagedRequest,
  AddParamCallback,
  Constant
} from '../rest-client';
import {
  ServiceType,
  OfferingType,
  Ownership,
  LoadServingEntity
} from '../types';

export class GetLoadServingEntityRequest extends BasePagedRequest {
  public postCode?: string;
  public country?: string;
  public fields?: string;
  public serviceTypes?: ServiceType;
  public ownerships?: Ownership;
  public offeringType?: OfferingType;

  addParams(addParam: AddParamCallback): void {
    addParam('postCode', this.postCode);
    addParam('country', this.country);
    addParam('fields', this.fields);
    addParam('serviceTypes', this.serviceTypes);
    addParam('ownerships', this.ownerships);
    addParam('offeringType', this.offeringType);
  }
}

export class LoadServingEntityApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    super(Constant.baseURL, credentials);
  }

  public async getLoadServingEntities(request: GetLoadServingEntityRequest): Promise<PagedResponse<LoadServingEntity>> {
    const response = await this.axiosInstance.get(`/rest/public/lses`, { params: request } );
    return new PagedResponse(response.data);
  }

  public async getLoadServingEntity(lseId: number): Promise<LoadServingEntity> {
    const response = await this.axiosInstance.get(`/rest/public/lses/${lseId}`);
    return response.data.results[0];
  }
}

