import {
  RestApiClient,
  PagedResponse,
  BasePagedRequest,
  AddParamCallback,
  SingleResponse
} from '../rest-client';
import {
  Tariff, CustomerClass, TariffType, ChargeType, ServiceType, PrivacyFlag, toTariffFromApi
} from '../types';

import { AxiosResponse } from 'axios';

export class GetTariffsRequest extends BasePagedRequest {
  public lseId?: number;
  public masterTariffId?: number;
  public effectiveOn?: string;
  public customerClasses?: CustomerClass[];
  public serviceTypes?: ServiceType[];
  public tariffTypes?: TariffType[];
  public chargeTypes?: ChargeType[];
  public openOn?: string;
  public isActive?: boolean;
  public fromDateTime?: string;
  public toDateTime?: string;
  public privacyFlags?: PrivacyFlag[];
  public zipCode?: string;
  public postCode?: string;
  public country?: string;
  public addressString?: string;
  public riderId?: number;
  public populateProperties?: boolean;
  public populateRates?: boolean;
  public populateDocuments?: boolean;
  public consumption?: number;
  public demand?: number;
  public hasNetMetering?: boolean;
  public hasTimeOfUseRates?: boolean;
  public hasTieredRates?: boolean;
  public hasContractedRates?: boolean;
  public bundleRates?: boolean;
  public applicableRatesOnly?: boolean;
  public filterRiderRates?: boolean;
  public territoryId?: number;

  addParams(addParam: AddParamCallback): void {
    addParam('lseId', this.lseId);
    addParam('masterTariffId', this.masterTariffId);
    addParam('effectiveOn', this.effectiveOn);
    addParam('customerClasses', this.customerClasses);
    addParam('serviceTypes', this.serviceTypes);
    addParam('tariffTypes', this.tariffTypes);
    addParam('chargeTypes', this.chargeTypes);
    addParam('openOn', this.openOn);
    addParam('isActive', this.isActive);
    addParam('fromDateTime', this.fromDateTime);
    addParam('toDateTime', this.toDateTime);
    addParam('privacyFlags', this.privacyFlags);
    addParam('zipCode', this.zipCode);
    addParam('postCode', this.postCode);
    addParam('country', this.country);
    addParam('addressString', this.addressString);
    addParam('riderId', this.riderId);
    addParam('populateProperties', this.populateProperties);
    addParam('populateRates', this.populateRates);
    addParam('populateDocuments', this.populateDocuments);
    addParam('consumption', this.consumption);
    addParam('demand', this.demand);
    addParam('hasNetMetering', this.hasNetMetering);
    addParam('hasTimeOfUseRates', this.hasTimeOfUseRates);
    addParam('hasTieredRates', this.hasTieredRates);
    addParam('hasContractedRates', this.hasContractedRates);
    addParam('bundleRates', this.bundleRates);
    addParam('applicableRatesOnly', this.applicableRatesOnly);
    addParam('filterRiderRates', this.filterRiderRates);
    addParam('territoryId', this.territoryId);
  }
}

export class GetTariffRequest extends BasePagedRequest {
  public populateProperties?: boolean;
  public populateRates?: boolean;
  public populateDocuments?: boolean;
  public effectiveOn?: string;
  public territoryId?: number;
  public bundleRates?: boolean;
  public applicableRatesOnly?: boolean;
  public lookupVariableRates?: boolean;

  addParams(addParam: AddParamCallback): void {
    addParam('populateProperties', this.populateProperties);
    addParam('populateRates', this.populateRates);
    addParam('populateDocuments', this.populateDocuments);
    addParam('effectiveOn', this.effectiveOn);
    addParam('territoryId', this.territoryId);
    addParam('bundleRates', this.bundleRates);
    addParam('applicableRatesOnly', this.applicableRatesOnly);
    addParam('lookupVariableRates', this.lookupVariableRates)
  }
}

export function tariffResponseInterceptor(response: AxiosResponse): void {
  response.data.results = response.data.results.map((tariff: string) => {
    // Convert each JSON tariff to Tariff object
    return toTariffFromApi(tariff)
  });
}

export class TariffApi extends RestApiClient {
  public async getTariffs(request?: GetTariffsRequest): Promise<PagedResponse<Tariff>> {
    return this.getPaged('/rest/public/tariffs', { params: request }, tariffResponseInterceptor );
  }

  public async getTariff(masterTariffId: number, request?: GetTariffRequest): Promise<SingleResponse<Tariff>> {
    return this.getSingle(`/rest/public/tariffs/${masterTariffId}`, { params: request }, tariffResponseInterceptor);
  }

  public async getTariffHistory(masterTariffId: number): Promise<SingleResponse<Tariff>> {
    return this.getSingle(`/rest/public/tariffs/${masterTariffId}/history`);
  }
}
