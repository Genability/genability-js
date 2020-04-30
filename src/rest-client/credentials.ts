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
  if (Array.isArray(jsonContent)) {
    const findProfile = jsonContent.filter(
      (p) => {
        if (Object.keys(p)[0] === profileName) {
          return p;
        }
        return null;
      },
    );
    const profile = findProfile[0];
    if (profile) return profile[profileName];
  }
  throw new Error(`Profile ${profileName} not found in credentials file`);
}
