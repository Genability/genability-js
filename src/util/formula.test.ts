import { Formula } from './formula';

describe('Test getProperties function', () => {
  it('should return properties from formula #tariffRateBand.consumptionUpperLimit', () => {
    const formula = '#tariffRateBand.consumptionUpperLimit';

    const properties = Formula.getProperties(formula);

    expect(properties).toBeTruthy();
    expect(properties.size).toEqual(1);
    expect(properties).toContain('tariffRateBand.consumptionUpperLimit');
  });

  it('should return properties from formula #tariffRateBand.consumptionUpperLimit?', () => {
    const formula = '#tariffRateBand.consumptionUpperLimit?';

    const properties = Formula.getProperties(formula);
    expect(properties).toBeTruthy();
    expect(properties.size).toEqual(1);
    expect(properties).toContain('tariffRateBand.consumptionUpperLimit');
  });

  it('should return properties from formula #tariffRateBand.consumptionUpperLimit?:999999', () => {
    const formula = '#tariffRateBand.consumptionUpperLimit?:999999';

    const properties = Formula.getProperties(formula);
    expect(properties).toBeTruthy();
    expect(properties.size).toEqual(1);
    expect(properties).toContain('tariffRateBand.consumptionUpperLimit');
  });

  it('should return properties from formula #tariffRateBand.propertyUpperLimit', () => {
    const formula = '#tariffRateBand.propertyUpperLimit';

    const properties = Formula.getProperties(formula);

    expect(properties).toBeTruthy();
    expect(properties.size).toEqual(1);
    expect(properties).toContain('tariffRateBand.propertyUpperLimit');
  });

  it('should return properties from formula #tariffRateBand.demandUpperLimit', () => {
    const formula = '#tariffRateBand.demandUpperLimit';

    const properties = Formula.getProperties(formula);

    expect(properties).toBeTruthy();
    expect(properties.size).toEqual(1);
    expect(properties).toContain('tariffRateBand.demandUpperLimit');
  });

  it('should return properties from formula #tariffRateBand.calculationFactor', () => {
    const formula = '#tariffRateBand.calculationFactor';

    const properties = Formula.getProperties(formula);

    expect(properties).toBeTruthy();
    expect(properties.size).toEqual(1);
    expect(properties).toContain('tariffRateBand.calculationFactor');
  });

  it('should return properties from formula ( #tariffRateBand.consumptionUpperLimit * #billingDemand1065 ) + ( #tariffRateBand.propertyUpperLimit )', () => {
    const formula = '( #tariffRateBand.consumptionUpperLimit * #billingDemand1065 ) + ( #tariffRateBand.propertyUpperLimit )';

    const properties = Formula.getProperties(formula);

    expect(properties).toBeTruthy();
    expect(properties.size).toEqual(3);
    expect(properties).toContain('tariffRateBand.consumptionUpperLimit');
    expect(properties).toContain('billingDemand1065');
    expect(properties).toContain('tariffRateBand.propertyUpperLimit');
  });

  it('should return properties from formula #capacityReservationLevel * #tariffRateBand.consumptionUpperLimit', () => {
    const formula = '#capacityReservationLevel * #tariffRateBand.consumptionUpperLimit';

    const properties = Formula.getProperties(formula);

    expect(properties).toBeTruthy();
    expect(properties.size).toEqual(2);
    expect(properties).toContain('capacityReservationLevel');
    expect(properties).toContain('tariffRateBand.consumptionUpperLimit');
  });

  it('should return properties from formula #tariffRateBand.consumptionUpperLimit * #tariffRateBand.demandUpperLimit', () => {
    const formula = '#tariffRateBand.consumptionUpperLimit * #tariffRateBand.demandUpperLimit';

    const properties = Formula.getProperties(formula);

    expect(properties).toBeTruthy();
    expect(properties.size).toEqual(2);
    expect(properties).toContain('tariffRateBand.consumptionUpperLimit');
    expect(properties).toContain('tariffRateBand.demandUpperLimit');
  });

  it('should return properties from formula #fnMinUpperLimit( { ( #tariffRateBand.propertyUpperLimit?:9999999 ) * #demand , ( #tariffRateBand.prevUpperLimit + ( #tariffRateBand.consumptionUpperLimit?:9999999 ) ) } ) #tariffRateBand.consumptionUpperLimit * #tariffRateBand.propertyUpperLimit * #billingPeriod.days * ( #billingPeriod.rateUsage / #billingPeriod.kWh ) + ( #dailyMedicalAllowance * #billingPeriod.days * ( #billingPeriod.rateUsage / #billingPeriod.kWh ) )', () => {
    const formula = '#fnMinUpperLimit( { ( #tariffRateBand.propertyUpperLimit?:9999999 ) * #demand , ( #tariffRateBand.prevUpperLimit + ( #tariffRateBand.consumptionUpperLimit?:9999999 ) ) } ) #tariffRateBand.consumptionUpperLimit * #tariffRateBand.propertyUpperLimit * #billingPeriod.days * ( #billingPeriod.rateUsage / #billingPeriod.kWh ) + ( #dailyMedicalAllowance * #billingPeriod.days * ( #billingPeriod.rateUsage / #billingPeriod.kWh ) )';

    const properties = Formula.getProperties(formula);

    expect(properties).toBeTruthy();
    expect(properties.size).toEqual(8);
    expect(properties).toContain('tariffRateBand.consumptionUpperLimit');
    expect(properties).toContain('tariffRateBand.propertyUpperLimit');
    expect(properties).toContain('tariffRateBand.prevUpperLimit');
    expect(properties).toContain('billingPeriod.days');
    expect(properties).toContain('billingPeriod.rateUsage');
    expect(properties).toContain('billingPeriod.kWh');
    expect(properties).toContain('dailyMedicalAllowance');
    expect(properties).toContain('demand');
  });

  it('should return properties from formula ( ( #ratchet4BillingDemand3086 * #tariffRateBand.propertyUpperLimit ) + #tariffRateBand.consumptionUpperLimit )', () => {
    const formula = '( ( #ratchet4BillingDemand3086 * #tariffRateBand.propertyUpperLimit ) + #tariffRateBand.consumptionUpperLimit )';

    const properties = Formula.getProperties(formula);

    expect(properties).toBeTruthy();
    expect(properties.size).toEqual(3);
    expect(properties).toContain('ratchet4BillingDemand3086');
    expect(properties).toContain('tariffRateBand.propertyUpperLimit');
    expect(properties).toContain('tariffRateBand.consumptionUpperLimit');
  });

  it('should return properties from formula #fnMaxUpperLimit( { ( #tariffRateBand.propertyUpperLimit?:9999999 ) * #ratchetCurtailableBillingDemand1579 , #tariffRateBand.consumptionUpperLimit?:99999 } )', () => {
    const formula = '#fnMaxUpperLimit( { ( #tariffRateBand.propertyUpperLimit?:9999999 ) * #ratchetCurtailableBillingDemand1579 , #tariffRateBand.consumptionUpperLimit?:99999 } )';

    const properties = Formula.getProperties(formula);

    expect(properties).toBeTruthy();
    expect(properties.size).toEqual(3);
    expect(properties).toContain('tariffRateBand.propertyUpperLimit');
    expect(properties).toContain('ratchetCurtailableBillingDemand1579');
    expect(properties).toContain('tariffRateBand.consumptionUpperLimit');
  });

  it('should return properties from formula #tariffRateBand.demandUpperLimit * #tariffRateBand.calculationFactor', () => {
    const formula = '#tariffRateBand.demandUpperLimit * #tariffRateBand.calculationFactor';

    const properties = Formula.getProperties(formula);

    expect(properties).toBeTruthy();
    expect(properties.size).toEqual(2);
    expect(properties).toContain('tariffRateBand.demandUpperLimit');
    expect(properties).toContain('tariffRateBand.calculationFactor');
  });

  it('should return all properties from formula with properties', () => {
    const formula = '( #tariffRateBand.consumptionUpperLimit + #dailyMedicalAllowance ) * #tariffRateBand.propertyUpperLimit   * #billingPeriod.days';

    const properties = Formula.getProperties(formula);

    expect(properties).toBeTruthy();
    expect(properties.size).toEqual(4);
    expect(properties).toContain('tariffRateBand.consumptionUpperLimit');
    expect(properties).toContain('dailyMedicalAllowance');
    expect(properties).toContain('tariffRateBand.propertyUpperLimit');
    expect(properties).toContain('billingPeriod.days');
  });

  it('should return all non-function properties from formula with function and properties', () => {
    const formula = '#fnMaxUpperLimit ( { #billingDemand + ( #excessKVAR406 / 20 ) , 0 } )';

    const properties = Formula.getProperties(formula);

    expect(properties).toBeTruthy();
    expect(properties.size).toEqual(2);
    expect(properties).toContain('billingDemand');
    expect(properties).toContain('excessKVAR406');
  });

  it('should return empty set from formula with function and without properties', () => {
    const formula = '#fnMin ( { 100 , 200 } )';

    const properties = Formula.getProperties(formula);

    expect(properties).toBeTruthy();
    expect(properties.size).toEqual(0);
  });

  it('should return empty set from formula without properties', () => {
    const formula = '100 + 200 / 50';

    const properties = Formula.getProperties(formula);

    expect(properties).toBeTruthy();
    expect(properties.size).toEqual(0);
  });

  it('should return empty set from empty formula', () => {
    const formula = '';

    const properties = Formula.getProperties(formula);

    expect(properties).toBeTruthy();
    expect(properties.size).toEqual(0);
  });
})