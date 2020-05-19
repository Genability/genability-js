import { 
  TariffType,
  CustomerClass,
  ChargeType,
  ChargeClass,
  ChargePeriod,
  TransactionType,
  Tariff,
  Rate,
  isTariff,
  RateBand
} from './tariff';

describe("tariff types", () => {
  describe("test that JSON to enum", () => {
    it("works for TariffType", () => {
      const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "tariffType": "ALTERNATIVE"}');
      expect(tariff.tariffType).toEqual(TariffType.ALTERNATIVE);
      expect(tariff.tariffName).toEqual('StringName');
    })
    it("works for CustomerClass", () => {
      const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL"}');
      expect(tariff.customerClass).toEqual(CustomerClass.GENERAL);
      expect(tariff.tariffName).toEqual('StringName');
    })
    it("works for ChargeType", () => {
      const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "chargeTypes": "CONSUMPTION_BASED"}');
      expect(tariff.chargeTypes).toEqual(ChargeType.CONSUMPTION_BASED);
      expect(tariff.tariffName).toEqual('StringName');
    })
    it("works for ChargeClass", () => {
      const rate: Rate = JSON.parse('{"rateName": "StringName", "chargeClass": "AFTER_TAX"}');
      expect(rate.chargeClass).toEqual(ChargeClass.AFTER_TAX);
      expect(rate.rateName).toEqual('StringName');
    })
    it("works for ChargePeriod", () => {
      const rate: Rate = JSON.parse('{"rateName": "StringName", "chargePeriod": "ANNUALLY"}');
      expect(rate.chargePeriod).toEqual(ChargePeriod.ANNUALLY);
      expect(rate.rateName).toEqual('StringName');
    })
    it("works for TransactionType", () => {
      const rate: Rate = JSON.parse('{"rateName": "StringName", "transactionType": "BUY"}');
      expect(rate.transactionType).toEqual(TransactionType.BUY);
      expect(rate.rateName).toEqual('StringName');
    })
  });
  describe("isTariff function", () => {
    it("should be false for invalid JSON", () => {
      const tariff: Tariff = JSON.parse(
        '{\
          "tariffId": "numberTariffId",\
          "masterTariffId": "numberMasterTariffId",\
          "tariffCode": "numberTariffCode"\
        }'
      );
      expect(isTariff(tariff)).toEqual(false);
    })
    it("should be true for valid JSON", () => {
      const tariff: Tariff = JSON.parse(
        '{\
          "tariffId": "numberTariffId",\
          "masterTariffId": "numberMasterTariffId",\
          "tariffCode": "numberTariffCode",\
          "tariffName": "numberTariffName",\
          "lseId": "numberLseId"\
        }'
      );
      expect(isTariff(tariff)).toEqual(true);
    })
  });
  describe("works for Rate", () => {
    it("should be true with empty Rates", () => {
      const tariff: Tariff = JSON.parse(
        '{\
          "tariffId": "numberTariffId",\
          "masterTariffId": "numberMasterTariffId",\
          "tariffCode": "numberTariffCode",\
          "tariffName": "numberTariffName",\
          "lseId": "numberLseId",\
          "rates": []\
        }'
      );
      expect(isTariff(tariff)).toEqual(true);
      expect(tariff.rates).toEqual([]);
    })
    it("should be true with rates", () => {
      const ratesJson = '[{\
        "tariffRateId": 1,\
        "tariffId": 1\
       }]';
      const tariff: Tariff = JSON.parse(
        `{\
          "tariffId": "numberTariffId",\
          "masterTariffId": "numberMasterTariffId",\
          "tariffCode": "numberTariffCode",\
          "tariffName": "numberTariffName",\
          "lseId": "numberLseId",\
          "rates": ${ratesJson}
        }`
      );
      const rates: Rate = JSON.parse(ratesJson);
      expect(isTariff(tariff)).toEqual(true);
      expect(tariff.rates).toEqual(rates);
    })
  });
  describe("works for RateBand", () => {
    it("should be true with empty RateBands", () => {
      const ratesJson = '{\
        "tariffRateId": 1,\
        "tariffId": 1,\
        "rateBands": []\
       }';
      const rate: Rate = JSON.parse(ratesJson);
      expect(rate.tariffRateId).toEqual(1);
      expect(rate.tariffRateId).toEqual(1);
      expect(rate.rateBands).toEqual([]);
    })
    it("should be true with RateBands", () => {
      const rateBandJson = '{\
        "tariffRateBandId": 1,\
        "tariffRateId": 2\
       }';
      const rateJson = `{\
        "tariffRateId": 3,\
        "tariffId": 4,\
        "rateBands": [${rateBandJson}]
       }`;
      const rate: Rate = JSON.parse(rateJson);
      const rateBand: RateBand = JSON.parse(rateBandJson);
      expect(rateBand.tariffRateId).toEqual(2);
      expect(rateBand.tariffRateBandId).toEqual(1);
      expect(rate.tariffRateId).toEqual(3);
      expect(rate.tariffId).toEqual(4);
      expect(rate.rateBands).toEqual([rateBand]);
    })
  });
});
