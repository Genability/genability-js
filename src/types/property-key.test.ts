import { 
  DataType, 
  GenPropertyKey,
  isGenPropertyKey
} from "./index";

describe("property-key types", () => {
  it("should parse dataType JSON to BOOLEAN enum", () => {
    const pk: GenPropertyKey = JSON.parse('{"keyName": "BooleanKeyName","dataType": "BOOLEAN"}');
    expect(pk.dataType).toEqual(DataType.BOOLEAN);
  })
  it("isGenPropertyKey should be true for valid JSON", () => {
    const pk: GenPropertyKey = JSON.parse('{"keyName": "BooleanKeyName","dataType": "BOOLEAN"}');
    expect(isGenPropertyKey(pk)).toEqual(true);
  })
  it("isGenPropertyKey should be false for invalid JSON", () => {
    const pk: GenPropertyKey = JSON.parse('{"notAKeyName": "BooleanKeyName","dataType": "BOOLEAN"}');
    expect(isGenPropertyKey(pk)).toEqual(false);
  })
});
