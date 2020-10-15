import { Genability } from './genability'
import * as types from './types';
import * as restApis from './api';
import * as credentials from './rest-client/credentials';
import * as contract from "./rest-client/contract";
const world = 'World';

export function echoHello(word: string = world): string {
  return `Hello ${word}!`;
}

export { Genability };
export const Client = Genability;
export { types };
export { restApis };
export { credentials };
export { contract };
