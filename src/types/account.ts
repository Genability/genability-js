import { ServiceType } from './load-serving-entity';
import { Tariff, TariffRate, toChargeClassesFromString } from './tariff';

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}

export enum AccountType {
  CUSTOMER = 'CUSTOMER',
  POTENTIAL = 'POTENTIAL',
  TARGET = 'TARGET',
  ARCHETYPE = 'ARCHETYPE'
}

/**
 * Address stored on an Account. Every field is optional because the API
 * accepts either a free text addressString or itemized fields, and only
 * returns the fields it has populated.
 */
export interface AccountAddress {
  addressString?: string | null;
  addressName?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  country?: string | null;
  formattedAddress?: string | null;
  lon?: number | null;
  lat?: number | null;
}

/**
 * A single account property, such as customerClass or buildingArea.
 * Used both in Account.properties and with the Account Properties API.
 */
export interface AccountProperty {
  keyName: string;
  dataValue?: string | null;
  dataType?: string | null;
  fromDateTime?: string | null;
  toDateTime?: string | null;
  accuracy?: number | null;
}

/**
 * Body for Add or Update an Account Tariff. When editing an existing entry the
 * API matches it by serviceType and effectiveDate.
 */
export interface AccountTariff {
  masterTariffId: number;
  serviceType?: ServiceType;
  customerLikelihood?: number | null;
  effectiveDate?: string | null;
  endDate?: string | null;
}

export interface Account {
  accountId?: string;
  providerAccountId?: string | null;
  accountName?: string | null;
  customerOrgId?: string | null;
  customerOrgName?: string | null;
  address?: AccountAddress | null;
  timeZone?: string | null;
  owner?: string | null;
  status?: AccountStatus | null;
  type?: AccountType | null;
  properties?: { [keyName: string]: AccountProperty } | null;
  tariffs?: Tariff[] | null;
}

/**
 * Identifies an account either by the Arcadia generated accountId or by your
 * own providerAccountId.
 */
export type AccountIdentifier =
  { accountId: string; providerAccountId?: undefined } |
  { providerAccountId: string; accountId?: undefined };

/**
 * User Defined Type Guard for Account
 */
export function isAccount(arg: Account): arg is Account {
  return arg !== null &&
    typeof arg === 'object' &&
    typeof arg.accountId === 'string';
}

/**
 * User Defined Type Guard for AccountProperty
 */
export function isAccountProperty(arg: AccountProperty): arg is AccountProperty {
  return arg !== null &&
    typeof arg === 'object' &&
    typeof arg.keyName === 'string';
}

/**
 * The REST API returns TariffRate.chargeClass as a comma separated string.
 * Convert it to the ChargeClass[] that the TariffRate type declares.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toTariffRateFromApi(json: any): TariffRate {
  if(json && typeof json.chargeClass === 'string') {
    json.chargeClass = toChargeClassesFromString(json.chargeClass);
  }
  return json as TariffRate;
}
