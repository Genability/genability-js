import mock from 'mock-fs'
import { homedir } from 'os';
import { RestApiCredentials } from './client';
import { credentialsFromFile,
  credentialsInEnv,
  credentialsFromEnv,
  GENABILITY_DOT_DIRECTORY,
  CREDENTIALS_FILE_NAME
} from './credentials';

const credsDir = `${homedir()}/${GENABILITY_DOT_DIRECTORY}`;
const contents = {
  default: {
    appId: 'default-appId',
    appKey: 'default-appKey'
  },
  unitTest: {
    appId: 'unit-test-appId',
    appKey: 'unit-test-appKey'
  }
};

const mockValidDir = {
  [credsDir]: {
    [CREDENTIALS_FILE_NAME]: JSON.stringify(contents)
  }
};
const mockInvalidDir = {
  [credsDir]: {
    [CREDENTIALS_FILE_NAME]: 'this is not valid json, jason'
  }
};
const mockEmptyFileDir = {
  [credsDir]: {
    [CREDENTIALS_FILE_NAME]: ''
  }
};
const mockMissingFileDir = {
  [credsDir]: {}
};

const mockMissingDir = {
  [credsDir]: ''
};

describe('Test credentialsFromFile function', () => {
  describe('with a valid file', () => {
    beforeEach(() => {
      mock(mockValidDir);
    });
    afterEach(mock.restore);
    it('should find the implicit default profile', async () => {
      const results: RestApiCredentials = await credentialsFromFile();
      expect(results.appId).toEqual('default-appId');
      expect(results.appKey).toEqual('default-appKey');
    });
    it('should find the explicit default profile', async () => {
      const results = await credentialsFromFile('default');
      expect(results.appId).toEqual('default-appId');
      expect(results.appKey).toEqual('default-appKey');
    });
    it('should find the explicit unitTest profile', async () => {
      const results = await credentialsFromFile('unitTest');
      expect(results.appId).toEqual('unit-test-appId');
      expect(results.appKey).toEqual('unit-test-appKey');
    });
    it('should not find a missing profile', async () => {      
      await expect(credentialsFromFile('this-profile-does-not-exist')).rejects.toThrow(Error);
    });
  });
  describe('with an invalid file', () => {
    beforeEach(() => {
      mock(mockInvalidDir);
    });
    afterEach(mock.restore);
    it('should throw a syntax error', async () => {
      await expect(credentialsFromFile('this-profile-does-not-exist')).rejects.toThrow(SyntaxError);
    });
  });
  describe('with an empty file', () => {
    beforeEach(() => {
      mock(mockEmptyFileDir);
    });
    afterEach(mock.restore);
    it('should throw an error', async () => {
      await expect(credentialsFromFile('this-profile-does-not-exist')).rejects.toThrow('Credentials file is empty');
    });
  });
  describe('with a missing file', () => {
    beforeEach(() => {
      mock(mockMissingFileDir);
    });
    afterEach(mock.restore);
    it('should throw an error', async () => {
      await expect(credentialsFromFile('this-profile-does-not-exist')).rejects.toThrow('Credentials file not found');
    });
  });
  describe('with a missing directory', () => {
    beforeEach(() => {
      mock(mockMissingDir);
    });
    afterEach(mock.restore);
    it('should throw a generic error', async () => {
      await expect(credentialsFromFile('directory not present')).rejects.toThrow();
    });
  });
});

describe('Credentials from environment', () => {
  describe('With valid credentials', () => {
    beforeEach(() => {
      process.env.GENABILITY_APP_ID = 'default-appId';
      process.env.GENABILITY_APP_KEY = 'default-appKey';
    });
    afterEach(() => {
      delete process.env.GENABILITY_APP_ID;
      delete process.env.GENABILITY_APP_KEY;
    });
    it('should return true on check for env variables', () => {
      const check = credentialsInEnv();
      expect(check).toBe(true);
    });
    it('should return valid credentials', () => {
      const creds: RestApiCredentials = credentialsFromEnv();
      expect(creds.appId).toEqual('default-appId');
      expect(creds.appKey).toEqual('default-appKey');
    });
  });

  describe('Without semi valid credentials', () => {
    beforeEach(() => {
      process.env.GENABILITY_APP_ID = 'default-appId';
    });
    afterEach(() => {
      delete process.env.GENABILITY_APP_ID;
    });
    it('should return false on check for env variables', () => {
      const check = credentialsInEnv();
      expect(check).toBe(false);
    });
  });

  describe('Without valid credentials', () => {
    it('should return false on check for env variables', () => {
      const check = credentialsInEnv();
      expect(check).toBe(false);
    });
    it('should throw an error when trying to return credentials', () => {
      expect(() => {credentialsFromEnv()})
        .toThrow(Error('No credentials found in environment variables'));
    });
  });
});
