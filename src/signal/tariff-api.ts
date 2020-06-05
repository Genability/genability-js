import {
  RestApiClient,
  RestApiCredentials,
  PagedResponse,
  BasePagedRequest,
  AddParamCallback,
  GenabilityConfig
} from '../rest-client';
import {
  Tariff, CustomerClass, TariffType, ChargeType,
} from '../types';

export class GetTariffsRequest extends BasePagedRequest {
  public lseId?: number;
  public masterTariffId?: number;
  public effectiveOn?: string;
  public customerClasses?: CustomerClass[];
  public tariffTypes?: TariffType[];
  public chargeTypes?: ChargeType[];

  addParams(addParam: AddParamCallback): void {
    addParam('lseId', this.lseId);
    addParam('masterTariffId', this.masterTariffId);
    addParam('effectiveOn', this.effectiveOn);
    addParam('customerClasses', this.customerClasses);
    addParam('tariffTypes', this.tariffTypes);
    addParam('chargeTypes', this.chargeTypes);
  }
}

export class TariffApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    const Config = GenabilityConfig.config();
    super(Config.baseURL, credentials);
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
