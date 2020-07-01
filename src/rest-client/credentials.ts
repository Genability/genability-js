import * as path from 'path';
import { readFileSync } from 'fs';
import { homedir } from 'os';
import { RestApiCredentials } from './client';

export const GENABILITY_DOT_DIRECTORY = '.genability';
export const CREDENTIALS_FILE_NAME = 'credentials.json';
const credentialsFilePath = path.join(
  homedir(),
  GENABILITY_DOT_DIRECTORY,
  CREDENTIALS_FILE_NAME,
);

export function credentialsFromFile(profileName = 'default'): RestApiCredentials {
  let content;
  try {
    content = readFileSync(credentialsFilePath, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('Credentials file not found');
    } else {
      throw err;
    }
  }
  if (content == null || content.length === 0) throw new Error('Credentials file is empty');
  const jsonContent = JSON.parse(content);
  const profile = jsonContent[profileName];
  if (profile) return profile;
  throw new Error(`Profile ${profileName} not found in credentials file`);
}

export function credentialsInEnv(): boolean {
  if (typeof process.env.GENABILITY_APP_ID === 'undefined') return false;
  if (typeof process.env.GENABILITY_APP_KEY === 'undefined') return false;
  return true;
}

export function credentialsFromEnv(): RestApiCredentials {
  if (credentialsInEnv()) {
    return {
      appId: process.env.GENABILITY_APP_ID || '',
      appKey: process.env.GENABILITY_APP_KEY || ''
    };
  }
  throw new Error('No credentials found in environment variables');
}
