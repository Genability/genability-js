import * as path from 'path';
import { readFileSync } from 'fs';
import { homedir } from 'os';
import { RestApiCredentials } from './client';

const GenabilityDotDirName = '.genability';
const CredentialsFileName = 'credentials.json';
const credentialsFilePath = path.join(
  homedir(),
  GenabilityDotDirName,
  CredentialsFileName,
);

export function fromCredentialsFile(profileName = 'default'): RestApiCredentials {
  const content = readFileSync(credentialsFilePath, 'utf8');
  if (content == null || content.length === 0) throw new Error('Credentials file not found');
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
