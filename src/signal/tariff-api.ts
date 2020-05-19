import {
  RestApiClient,
  RestApiCredentials,
  PagedResponse,
  BasePagedRequest,
  AddParamCallback,
  Constant
} from '../rest-client';
import {
  Tariff,
} from '../types';

export class GetTariffsRequest extends BasePagedRequest {
  public lseId?: number;
  public masterTariffId?: number;
  public effectiveOn?: string;
  public customerClasses?: string;
  public tariffTypes?: string;
  public chargeTypes?: string;

  addParams(addParam: AddParamCallback): void {
    addParam('lseId', this.lseId);
    addParam('masterTariffId', this.masterTariffId);
    addParam('effectiveOn', this.effectiveOn);
    addParam('customerClasses', this.customerClasses);
    addParam('tariffTypes', this.tariffTypes);
  }
}

export class TariffApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    super(Constant.baseURL, credentials);
  }

  public async getTariffs(request: GetTariffsRequest): Promise<PagedResponse<Tariff>> {
    const response = await this.axiosInstance.get(`/rest/public/tariffs`, { params: request } );
    return new PagedResponse(response.data);
  }

  public async getTariff(masterTariffId: number): Promise<Tariff> {
    const response = await this.axiosInstance.get(`/rest/public/tariffs/${masterTariffId}`);
    return response.data.results[0];
  }
}

