import { TariffRateFactory } from "./tariff-rate-factory";
import {
  TariffRate,
  ChargeType,
  ChargeClass,
  ChargePeriod,
  TransactionType,
  RateUnit
} from "../types/tariff";
  

describe('Test createTaxRate method', () => {
  describe('with a valid file', () => {
    it('should return TariffRate object when all arguments are given', () => {
      const expectedTariffRate = {
        // tariffRateId: 1,
        // tariffId: 2,
        // riderId: 3,
        // tariffSequenceNumber: 4,
        rateGroupName:'Taxes',
        rateName: "testRateName",
        chargeType: ChargeType.TAX,
        chargeClass: ChargeClass.TAX,
        chargePeriod: ChargePeriod.MONTHLY,
        transactionType: TransactionType.BUY,
        rateBands: [{
          rateAmount: 5000,
          rateUnit: RateUnit.COST_PER_UNIT 
        }]
      }
      const tariffRate: TariffRate = TariffRateFactory.createTaxRate(
        5000, true, "testRateName"
      );
      expect(tariffRate).toEqual(expectedTariffRate);
    });

    it('isFixedAmount should default to false and rateName to "Taxes"', () => {
      const expectedTariffRate = {
        // tariffRateId: 1,
        // tariffId: 2,
        // riderId: 3,
        // tariffSequenceNumber: 4,
        rateGroupName:'Taxes',
        rateName: "testRateName",
        chargeType: ChargeType.TAX,
        chargeClass: ChargeClass.TAX,
        chargePeriod: ChargePeriod.MONTHLY,
        transactionType: TransactionType.BUY,
        rateBands: [{
          rateAmount: 5000,
          rateUnit: RateUnit.PERCENTAGE 
        }]
      }
      const tariffRate: TariffRate = TariffRateFactory.createTaxRate(
        5000
      );
      expect(tariffRate).toEqual(expectedTariffRate);
    });
    // it('should throw an error when not passing rateAmount', () => {
    //   expect(() => TariffRateFactory.createTaxRate(
    //     undefined, true, "testRateName"
    //   ))
    //     .toThrow(Error);
    // });
  });
});
  