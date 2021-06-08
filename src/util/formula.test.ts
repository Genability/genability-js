import { Formula } from "./formula";

describe('Test getProperties function', () => {
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