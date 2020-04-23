import * as types from './types';

const world = 'World';

export function echoHello(word: string = world): string {
  return `Hello ${word}!`;
}

export { types };
