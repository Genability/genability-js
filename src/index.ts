import { Genability } from './genability'
import * as types from './types';
import * as restApis from './api';
import * as restClient from './rest-client';
import * as credentials from './rest-client/credentials';
import * as contract from './rest-client/contract';
import { TariffRateFactory } from './util/tariff-rate-factory';
import { ToString } from './util/to-string';
import { Formula } from './util/formula';

const world = 'World';

export function echoHello(word: string = world): string {
  return `Hello ${word}!`;
}

export { Genability };
export const Client = Genability;
export { types };
export { restApis };
export { restClient };
export { credentials };
export { contract };
export { TariffRateFactory };
export { ToString };
export { Formula };
