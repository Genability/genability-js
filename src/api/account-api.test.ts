import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import {
  AccountApi,
  GetAccountsRequest,
  GetAccountRequest,
  GetAccountTariffsRequest,
  GetAccountRatesRequest,
  DeleteAccountTariffRequest,
  accountPath,
} from './account-api';
import { GenabilityConfig, Fields, SortOrder } from '../rest-client';
import {
  Account,
  AccountStatus,
  AccountType,
  ChargeClass,
  ResourceTypes,
  ServiceType,
  isAccount,
  isAccountProperty,
} from '../types';
import { Genability } from '../genability';

// Fixtures below are the example payloads from the Arcadia Switch API reference
// (https://docs.arcadia.com/v2022-12-21-Switch/reference/account-apis), trimmed.

const accountJson = {
  accountId: 'c2a630e8-c99a-4347-a460-d116e83439d2',
  providerAccountId: 'api-eg-01',
  accountName: 'Example 1 API Home',
  customerOrgId: null,
  customerOrgName: null,
  address: {
    addressString: '221 Main Street, San Francisco, CA 94105',
    address1: '221 Main St',
    city: 'San Francisco County',
    state: 'CA',
    zip: '94105',
    country: 'US',
    lon: -122.3920575,
    lat: 37.7904127
  },
  owner: null,
  status: 'ACTIVE',
  type: null,
  properties: {
    customerClass: { keyName: 'customerClass', dataType: 'CHOICE', dataValue: '1' }
  },
  tariffs: [{
    masterTariffId: 522,
    tariffCode: 'E-1',
    tariffName: 'Residential',
    lseId: 734,
    lseName: 'Pacific Gas & Electric Co',
    customerLikelihood: 74.03,
    endDate: null,
    timeZone: 'US/Pacific',
    billingPeriod: 'MONTHLY',
    currency: 'USD',
    rates: [{ tariffRateId: 1, rateName: 'Energy', chargeClass: 'DISTRIBUTION,TRANSMISSION' }]
  }]
};

const accountTariffJson = {
  tariffId: 3155887,
  masterTariffId: 522,
  tariffCode: 'E-1',
  tariffName: 'Residential',
  lseId: 734,
  lseName: 'Pacific Gas & Electric Co',
  customerClass: 'RESIDENTIAL',
  effectiveDate: '2013-01-01',
  isActive: true,
  rates: [{ tariffRateId: 2, rateName: 'Supply', chargeClass: 'SUPPLY' }]
};

const accountRateJson = {
  tariffRateId: 17286172,
  tariffId: 3208943,
  rateGroupName: 'Supply Charges',
  rateName: 'MSC Rate - Zone J',
  fromDateTime: '2015-09-01T00:00:00-04:00',
  toDateTime: '2015-09-02T00:00:00-04:00',
  chargeType: 'CONSUMPTION_BASED',
  chargeClass: 'SUPPLY,CONTRACTED',
  chargePeriod: 'MONTHLY',
  variableRateKey: 'marketSupplyChargeResidentialZoneJ',
  rateBands: [{ tariffRateBandId: 10648952, tariffRateId: 17286172, rateAmount: 9.453, rateUnit: 'COST_PER_UNIT', isCredit: false }]
};

function success(type: string, results: unknown[] | null): unknown {
  return { status: 'success', count: results ? results.length : 0, type, results };
}

interface CapturedRequest {
  method?: string;
  url: string;
  data: unknown;
  authorization?: string;
}

/**
 * Runs requests through the real axios pipeline (base URL, params serializer,
 * headers) and answers them with a canned payload instead of the network.
 */
function stubTransport(api: AccountApi, status: number, payload: unknown): CapturedRequest[] {
  const captured: CapturedRequest[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instance = (api as any).axiosInstance;
  instance.defaults.adapter = async (config: InternalAxiosRequestConfig): Promise<AxiosResponse> => {
    captured.push({
      method: config.method,
      url: axios.getUri(config),
      data: config.data === undefined ? undefined : JSON.parse(config.data),
      authorization: config.headers ? String(config.headers.Authorization) : undefined,
    });
    // Return a fresh copy so interceptors can mutate it.
    return { data: JSON.parse(JSON.stringify(payload)), status, statusText: 'OK', headers: {}, config };
  };
  return captured;
}

function newApi(): AccountApi {
  return new AccountApi(new GenabilityConfig({ credentials: { appId: 'test-app-id', appKey: 'test-app-key' } }));
}

const BASE = 'https://api.genability.com/rest/v1/accounts';

describe('Account request params', () => {
  it('GetAccountsRequest handles no parameters', () => {
    expect(new GetAccountsRequest().queryStringify()).toEqual('');
  });
  it('GetAccountsRequest handles search, sort, paging and fields', () => {
    const request = new GetAccountsRequest({ pageStart: 0, pageCount: 25 });
    request.search = 'Peets';
    request.searchOn = ['accountName', 'customerOrgName'];
    request.startsWith = true;
    request.sortOn = ['accountName'];
    request.sortOrder = [SortOrder.DESC];
    request.fields = Fields.EXTENDED;
    expect(request.queryStringify()).toEqual(
      'pageStart=0&pageCount=25&search=Peets&searchOn=accountName,customerOrgName&startsWith=true&sortOn=accountName&sortOrder=DESC&fields=ext'
    );
  });
  it('GetAccountTariffsRequest handles filters and applicabilityFilters', () => {
    const request = new GetAccountTariffsRequest();
    request.effectiveOn = '2026-01-01';
    request.populateRates = true;
    request.hasTimeOfUseRates = false;
    request.filterByApplicability = true;
    request.applicabilityFilters = { solarPvEligible: true };
    request.bundleRates = true;
    expect(request.queryStringify()).toEqual(
      'effectiveOn=2026-01-01&populateRates=true&hasTimeOfUseRates=false&filterByApplicability=true&applicabilityFilters[solarPvEligible]=true&bundleRates=true'
    );
  });
  it('GetAccountRatesRequest handles its parameters', () => {
    const request = new GetAccountRatesRequest();
    request.serviceType = ServiceType.SOLAR_PV;
    request.fromDateTime = '2015-09-01T00:00:00-04:00';
    request.lookupVariableRates = true;
    expect(request.queryStringify()).toEqual(
      'serviceType=SOLAR_PV&fromDateTime=2015-09-01T00:00:00-04:00&lookupVariableRates=true'
    );
  });
  it('DeleteAccountTariffRequest handles effectiveDate', () => {
    const request = new DeleteAccountTariffRequest({});
    expect(request.queryStringify()).toEqual('');
    request.effectiveDate = '2012-12-01';
    expect(request.queryStringify()).toEqual('effectiveDate=2012-12-01');
  });
});

describe('accountPath', () => {
  it('uses accountId from a string or object', () => {
    expect(accountPath('abc123')).toEqual('/rest/v1/accounts/abc123');
    expect(accountPath({ accountId: 'abc123' })).toEqual('/rest/v1/accounts/abc123');
  });
  it('uses the pid path for providerAccountId', () => {
    expect(accountPath({ providerAccountId: 'api-eg-01' })).toEqual('/rest/v1/accounts/pid/api-eg-01');
  });
  it('encodes ids so they cannot change the path', () => {
    expect(accountPath({ providerAccountId: 'store #4/east wing' })).toEqual('/rest/v1/accounts/pid/store%20%234%2Feast%20wing');
  });
  it('throws when no id is given', () => {
    expect(() => accountPath('')).toThrow('accountId or providerAccountId');
    expect(() => accountPath({ accountId: '' })).toThrow('accountId or providerAccountId');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => accountPath({} as any)).toThrow('accountId or providerAccountId');
  });
});

describe('Accounts API', () => {
  it('getAccounts sends search params and returns typed accounts', async () => {
    const api = newApi();
    const calls = stubTransport(api, 200, success('Account', [accountJson]));
    const request = new GetAccountsRequest({ pageStart: 0, pageCount: 25 });
    request.search = 'Peets';
    const response = await api.getAccounts(request);
    expect(calls).toHaveLength(1);
    expect(calls[0].method).toEqual('get');
    expect(calls[0].url).toEqual(`${BASE}?pageStart=0&pageCount=25&search=Peets`);
    expect(calls[0].authorization).toEqual(`Basic ${Buffer.from('test-app-id:test-app-key').toString('base64')}`);
    expect(response.status).toEqual('success');
    expect(response.type).toEqual(ResourceTypes.ACCOUNT);
    expect(isAccount(response.results[0])).toBeTruthy();
    expect(response.results[0].status).toEqual(AccountStatus.ACTIVE);
    // Embedded tariff rates get the same chargeClass normalization as the Tariffs API
    const tariffs = response.results[0].tariffs || [];
    expect(tariffs[0].rates && tariffs[0].rates[0].chargeClass).toEqual([ChargeClass.DISTRIBUTION, ChargeClass.TRANSMISSION]);
  });

  it('getAccount works with accountId, providerAccountId and fields', async () => {
    const api = newApi();
    const calls = stubTransport(api, 200, success('Account', [accountJson]));
    const byId = await api.getAccount('c2a630e8-c99a-4347-a460-d116e83439d2');
    const byPid = await api.getAccount({ providerAccountId: 'api-eg-01' }, new GetAccountRequest({ fields: Fields.EXTENDED }));
    expect(calls.map(c => c.url)).toEqual([
      `${BASE}/c2a630e8-c99a-4347-a460-d116e83439d2`,
      `${BASE}/pid/api-eg-01?fields=ext`,
    ]);
    expect(byId.result && byId.result.accountId).toEqual(accountJson.accountId);
    expect(byPid.result && byPid.result.providerAccountId).toEqual('api-eg-01');
  });

  it('addAccount POSTs the account body', async () => {
    const api = newApi();
    const calls = stubTransport(api, 200, success('Account', [accountJson]));
    const account: Account = {
      providerAccountId: 'api-eg-01',
      accountName: 'Example 1 API Home',
      type: AccountType.POTENTIAL,
      address: { addressString: '221 Main Street, San Francisco, CA 94105' },
      properties: { customerClass: { keyName: 'customerClass', dataValue: '1' } },
    };
    const response = await api.addAccount(account);
    expect(calls[0].method).toEqual('post');
    expect(calls[0].url).toEqual(BASE);
    expect(calls[0].data).toEqual(account);
    expect(response.result && response.result.accountId).toEqual(accountJson.accountId);
  });

  it('updateAccount PUTs to the collection for upserts', async () => {
    const api = newApi();
    const calls = stubTransport(api, 200, success('Account', [accountJson]));
    await api.updateAccount({ providerAccountId: 'api-eg-008', owner: 'Mr Sun' });
    expect(calls[0].method).toEqual('put');
    expect(calls[0].url).toEqual(BASE);
    expect(calls[0].data).toEqual({ providerAccountId: 'api-eg-008', owner: 'Mr Sun' });
  });

  it('updateAccount rejects without an id and sends nothing', async () => {
    const api = newApi();
    const calls = stubTransport(api, 200, success('Account', [accountJson]));
    await expect(api.updateAccount({ accountName: 'no id' })).rejects.toThrow('accountId or providerAccountId');
    expect(calls).toHaveLength(0);
  });

  it('deleteAccount sends DELETE by accountId or providerAccountId', async () => {
    const api = newApi();
    const deleted = { ...accountJson, status: 'DELETED' };
    const calls = stubTransport(api, 200, success('Account', [deleted]));
    await api.deleteAccount('abc123');
    const response = await api.deleteAccount({ providerAccountId: 'abc 123' });
    expect(calls.map(c => [c.method, c.url])).toEqual([
      ['delete', `${BASE}/abc123`],
      ['delete', `${BASE}/pid/abc%20123`],
    ]);
    expect(response.result && response.result.status).toEqual(AccountStatus.DELETED);
  });

  it('returns API errors on the response instead of throwing', async () => {
    const api = newApi();
    stubTransport(api, 404, {
      status: 'error',
      count: 1,
      type: 'Error',
      results: [{ code: 'ObjectNotFound', message: 'Account not found', objectName: 'Account' }]
    });
    const response = await api.getAccount({ providerAccountId: 'missing' });
    expect(response.result).toBeNull();
    expect(response.errors && response.errors[0].code).toEqual('ObjectNotFound');
  });
});

describe('Account Properties API', () => {
  it('getAccountProperties GETs the properties of an account', async () => {
    const api = newApi();
    const calls = stubTransport(api, 200, success('PropertyData', [
      { keyName: 'customerClass', dataType: 'CHOICE', dataValue: '1' },
      { keyName: 'buildingArea', dataType: null, dataValue: '2000' },
    ]));
    const response = await api.getAccountProperties('9a6035d8-94cd-4d66-8a94-eac573fec42e');
    expect(calls[0].url).toEqual(`${BASE}/9a6035d8-94cd-4d66-8a94-eac573fec42e/properties`);
    expect(response.type).toEqual(ResourceTypes.PROPERTY_DATA);
    expect(response.results.every(isAccountProperty)).toBeTruthy();
    await expect(api.getAccountProperties('')).rejects.toThrow('accountId');
  });

  it('setAccountProperty PUTs one property', async () => {
    const api = newApi();
    const calls = stubTransport(api, 200, success('PropertyData', [{ keyName: 'masterTariffId', dataType: null, dataValue: '522', accuracy: 100 }]));
    const response = await api.setAccountProperty({ providerAccountId: 'api-eg-008' }, { keyName: 'masterTariffId', dataValue: '522', accuracy: 100 });
    expect(calls[0].method).toEqual('put');
    expect(calls[0].url).toEqual(`${BASE}/pid/api-eg-008/properties`);
    expect(calls[0].data).toEqual({ keyName: 'masterTariffId', dataValue: '522', accuracy: 100 });
    expect(response.result && response.result.accuracy).toEqual(100);
  });

  it('deleteAccountProperty handles the documented "results": null response', async () => {
    const api = newApi();
    const calls = stubTransport(api, 200, success('PropertyData', null));
    const response = await api.deleteAccountProperty('123abc', 'customerClass');
    expect(calls[0].method).toEqual('delete');
    expect(calls[0].url).toEqual(`${BASE}/123abc/properties/customerClass`);
    expect(response.status).toEqual('success');
    expect(response.results).toEqual([]);
    expect(response.result).toBeNull();
    await expect(api.deleteAccountProperty('123abc', '')).rejects.toThrow('keyName');
  });
});

describe('Account Tariffs API', () => {
  it('getAccountTariffs sends filters and normalizes rates', async () => {
    const api = newApi();
    const calls = stubTransport(api, 200, success('Tariff', [accountTariffJson]));
    const request = new GetAccountTariffsRequest();
    request.populateRates = true;
    const response = await api.getAccountTariffs({ providerAccountId: 'example_account' }, request);
    expect(calls[0].url).toEqual(`${BASE}/pid/example_account/tariffs?populateRates=true`);
    expect(response.type).toEqual(ResourceTypes.TARIFF);
    const rates = response.results[0].rates || [];
    expect(rates[0].chargeClass).toEqual([ChargeClass.SUPPLY]);
  });

  it('setAccountTariff PUTs the tariff assignment', async () => {
    const api = newApi();
    const calls = stubTransport(api, 200, success('Tariff', [{ masterTariffId: 522, customerLikelihood: 100, endDate: null }]));
    const response = await api.setAccountTariff('1c06e306-bbb0-473a-973c-93d947f0761b', {
      masterTariffId: 522,
      serviceType: ServiceType.ELECTRICITY,
      customerLikelihood: 100,
      effectiveDate: null,
    });
    expect(calls[0].method).toEqual('put');
    expect(calls[0].url).toEqual(`${BASE}/1c06e306-bbb0-473a-973c-93d947f0761b/tariffs`);
    expect(calls[0].data).toEqual({ masterTariffId: 522, serviceType: 'ELECTRICITY', customerLikelihood: 100, effectiveDate: null });
    expect(response.result && response.result.masterTariffId).toEqual(522);
  });

  it('deleteAccountTariff sends effectiveDate', async () => {
    const api = newApi();
    const calls = stubTransport(api, 200, success('Tariff', [{ masterTariffId: 522 }]));
    await api.deleteAccountTariff('1c06e306', new DeleteAccountTariffRequest({}));
    const request = new DeleteAccountTariffRequest();
    request.effectiveDate = '2012-12-01';
    await api.deleteAccountTariff({ providerAccountId: 'api-eg-008' }, request);
    expect(calls.map(c => [c.method, c.url])).toEqual([
      ['delete', `${BASE}/1c06e306/tariffs`],
      ['delete', `${BASE}/pid/api-eg-008/tariffs?effectiveDate=2012-12-01`],
    ]);
  });
});

describe('Account Rates API', () => {
  it('getAccountRates sends params and converts chargeClass to an array', async () => {
    const api = newApi();
    const calls = stubTransport(api, 200, success('TariffRate', [accountRateJson, { ...accountRateJson, chargeClass: undefined }]));
    const request = new GetAccountRatesRequest();
    request.lookupVariableRates = true;
    const response = await api.getAccountRates({ providerAccountId: 'rate-example' }, request);
    expect(calls[0].url).toEqual(`${BASE}/pid/rate-example/rates?lookupVariableRates=true`);
    expect(response.type).toEqual(ResourceTypes.TARIFF_RATE);
    expect(response.results[0].chargeClass).toEqual([ChargeClass.SUPPLY, ChargeClass.CONTRACTED]);
    expect(response.results[1].chargeClass).toBeUndefined();
    expect(response.results[0].rateBands[0].rateAmount).toEqual(9.453);
  });
});

describe('Genability client', () => {
  afterEach(() => {
    Genability.__deconfigure();
  });
  it('exposes the account API', () => {
    const client = Genability.configure({ credentials: { appId: 'a', appKey: 'b' } });
    expect(client.accounts).toBeInstanceOf(AccountApi);
    expect(client.accounts).toBe(client.accounts);
  });
});
