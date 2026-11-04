import {
  RestApiClient,
  PagedResponse,
  SingleResponse,
  BasePagedRequest,
  AddParamCallback,
} from '../rest-client';
import {
  Account,
  AccountIdentifier,
  AccountProperty,
  AccountTariff,
  ServiceType,
  Tariff,
  TariffRate,
  toTariffFromApi,
} from '../types';
import { toTariffRateFromApi } from '../types/account';

import { AxiosResponse } from 'axios';

const ACCOUNTS_PATH = '/rest/v1/accounts';

/**
 * Either an AccountIdentifier or a plain string, which is treated as the
 * Arcadia generated accountId.
 */
export type AccountRef = AccountIdentifier | string;

/**
 * Builds the base URI for one account, using /accounts/{accountId} or
 * /accounts/pid/{providerAccountId}. Throws when neither id is set so that a
 * missing id never turns into a request against the account collection.
 */
export function accountPath(account: AccountRef): string {
  if(typeof account === 'string') {
    if(account.length > 0) {
      return `${ACCOUNTS_PATH}/${encodeURIComponent(account)}`;
    }
  } else if(account) {
    if(typeof account.accountId === 'string' && account.accountId.length > 0) {
      return `${ACCOUNTS_PATH}/${encodeURIComponent(account.accountId)}`;
    }
    if(typeof account.providerAccountId === 'string' && account.providerAccountId.length > 0) {
      return `${ACCOUNTS_PATH}/pid/${encodeURIComponent(account.providerAccountId)}`;
    }
  }
  throw new Error('An accountId or providerAccountId is required');
}

function requireAccountId(accountId: string): string {
  if(typeof accountId !== 'string' || accountId.length === 0) {
    throw new Error('An accountId is required');
  }
  return accountId;
}

function mapResults(response: AxiosResponse, mapper?: (json: unknown) => unknown): void {
  const data = response && response.data;
  if(!data || typeof data !== 'object') {
    return;
  }
  // Some account endpoints (e.g. Delete Account Property) return
  // "results": null on success. Normalize to [] so response.result works.
  if(data.results === null && data.status !== 'error') {
    data.results = [];
  }
  if(!mapper || data.status === 'error' || !Array.isArray(data.results)) {
    return;
  }
  data.results = data.results.map((result: unknown) =>
    (result !== null && typeof result === 'object') ? mapper(result) : result
  );
}

/**
 * Normalizes tariffs embedded in Account results (rate chargeClass strings
 * become ChargeClass arrays, as in the Tariffs API).
 */
export function accountResponseInterceptor(response: AxiosResponse): void {
  mapResults(response, (json) => {
    const account = json as Account;
    if(Array.isArray(account.tariffs)) {
      account.tariffs = account.tariffs.map((tariff) => toTariffFromApi(tariff));
    }
    return account;
  });
}

export function accountPropertyResponseInterceptor(response: AxiosResponse): void {
  mapResults(response);
}

export function accountTariffResponseInterceptor(response: AxiosResponse): void {
  mapResults(response, (json) => toTariffFromApi(json));
}

export function accountRateResponseInterceptor(response: AxiosResponse): void {
  mapResults(response, (json) => toTariffRateFromApi(json));
}

/**
 * Query parameters for Get Accounts. Search (search, searchOn, startsWith,
 * endsWith, isRegex), sort (sortOn, sortOrder), pagination and fields are
 * inherited from BasePagedRequest.
 */
export class GetAccountsRequest extends BasePagedRequest {
  addParams(addParam: AddParamCallback): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    // no-op, Get Accounts only takes the standard paged, search, sort and fields params
  }
}

/**
 * Query parameters for Get One Account. Only `fields` (e.g. Fields.EXTENDED)
 * is meaningful here.
 */
export class GetAccountRequest extends BasePagedRequest {
  addParams(addParam: AddParamCallback): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    // no-op, only the inherited fields param applies
  }
}

/**
 * Query parameters for Get Available Tariff Rate Plans for an Account.
 */
export class GetAccountTariffsRequest extends BasePagedRequest {
  public effectiveOn?: string;
  public openOn?: string;
  public populateRates?: boolean;
  public populateDocuments?: boolean;
  public hasNetMetering?: boolean;
  public hasTimeOfUseRates?: boolean;
  public hasTieredRates?: boolean;
  public hasContractedRates?: boolean;
  public filterByApplicability?: boolean;
  /**
   * Sent as applicabilityFilters[key]=value, e.g. { solarPvEligible: true }.
   * Use together with filterByApplicability.
   */
  public applicabilityFilters?: { [key: string]: string | number | boolean };
  public bundleRates?: boolean;

  addParams(addParam: AddParamCallback): void {
    addParam('effectiveOn', this.effectiveOn);
    addParam('openOn', this.openOn);
    addParam('populateRates', this.populateRates);
    addParam('populateDocuments', this.populateDocuments);
    addParam('hasNetMetering', this.hasNetMetering);
    addParam('hasTimeOfUseRates', this.hasTimeOfUseRates);
    addParam('hasTieredRates', this.hasTieredRates);
    addParam('hasContractedRates', this.hasContractedRates);
    addParam('filterByApplicability', this.filterByApplicability);
    if(this.applicabilityFilters) {
      for(const [key, value] of Object.entries(this.applicabilityFilters)) {
        addParam(`applicabilityFilters[${key}]`, value);
      }
    }
    addParam('bundleRates', this.bundleRates);
  }
}

/**
 * Query parameters for Get Account Rates.
 */
export class GetAccountRatesRequest extends BasePagedRequest {
  public serviceType?: ServiceType;
  public fromDateTime?: string;
  public toDateTime?: string;
  public lookupVariableRates?: boolean;
  public bundleRates?: boolean;

  addParams(addParam: AddParamCallback): void {
    addParam('serviceType', this.serviceType);
    addParam('fromDateTime', this.fromDateTime);
    addParam('toDateTime', this.toDateTime);
    addParam('lookupVariableRates', this.lookupVariableRates);
    addParam('bundleRates', this.bundleRates);
  }
}

/**
 * Query parameters for Delete an Account Tariff. effectiveDate is required by
 * the API when the account has more than one tariff for the service type.
 */
export class DeleteAccountTariffRequest extends BasePagedRequest {
  public effectiveDate?: string;

  addParams(addParam: AddParamCallback): void {
    addParam('effectiveDate', this.effectiveDate);
  }
}

/**
 * Accounts, Account Properties, Account Tariffs and Account Rates APIs.
 * Methods that take an AccountRef accept a plain accountId string,
 * { accountId } or { providerAccountId } (sent as /accounts/pid/{id}).
 */
export class AccountApi extends RestApiClient {
  // Accounts

  public async getAccounts(request?: GetAccountsRequest): Promise<PagedResponse<Account>> {
    return this.getPaged(ACCOUNTS_PATH, { params: request }, accountResponseInterceptor);
  }

  public async getAccount(account: AccountRef, request?: GetAccountRequest): Promise<SingleResponse<Account>> {
    return this.getSingle(accountPath(account), { params: request }, accountResponseInterceptor);
  }

  /**
   * Creates an account (POST). Use updateAccount to upsert by providerAccountId.
   */
  public async addAccount(account: Account): Promise<SingleResponse<Account>> {
    return this.post(ACCOUNTS_PATH, account, undefined, accountResponseInterceptor);
  }

  /**
   * Updates an account (PUT), or creates it when providerAccountId is set and
   * no account has that id yet. Fields that are not passed are left unchanged.
   */
  public async updateAccount(account: Account): Promise<SingleResponse<Account>> {
    if(!account || (!account.accountId && !account.providerAccountId)) {
      throw new Error('updateAccount requires an accountId or providerAccountId');
    }
    return this.put(ACCOUNTS_PATH, account, undefined, accountResponseInterceptor);
  }

  /**
   * Deletes an account. The account record remains with status DELETED.
   */
  public async deleteAccount(account: AccountRef): Promise<SingleResponse<Account>> {
    return this.delete(accountPath(account), undefined, accountResponseInterceptor);
  }

  // Account Properties

  public async getAccountProperties(accountId: string): Promise<PagedResponse<AccountProperty>> {
    return this.getPaged(`${accountPath(requireAccountId(accountId))}/properties`, undefined, accountPropertyResponseInterceptor);
  }

  /**
   * Adds or updates one property or header field (e.g. buildingArea,
   * accountName, masterTariffId) on an account.
   */
  public async setAccountProperty(account: AccountRef, property: AccountProperty): Promise<SingleResponse<AccountProperty>> {
    return this.put(`${accountPath(account)}/properties`, property, undefined, accountPropertyResponseInterceptor);
  }

  public async deleteAccountProperty(accountId: string, keyName: string): Promise<SingleResponse<AccountProperty>> {
    if(typeof keyName !== 'string' || keyName.length === 0) {
      throw new Error('A keyName is required');
    }
    return this.delete(`${accountPath(requireAccountId(accountId))}/properties/${encodeURIComponent(keyName)}`, undefined, accountPropertyResponseInterceptor);
  }

  // Account Tariffs

  /**
   * Returns the tariff rate plans available to the account. The account needs
   * an address with a zip and a customerClass property.
   */
  public async getAccountTariffs(account: AccountRef, request?: GetAccountTariffsRequest): Promise<PagedResponse<Tariff>> {
    return this.getPaged(`${accountPath(account)}/tariffs`, { params: request }, accountTariffResponseInterceptor);
  }

  public async setAccountTariff(account: AccountRef, tariff: AccountTariff): Promise<SingleResponse<Tariff>> {
    return this.put(`${accountPath(account)}/tariffs`, tariff, undefined, accountTariffResponseInterceptor);
  }

  public async deleteAccountTariff(account: AccountRef, request?: DeleteAccountTariffRequest): Promise<SingleResponse<Tariff>> {
    return this.delete(`${accountPath(account)}/tariffs`, { params: request }, accountTariffResponseInterceptor);
  }

  // Account Rates

  public async getAccountRates(account: AccountRef, request?: GetAccountRatesRequest): Promise<PagedResponse<TariffRate>> {
    return this.getPaged(`${accountPath(account)}/rates`, { params: request }, accountRateResponseInterceptor);
  }
}
