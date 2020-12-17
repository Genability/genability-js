import { echoHello } from "./index";
import { Genability, types, restApis } from "./index";
import { GenabilityConfig } from "./rest-client";
import { CommonPropertyKeyNames } from './types/property-key';

describe("client", () => {
  afterEach(() => {
    Genability.__deconfigure();
    GenabilityConfig.__deconfigure();
  });

  it("should init cleanly", async () => {

    const genability: Genability = Genability.configure({
      profileName: 'unitTest'
    });
    const demandPk = await genability.properties.getPropertyKey(CommonPropertyKeyNames.DEMAND);
    expect(types.isGenPropertyKey(demandPk)).toBeTruthy;
    const request = new restApis.GetPropertyKeysRequest();
    request.dataType = types.PropertyDataType.DEMAND;
    const demandPks = await genability.properties.getPropertyKeys(request);
    expect(demandPks.results).toHaveLength(25);
  });

  it("should allow setting a proxy URL", async () => {
    const genability: Genability = Genability.configure({
      profileName: 'unitTest',
      proxy: 'https://test.com'
    });
    const Config = GenabilityConfig.config();
    expect(Config.baseURL).toBe('https://test.com');
  })
});


describe("echoHello", () => {
  it("should default correctly", () => {
    expect(echoHello()).toEqual("Hello World!");
    expect(echoHello("Universe")).toEqual("Hello Universe!");
  })
});
