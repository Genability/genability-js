import {
  TariffRate,
  ChargeType,
  ChargeClass,
  ChargeClasses,
  ChargePeriod,
  TransactionType,
  RateUnit
} from "../types/tariff";

export class TariffRateFactory {
  public static createTaxRate(
    rateAmount: number,
    isFixedAmount = false,
    rateName = 'Taxes'): TariffRate {
    if(!rateAmount) {
      throw new Error('Please provide a rateAmount');
    }
    const tariffRate: TariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName:'Taxes',
      rateName,
      chargeType: ChargeType.TAX,
      chargeClass: ChargeClasses.getChargeClasses(ChargeClass.TAX),
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      rateBands: [{
        rateAmount,
        rateUnit: isFixedAmount ? RateUnit.COST_PER_UNIT : RateUnit.PERCENTAGE
      }]
    }
    return tariffRate;
  }
}