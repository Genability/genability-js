import { echoHello } from './index';
import { Genability, types, restApis } from './index';
import { CommonPropertyKeyNames } from './types/property-key';

describe('client', () => {
  afterEach(() => {
    Genability.__deconfigure();
  });

  it('should init cleanly', async () => {
    const genability: Genability = Genability.configure({
      profileName: 'unitTest'
    });

    if (genability.useCredentialsFromFile) {
      await genability.setupConfigCredentialsFromFile();
    }
    const { result, errors } = await genability.properties.getPropertyKey(CommonPropertyKeyNames.DEMAND);
    expect(result).toBeTruthy();
    expect(errors).toBeUndefined();
    if(result == null) fail('result null');
    expect(types.isGenPropertyKey(result)).toBeTruthy;
    const request = new restApis.GetPropertyKeysRequest();
    request.dataType = types.PropertyDataType.DEMAND;
    const demandPks = await genability.properties.getPropertyKeys(request);
    expect(demandPks.results).toHaveLength(25);
  });

  it('should allow setting a proxy URL', async () => {
    const client = Genability.configure({
      profileName: 'unitTest',
      proxy: 'https://test.com'
    });
    expect(client.__config.baseURL).toBe('https://test.com');
  })
});


describe('echoHello', () => {
  it('should default correctly', () => {
    expect(echoHello()).toEqual('Hello World!');
    expect(echoHello('Universe')).toEqual('Hello Universe!');
  })
});
