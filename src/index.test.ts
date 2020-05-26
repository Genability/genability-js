import { echoHello } from "./index";
import { Genability, types, restApis } from "./index";
import { PropertyKeyName } from './types';

describe("client", () => {
  it("should init cleanly", async () => {

    const genability: Genability = Genability.configure({
      profileName: 'unitTest'
    });
    const demandPk = await genability.properties.getPropertyKey(PropertyKeyName.DEMAND);
    expect(types.isGenPropertyKey(demandPk)).toBeTruthy;
    const request = new restApis.GetPropertyKeysRequest();
    request.dataType = types.DataType.DEMAND;
    const demandPks = await genability.properties.getPropertyKeys(request);
    expect(demandPks.results).toHaveLength(25);
  })
});


describe("echoHello", () => {
  it("should default correctly", () => {
    expect(echoHello()).toEqual("Hello World!");
    expect(echoHello("Universe")).toEqual("Hello Universe!");
  })
});
