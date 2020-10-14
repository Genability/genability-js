import { Genability } from './genability'
import * as types from './types';
import * as restApis from './api';
import * as credentials from './rest-client/credentials';

const world = 'World';

export function echoHello(word: string = world): string {
  return `Hello ${word}!`;
}

export { Genability };
export const Client = Genability;
export { types };
export { restApis };
export { credentials };

