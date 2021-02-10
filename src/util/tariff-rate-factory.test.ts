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
        chargeClass: ChargeClasses.getChargeClasses([ChargeClass.TAX]),
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
        chargeClass: ChargeClasses.getChargeClasses([ChargeClass.TAX]),
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

describe('Test createConsumptionRate method', () => {
  it('should return TariffRate object when all arguments are given', () => {
    const expectedTariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName: 'rateGroupName',
      rateName: 'rateName',
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT
      }]
    }
    const tariffRate: TariffRate = TariffRateFactory.createConsumptionRate(
      'rateGroupName', 'rateName'
    );
    expect(tariffRate).toEqual(expectedTariffRate);
  });

  it('rateGroupName should default to "Energy Charges" and rateName to "Energy Charge"', () => {
    const expectedTariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName: 'Energy Charges',
      rateName: 'Energy Charge',
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT
      }]
    }
    const tariffRate: TariffRate = TariffRateFactory.createConsumptionRate();
    expect(tariffRate).toEqual(expectedTariffRate);
  });
});

describe('Test createDemandRate method', () => {
  it('should return TariffRate object when all arguments are given', () => {
    const expectedTariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName: 'rateGroupName',
      rateName: 'rateName',
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      quantityKey: 'quantityKey',
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT
      }]
    }
    const tariffRate: TariffRate = TariffRateFactory.createDemandRate(
      'rateGroupName', 'rateName', 'quantityKey'
    );
    expect(tariffRate).toEqual(expectedTariffRate);
  });

  it('rateGroupName should default to "Demand Charges", rateName to "Demand Charge" and quantityKey to "demand', () => {
    const expectedTariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName: 'Demand Charges',
      rateName: 'Demand Charge',
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      quantityKey: 'demand',
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT
      }]
    }
    const tariffRate: TariffRate = TariffRateFactory.createDemandRate();
    expect(tariffRate).toEqual(expectedTariffRate);
  });
});

describe('Test createQuantityRate method', () => {
  it('should return TariffRate object when all arguments are given', () => {
    const expectedTariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName: 'rateGroupName',
      rateName: 'rateName',
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      quantityKey: 'quantityKey',
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT
      }]
    }
    const tariffRate: TariffRate = TariffRateFactory.createQuantityRate(
      'rateGroupName', 'rateName', 'quantityKey'
    );
    expect(tariffRate).toEqual(expectedTariffRate);
  });

  it('rateGroupName should default to "Other Charges", rateName to "Quantity Charge"', () => {
    const expectedTariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName: 'Other Charges',
      rateName: 'Quantity Charge',
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT
      }]
    }
    const tariffRate: TariffRate = TariffRateFactory.createQuantityRate();
    expect(tariffRate).toEqual(expectedTariffRate);
  });
});

describe('Test createFixedRate method', () => {
  it('should return TariffRate object when all arguments are given', () => {
    const expectedTariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName: 'rateGroupName',
      rateName: 'rateName',
      chargePeriod: ChargePeriod.QUARTERLY,
      transactionType: TransactionType.BUY,
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT
      }]
    }
    const tariffRate: TariffRate = TariffRateFactory.createFixedRate(
      'rateGroupName', 'rateName', ChargePeriod.QUARTERLY
    );
    expect(tariffRate).toEqual(expectedTariffRate);
  });

  it('rateGroupName should default to "Fixed Charges", rateName to "Fixed Charge" and chargePeriod to "ChargePeriod.MONTHLY"', () => {
    const expectedTariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName: 'Fixed Charges',
      rateName: 'Fixed Charge',
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT
      }]
    }
    const tariffRate: TariffRate = TariffRateFactory.createFixedRate();
    expect(tariffRate).toEqual(expectedTariffRate);
  });
});

describe('Test createMinimumRate method', () => {
  it('should return TariffRate object when all arguments are given', () => {
    const expectedTariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName: 'rateGroupName',
      rateName: 'rateName',
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      quantityKey: 'quantityKey',
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT
      }]
    }
    const tariffRate: TariffRate = TariffRateFactory.createMinimumRate(
      'rateGroupName', 'rateName', 'quantityKey'
    );
    expect(tariffRate).toEqual(expectedTariffRate);
  });

  it('rateGroupName should default to "Fixed Charges", rateName to "Minimum Charge"', () => {
    const expectedTariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName: 'Fixed Charges',
      rateName: 'Minimum Charge',
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT
      }]
    }
    const tariffRate: TariffRate = TariffRateFactory.createMinimumRate();
    expect(tariffRate).toEqual(expectedTariffRate);
  });
});

describe('Test createMaximumRate method', () => {
  it('should return TariffRate object when all arguments are given', () => {
    const expectedTariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName: 'rateGroupName',
      rateName: 'rateName',
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      quantityKey: 'quantityKey',
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT
      }]
    }
    const tariffRate: TariffRate = TariffRateFactory.createMaximumRate(
      'rateGroupName', 'rateName', 'quantityKey'
    );
    expect(tariffRate).toEqual(expectedTariffRate);
  });

  it('rateGroupName should default to "Other Charges", rateName to "Maximum Charge"', () => {
    const expectedTariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName: 'Other Charges',
      rateName: 'Maximum Charge',
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT
      }]
    }
    const tariffRate: TariffRate = TariffRateFactory.createMaximumRate();
    expect(tariffRate).toEqual(expectedTariffRate);
  });
});