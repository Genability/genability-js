import {
  CustomerClass,
  TariffType,
  ChargeType,
  ServiceType,
  Ownership,
} from '../types'

export function encode(
  val: string |
  string[] |
  number |
  boolean |
  CustomerClass[] |
  TariffType[] |
  ChargeType[] |
  ServiceType[] |
  Ownership[],
): string {
  let encoded;
  if(Array.isArray(val)) {
    encoded = encodeURIComponent(val.join(","));
  } else {
    encoded = encodeURIComponent(val);
  }
  return encoded.
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}