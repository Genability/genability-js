import { Genability } from './genability'
import * as types from './types';
import * as restApis from './signal';
import * as credentials from './rest-client/credentials';
import * as restClient from './rest-client';
import * as propertyKeyApi from './signal/property-key-api';

const world = 'World';

export function echoHello(word: string = world): string {
  return `Hello ${word}!`;
}

export { Genability };
export const Client = Genability;
export { types };
export { restApis };
export { credentials };

// TODO remove the following when CLI no longer uses them
export { restClient };
export { propertyKeyApi };
