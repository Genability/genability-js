import { TariffRateFactory } from "./tariff-rate-factory";
import {
  TariffRate,
  ChargeType,
  ChargeClass,
  ChargeClasses,
  ChargePeriod,
  TransactionType,
  RateUnit
} from "../types/tariff";
  

describe('Test createTaxRate method', () => {
  describe('with a valid file', () => {
    it('should return TariffRate object when all arguments are given', () => {
      const expectedTariffRate = {
        tariffRateId: null,
        tariffId: null,
        riderId: null,
        tariffSequenceNumber: null,
        rateGroupName:'Taxes',
        rateName: "testRateName",
        chargeType: ChargeType.TAX,
        chargeClass: ChargeClasses.getChargeClasses(ChargeClass.TAX),
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
        tariffRateId: null,
        tariffId: null,
        riderId: null,
        tariffSequenceNumber: null,
        rateGroupName:'Taxes',
        rateName: 'Taxes',
        chargeType: ChargeType.TAX,
        chargeClass: new ChargeClasses("TAX"),
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
  });
});
  