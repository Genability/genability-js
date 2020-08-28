import {
  RestApiClient,
  RestApiCredentials,
  PagedResponse,
  BasePagedRequest,
  AddParamCallback,
  GenabilityConfig
} from '../rest-client';
import {
  ServiceType,
  Ownership,
  LoadServingEntity,
  FieldsParameter
} from '../types';

export class GetLoadServingEntitiesRequest extends BasePagedRequest {
  public postCode?: string;
  public country?: string;
  public fields?: FieldsParameter;
  public serviceTypes?: ServiceType[];
  public ownerships?: Ownership[];

  addParams(addParam: AddParamCallback): void {
    addParam('postCode', this.postCode);
    addParam('country', this.country);
    addParam('fields', this.fields);
    addParam('serviceTypes', this.serviceTypes);
    addParam('ownerships', this.ownerships);
  }
}

export class LoadServingEntityApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    const Config = GenabilityConfig.config();
    super(Config.baseURL, credentials);
  }

  public async getLoadServingEntities(request: GetLoadServingEntitiesRequest): Promise<PagedResponse<LoadServingEntity>> {
    const response = await this.axiosInstance.get(`/rest/public/lses`, { params: request } );
    return new PagedResponse(response.data);
  }

  public async getLoadServingEntity(lseId: number): Promise<LoadServingEntity> {
    const response = await this.axiosInstance.get(`/rest/public/lses/${lseId}`);
    return response.data.results[0];
  }
}
