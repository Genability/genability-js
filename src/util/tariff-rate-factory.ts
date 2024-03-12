import { cloneDeep } from 'lodash';
import {
  TariffRate,
  ChargeType,
  ChargeClass,
  ChargePeriod,
  TransactionType,
  RateUnit,
  Tariff,
  TariffRateBand
} from '../types/tariff';

export class TariffRateFactory {
  public static createTaxRate(
    rateGroupName = 'Taxes',
    rateAmount?: number,
    isFixedAmount = false,
    rateName = 'Taxes'): TariffRate {
    const tariffRate: TariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName,
      rateName,
      chargeType: ChargeType.TAX,
      chargeClass: [ChargeClass.TAX],
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      rateBands: [{
        rateAmount,
        rateUnit: isFixedAmount ? RateUnit.COST_PER_UNIT : RateUnit.PERCENTAGE,
        rateSequenceNumber: 1,
      }]
    }
    return tariffRate;
  }

  public static createRiderRate(
    rateGroupName = '',
    riderTariff: Tariff
  ): TariffRate {
    // This is the minimum viable TariffRate we need to add it to
    // the list in the RiderPanel display but we might be able to do better
    const tariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: riderTariff.masterTariffId,
      tariffSequenceNumber: null,
      rateGroupName,
      rateName: riderTariff.tariffName,
      fromDateTime: riderTariff.effectiveDate || undefined,
      toDateTime: riderTariff.endDate || undefined
    }
    return tariffRate;
  }

  public static createConsumptionRate(
    rateGroupName = 'Energy Charges',
    rateName = 'Energy Charge'
  ): TariffRate {
    const tariffRate: TariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName,
      rateName,
      chargeType: ChargeType.CONSUMPTION_BASED,
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.NET,
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT,
        rateSequenceNumber: 1,
      }]
    }
    return tariffRate;
  }

  public static createDemandRate(
    rateGroupName = 'Demand Charges',
    rateName = 'Demand Charge',
    quantityKey= 'demand',
  ): TariffRate {
    const tariffRate: TariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName,
      rateName,
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      chargeType: ChargeType.DEMAND_BASED,
      quantityKey,
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT,
        rateSequenceNumber: 1,
      }]
    }
    return tariffRate;
  }

  public static createQuantityRate(
    rateGroupName = 'Other Charges',
    rateName = 'Quantity Charge',
    quantityKey?: string,
  ): TariffRate {
    const tariffRate: TariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName,
      rateName,
      chargeType: ChargeType.QUANTITY,
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      quantityKey,
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT,
        rateSequenceNumber: 1,
      }]
    }
    return tariffRate;
  }

  public static createPercentageRate(
    rateGroupName = 'Other Charges',
    rateName = 'Percentage Rate',
    quantityKey?: string,
  ): TariffRate {
    const tariffRate: TariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName,
      rateName,
      chargeType: ChargeType.QUANTITY,
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      quantityKey,
      rateBands: [{
        rateUnit: RateUnit.PERCENTAGE,
        rateSequenceNumber: 1,
      }]
    }
    return tariffRate;
  }

  public static createFixedRate(
    rateGroupName = 'Fixed Charges',
    rateName = 'Fixed Charge',
    chargePeriod= ChargePeriod.MONTHLY
  ): TariffRate {
    const tariffRate: TariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName,
      rateName,
      chargeType: ChargeType.FIXED_PRICE,
      chargePeriod,
      transactionType: TransactionType.BUY,
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT,
        rateSequenceNumber: 1,
      }]
    }
    return tariffRate;
  }

  public static createMinimumRate(
    rateGroupName = 'Fixed Charges',
    rateName = 'Minimum Charge',
    quantityKey?: string
  ): TariffRate {
    const tariffRate: TariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName,
      rateName,
      chargeType: ChargeType.MINIMUM,
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      quantityKey,
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT,
        rateSequenceNumber: 1,
      }]
    }
    return tariffRate;
  }

  public static createMaximumRate(
    rateGroupName = 'Other Charges',
    rateName = 'Maximum Charge',
    quantityKey?: string
  ): TariffRate {
    const tariffRate: TariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName,
      rateName,
      chargeType: ChargeType.MAXIMUM,
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      quantityKey,
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT,
        rateSequenceNumber: 1,
      }]
    }
    return tariffRate;
  }

  public static copyRate(tariffRate: TariffRate): TariffRate {
    const tariffRateDeepCopy = cloneDeep(tariffRate);
    tariffRateDeepCopy.rateName = `Copy of ${tariffRateDeepCopy.rateName}`;
    tariffRateDeepCopy.tariffRateId = null;
    tariffRateDeepCopy.masterTariffRateId = null;
    tariffRateDeepCopy.fromDateTime = null;
    tariffRateDeepCopy.toDateTime = null;
    tariffRateDeepCopy.rateBands?.forEach((rateBand: TariffRateBand) => {
      rateBand.tariffRateBandId = null;
      rateBand.tariffRateId = null;
    })

    return tariffRateDeepCopy;
  }

  public static createNetExcessGeneration(
    rateGroupName = 'Net Excess Generation',
    rateName = 'Net Excess Generation'
  ): TariffRate {
    const tariffRate: TariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName,
      rateName,
      chargeType: ChargeType.NET_EXCESS_GENERATION,
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.NET,
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT,
        rateSequenceNumber: 1,
      }]
    }
    return tariffRate;
  }
}