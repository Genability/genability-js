import { 
  ServiceType,
  OfferingType,
  Ownership,
  LoadServingEntity,
  isLoadServingEntity,
  BillingPeriodRepresentation,
} from "./load-serving-entity";

describe("load-serving-entity types", () => {
  describe("test that JSON to enum", () => {
    it("works for ServiceType", () => {
      const lse: LoadServingEntity = JSON.parse('{"name": "StringName", "serviceTypes": "ELECTRICITY"}');
      expect(lse.serviceTypes).toEqual(ServiceType.ELECTRICITY);
      expect(lse.name).toEqual('StringName');
    })
    it("works for OfferingType", () => {
      const lse: LoadServingEntity = JSON.parse('{"name": "StringName", "offeringType": "Delivery"}');
      expect(lse.offeringType).toEqual(OfferingType.DELIVERY);
      expect(lse.name).toEqual('StringName');
    })
    it("works for Ownership", () => {
      const lse: LoadServingEntity = JSON.parse('{"name": "StringName", "ownership": "INVESTOR"}');
      expect(lse.ownership).toEqual(Ownership.INVESTOR);
      expect(lse.name).toEqual('StringName');
    })
  });
  describe("isLoadServingEntity function", () => {
    it("should be false for invalid JSON", () => {
      const lse: LoadServingEntity = JSON.parse('{"notAKeyName": "KeyValue","ownership": "INVESTOR"}');
      expect(isLoadServingEntity(lse)).toEqual(false);
    })
    it("should be true for valid JSON", () => {
      const lse: LoadServingEntity = JSON.parse('{"lseId": "lseIdValue","ownership": "INVESTOR"}');
      expect(isLoadServingEntity(lse)).toEqual(true);
    })
  });
  describe("works for BillingPeriodRepresentation", () => {
    it("should be true with empty BillingPeriodRepresentation", () => {
      const json = '{\
        "lseId": "lseIdValue",\
        "ownership": "INVESTOR",\
        "billingPeriodRepresentation": {}\
      }';
      const lse: LoadServingEntity = JSON.parse(json);
      expect(isLoadServingEntity(lse)).toEqual(true);
      expect(lse.billingPeriodRepresentation).toEqual({});
    })
    it("should be true with billingPeriodRepresentation", () => {
      const billingJson = '{\
        "fromDateOffset": "0",\
        "toDateOffset": "-1",\
        "style": "InclusiveToDate"\
       }';
      const lseJson = `{\
        "lseId": "lseIdValue",\
        "ownership": "INVESTOR",\
        "billingPeriodRepresentation": ${billingJson}
      }`;
      const billing: BillingPeriodRepresentation = JSON.parse(billingJson);
      const lse: LoadServingEntity = JSON.parse(lseJson);
      expect(isLoadServingEntity(lse)).toEqual(true);
      expect(lse.billingPeriodRepresentation).toEqual(billing);
    })
  });
});
