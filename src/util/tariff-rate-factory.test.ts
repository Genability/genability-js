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
        rateGroupName:'Group Name Taxes',
        rateName: "testRateName",
        chargeType: ChargeType.TAX,
        chargeClass: ChargeClasses.fromChargeClasses([ChargeClass.TAX]),
        chargePeriod: ChargePeriod.MONTHLY,
        transactionType: TransactionType.BUY,
        rateBands: [{
          rateAmount: 5000,
          rateSequenceNumber: 1,
          rateUnit: RateUnit.COST_PER_UNIT 
        }]
      }
      const tariffRate: TariffRate = TariffRateFactory.createTaxRate(
        "Group Name Taxes", 5000, true, "testRateName"
      );
      expect(tariffRate).toEqual(expectedTariffRate);
    });

    it('rateGroupName should default to "Taxes"', () => {
      const expectedTariffRate = {
        tariffRateId: null,
        tariffId: null,
        riderId: null,
        tariffSequenceNumber: null,
        rateGroupName:'Taxes',
        rateName: "testRateName",
        chargeType: ChargeType.TAX,
        chargeClass: ChargeClasses.fromChargeClasses([ChargeClass.TAX]),
        chargePeriod: ChargePeriod.MONTHLY,
        transactionType: TransactionType.BUY,
        rateBands: [{
          rateAmount: 5000,
          rateSequenceNumber: 1,
          rateUnit: RateUnit.COST_PER_UNIT 
        }]
      }
      const tariffRate: TariffRate = TariffRateFactory.createTaxRate(
        undefined, 5000, true, "testRateName"
      );
      expect(tariffRate).toEqual(expectedTariffRate);
    });

    it('isFixedAmount should default to false and rateName to "Taxes"', () => {
      const expectedTariffRate = {
        tariffRateId: null,
        tariffId: null,
        riderId: null,
        tariffSequenceNumber: null,
        rateGroupName:'Group Name Taxes',
        rateName: 'Taxes',
        chargeType: ChargeType.TAX,
        chargeClass: ChargeClasses.fromChargeClasses([ChargeClass.TAX]),
        chargePeriod: ChargePeriod.MONTHLY,
        transactionType: TransactionType.BUY,
        rateBands: [{
          rateAmount: 5000,
          rateSequenceNumber: 1,
          rateUnit: RateUnit.PERCENTAGE 
        }]
      }
      const tariffRate: TariffRate = TariffRateFactory.createTaxRate(
        "Group Name Taxes", 5000
      );
      expect(tariffRate).toEqual(expectedTariffRate);
    });
    it('should accept rateAmount as an optional parameter', () => {
      const expectedTariffRate = {
        tariffRateId: null,
        tariffId: null,
        riderId: null,
        tariffSequenceNumber: null,
        rateGroupName:'Group Name Taxes',
        rateName: 'Taxes',
        chargeType: ChargeType.TAX,
        chargeClass: ChargeClasses.fromChargeClasses([ChargeClass.TAX]),
        chargePeriod: ChargePeriod.MONTHLY,
        transactionType: TransactionType.BUY,
        rateBands: [{
          rateUnit: RateUnit.PERCENTAGE,
          rateSequenceNumber: 1,
        }]
      }
      const tariffRate: TariffRate = TariffRateFactory.createTaxRate(
        "Group Name Taxes"
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
      chargeType: ChargeType.CONSUMPTION_BASED,
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT,
        rateSequenceNumber: 1,
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
      chargeType: ChargeType.CONSUMPTION_BASED,
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      rateBands: [{
        rateSequenceNumber: 1,
        rateUnit: RateUnit.COST_PER_UNIT,
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
      chargeType: ChargeType.DEMAND_BASED,
      quantityKey: 'quantityKey',
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT,
        rateSequenceNumber: 1,
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
      chargeType: ChargeType.DEMAND_BASED,
      transactionType: TransactionType.BUY,
      quantityKey: 'demand',
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT,
        rateSequenceNumber: 1,
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
      chargeType: ChargeType.QUANTITY,
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      quantityKey: 'quantityKey',
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT,
        rateSequenceNumber: 1,
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
      chargeType: ChargeType.QUANTITY,
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT,
        rateSequenceNumber: 1,
      }]
    }
    const tariffRate: TariffRate = TariffRateFactory.createQuantityRate();
    expect(tariffRate).toEqual(expectedTariffRate);
  });
});

describe('Test createPercentageRate method', () => {
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
        rateUnit: RateUnit.PERCENTAGE,
        rateSequenceNumber: 1,
      }]
    }
    const tariffRate: TariffRate = TariffRateFactory.createPercentageRate(
      'rateGroupName', 'rateName', 'quantityKey'
    );
    expect(tariffRate).toEqual(expectedTariffRate);
  });

  it('rateGroupName should default to "Other Charges", rateName to "Percentage Rate"', () => {
    const expectedTariffRate = {
      tariffRateId: null,
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName: 'Other Charges',
      rateName: 'Percentage Rate',
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      rateBands: [{
        rateUnit: RateUnit.PERCENTAGE,
        rateSequenceNumber: 1,
      }]
    }
    const tariffRate: TariffRate = TariffRateFactory.createPercentageRate();
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
      chargeType: ChargeType.FIXED_PRICE,
      chargePeriod: ChargePeriod.QUARTERLY,
      transactionType: TransactionType.BUY,
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT,
        rateSequenceNumber: 1,
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
      chargeType: ChargeType.FIXED_PRICE,
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT,
        rateSequenceNumber: 1,
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
      chargeType: ChargeType.MINIMUM,
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      quantityKey: 'quantityKey',
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT,
        rateSequenceNumber: 1,
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
      chargeType: ChargeType.MINIMUM,
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT,
        rateSequenceNumber: 1,
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
      chargeType: ChargeType.MAXIMUM,
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      quantityKey: 'quantityKey',
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT,
        rateSequenceNumber: 1,
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
      chargeType: ChargeType.MAXIMUM,
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      rateBands: [{
        rateUnit: RateUnit.COST_PER_UNIT,
        rateSequenceNumber: 1,
      }]
    }
    const tariffRate: TariffRate = TariffRateFactory.createMaximumRate();
    expect(tariffRate).toEqual(expectedTariffRate);
  });
});

describe('Test copyRate method', () => {
  it('should create a copy and change the expected fields on copy', () => {
    const tariffRate = {
      tariffRateId: 1,
      masterTariffRateId: 123,
      fromDateTime: "2019-07-13T00:00:00-07:00",
      toDateTime: "2020-05-11T00:00:00-07:00",
      tariffId: null,
      riderId: null,
      tariffSequenceNumber: null,
      rateGroupName: 'rateGroupName',
      rateName: 'rateName',
      chargePeriod: ChargePeriod.MONTHLY,
      transactionType: TransactionType.BUY,
      quantityKey: 'quantityKey',
      rateBands: [{
        tariffRateBandId: 100,
        tariffRateId: 1,
        rateSequenceNumber: 1,
      }, {
        tariffRateBandId: 101,
        tariffRateId: 1,
        rateSequenceNumber: 2,
      }]
    }
    const tariffRateDeepCopy: TariffRate = TariffRateFactory.copyRate(tariffRate);
    expect(tariffRate.rateName).toEqual("rateName");
    expect(tariffRateDeepCopy.rateName).toEqual("Copy of rateName");
    expect(tariffRate.tariffRateId).toEqual(1);
    expect(tariffRateDeepCopy.tariffRateId).toEqual(null);
    expect(tariffRate.fromDateTime).toEqual("2019-07-13T00:00:00-07:00");
    expect(tariffRateDeepCopy.fromDateTime).toEqual(null);
    expect(tariffRate.toDateTime).toEqual("2020-05-11T00:00:00-07:00");
    expect(tariffRateDeepCopy.toDateTime).toEqual(null);
    expect(tariffRate.rateBands && tariffRate.rateBands[0].tariffRateBandId).toEqual(100);
    expect(tariffRateDeepCopy.rateBands && tariffRateDeepCopy.rateBands[0].tariffRateBandId).toEqual(null);
    expect(tariffRate.rateBands && tariffRate.rateBands[1].tariffRateBandId).toEqual(101);
    expect(tariffRateDeepCopy.rateBands && tariffRateDeepCopy.rateBands[1].tariffRateBandId).toEqual(null);
    tariffRateDeepCopy.rateGroupName = "Copy of rateGroupName";
    expect(tariffRate.rateGroupName).toEqual("rateGroupName");
    expect(tariffRateDeepCopy.rateGroupName).toEqual("Copy of rateGroupName");
  });
});