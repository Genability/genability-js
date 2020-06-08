import { 
  PropertyDataType,
  PrivacyFlag,
  GenPropertyKey,
  isGenPropertyKey
} from "./property-key";

describe("property-key types", () => {
  describe("test that JSON to enum", () => {
    it("works for dataType BOOLEAN", () => {
      const pk: GenPropertyKey = JSON.parse('{"keyName": "BooleanKeyName","propertyDataType": "BOOLEAN"}');
      expect(pk.propertyDataType).toEqual(PropertyDataType.BOOLEAN);
    })
    it("works for privacy PRIVATE", () => {
      const pk: GenPropertyKey = JSON.parse('{"keyName": "BooleanKeyName","privacy": "PRIVATE"}');
      expect(pk.privacy).toEqual(PrivacyFlag.PRIVATE);
    })
  });
  describe("isGenPropertyKey function", () => {
    it("should be false for invalid JSON", () => {
      const pk: GenPropertyKey = JSON.parse('{"notAKeyName": "BooleanKeyName","propertyDataType": "BOOLEAN"}');
      expect(isGenPropertyKey(pk)).toEqual(false);
    })
    it("should be true for valid JSON", () => {
      const pk: GenPropertyKey = JSON.parse('{"keyName": "BooleanKeyName","propertyDataType": "BOOLEAN"}');
      expect(isGenPropertyKey(pk)).toEqual(true);
    })
    it("should be true with empty choices", () => {
      const json = '{\
        "keyName": "BooleanKeyName",\
        "propertyDataType": "BOOLEAN",\
        "choices": []\
      }';
      const pk: GenPropertyKey = JSON.parse(json);
      expect(isGenPropertyKey(pk)).toEqual(true);
      expect(pk.choices).toHaveLength(0);
    })
    it("should be true with multiple choices", () => {
      const json = '{\
        "keyName": "BooleanKeyName",\
        "propertyDataType": "BOOLEAN",\
        "choices": [\
          {\
            "displayValue": "25",\
            "dataValue": "25",\
            "likelihood": null\
          },\
          {\
            "displayValue": "30",\
            "dataValue": "30",\
            "likelihood": null\
          }\
        ]\
      }';
      const pk: GenPropertyKey = JSON.parse(json);
      expect(isGenPropertyKey(pk)).toEqual(true);
      expect(pk.choices).toHaveLength(2);
    })
  });
});
