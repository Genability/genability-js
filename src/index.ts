import * as types from './types';
import * as restClient from './rest-client';
import * as credentials from './rest-client/credentials';

const world = 'World';

export function echoHello(word: string = world): string {
  return `Hello ${word}!`;
}

export { types };
export { restClient };
export { credentials };
