import {
  RestApiClient,
  RestApiCredentials,
  PagedResponse,
  BasePagedRequest,
  AddParamCallback,
  Constant
} from '../rest-client';
import {
  Baseline, CustomerClass, ServiceType, MeasureUnit,
} from '../types';

export class GetBaselinesBestRequest extends BasePagedRequest {
  public postCode?: string;
  public country?: string;
  public addressString?: string;
  public lat?: number;
  public lng?: number;
  public customerClass?: CustomerClass;
  public buildingType?: string;
  public serviceType?: ServiceType;
  public buildingArea?: number;
  public buildingVintage?: string;
  public excludeMeasures?: boolean;
  public measuresUnit?: MeasureUnit;
  public groupBy?: string;
  public sizingKeyName?: string;
  public sizingDataValue?: number;
  public sizingUnit?: string;
  public intervalFromDateTime?: string;
  public intervalToDateTime?: string;

  addParams(addParam: AddParamCallback): void {
    addParam('postCode', this.postCode);
    addParam('country', this.country);
    addParam('addressString', this.addressString);
    addParam('lat', this.lat);
    addParam('lng', this.lng);
    addParam('customerClass', this.customerClass);
    addParam('buildingType', this.buildingType);
    addParam('serviceType', this.serviceType);
    addParam('buildingArea', this.buildingArea);
    addParam('buildingVintage', this.buildingVintage);
    addParam('excludeMeasures', this.excludeMeasures);
    addParam('measuresUnit', this.measuresUnit);
    addParam('groupBy', this.groupBy);
    addParam('sizingKeyName', this.sizingKeyName);
    addParam('sizingDataValue', this.sizingDataValue);
    addParam('sizingUnit', this.sizingUnit);
    addParam('intervalFromDateTime', this.intervalFromDateTime);
    addParam('intervalToDateTime', this.intervalToDateTime);
  }
}

export class TypicalBaselineApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    super(Constant.baseURL, credentials);
  }

  public async getBaselinesBest(request: GetBaselinesBestRequest): Promise<PagedResponse<Baseline>> {
    const response = await this.axiosInstance.get('/rest/v1/typicals/baselines/best', { params: request } );
    return new PagedResponse(response.data);
  }
}
