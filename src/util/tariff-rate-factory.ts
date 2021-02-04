import {
  TariffRate,
  ChargeType,
  ChargeClass,
  ChargeClasses,
  ChargePeriod,
  TransactionType,
  RateUnit,
  Tariff
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
      chargeClass: ChargeClasses.getChargeClasses([ChargeClass.TAX]),
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      rateBands: [{
        rateAmount,
        rateUnit: isFixedAmount ? RateUnit.COST_PER_UNIT : RateUnit.PERCENTAGE
      }]
    }
    return tariffRate;
  }

  public static createRider(
    riderTariff: Tariff
  ): TariffRate {
    // This is the minimum viable TariffRate we need to add it to
    // the list in the RiderPanel display but we might be able to do better
    const tariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: riderTariff.masterTariffId,
      tariffSequenceNumber: null,
      rateGroupName:'',
      rateName: riderTariff.tariffName,
      fromDateTime: riderTariff.effectiveDate || undefined,
      toDateTime: riderTariff.endDate || undefined
    }
    return tariffRate;
  }
}