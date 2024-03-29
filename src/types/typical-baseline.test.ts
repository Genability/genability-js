import { 
  MeasureUnit,
  Baseline,
  BaselineMeasure,
  IntervalInfo,
  Measure,
  Factor,
  BuildingType,
  isBaseline,
  suitableTypicalBuildingIdForTariff
} from './typical-baseline';
import { CustomerClass, Tariff } from './tariff';

describe('TypicalBaseline types', () => {
  it('works for MeasureUnit', () => {
    const baseline: Baseline = JSON.parse('{"baselineId": "Baseline Id", "measureUnit": "intensity"}');
    expect(baseline.baselineId).toEqual('Baseline Id');
    expect(baseline.measureUnit).toEqual(MeasureUnit.INTENSITY);
  })
  it('works for BaselineMeasure', () => {
    const baselineMeasure: BaselineMeasure = JSON.parse('{"i": 3,"v": 2}');
    expect(baselineMeasure).toHaveProperty('i', 3);
    expect(baselineMeasure).toHaveProperty('v', 2);
  })
  it('works for IntervalInfo', () => {
    const intervalInfo: IntervalInfo = JSON.parse('{\
      "fromDateTime": "2014-01-01T00:00:00.000Z",\
      "toDateTime": "2014-02-01T00:00:00.000Z",\
      "duration": 2678400000\
    }');
    expect(intervalInfo).toHaveProperty('fromDateTime', '2014-01-01T00:00:00.000Z');
    expect(intervalInfo).toHaveProperty('toDateTime', '2014-02-01T00:00:00.000Z');
    expect(intervalInfo).toHaveProperty('duration', 2678400000);
  })
  it('works for Measure', () => {
    const measure: Measure = JSON.parse('{"quantityAmount": 1, "rateAmount": 2, "costAccuracy": 99}');
    expect(measure).toHaveProperty('quantityAmount', 1);
    expect(measure).toHaveProperty('rateAmount', 2);
    expect(measure).toHaveProperty('costAccuracy', 99);
  })
  it('works for Factor', () => {
    const factor: Factor = JSON.parse('{\
      "peakDemand": 1,\
      "monthlyConsumption": 2,\
      "annualConsumption": 3,\
      "meanAnnualConsumption": 4,\
      "meanBuildingArea": 5,\
      "meanIntensity": 6,\
      "buildingArea": 7\
    }');
    expect(factor).toHaveProperty('peakDemand', 1);
    expect(factor).toHaveProperty('monthlyConsumption', 2);
    expect(factor).toHaveProperty('annualConsumption', 3);
    expect(factor).toHaveProperty('meanAnnualConsumption', 4);
    expect(factor).toHaveProperty('meanBuildingArea', 5);
    expect(factor).toHaveProperty('meanIntensity', 6);
    expect(factor).toHaveProperty('buildingArea', 7);
  })
  it('works for BuildingType', () => {
    const buildingType: BuildingType = JSON.parse('{\
      "id": "1",\
      "name": "name",\
      "description": "description",\
      "customerClass": "GENERAL"\
    }');
    expect(buildingType).toHaveProperty('id', '1');
    expect(buildingType).toHaveProperty('name', 'name');
    expect(buildingType).toHaveProperty('description', 'description');
    expect(buildingType).toHaveProperty('customerClass', CustomerClass.GENERAL);
  })
});

describe('works for isBaseline', () => {
  it('should be false for invalid JSON', () => {
    const baselineJson = '{\
      "baselineId": "baselineId"\
      }';
    const baseline: Baseline = JSON.parse(baselineJson);
    expect(baseline.baselineId).toEqual('baselineId');
    expect(isBaseline(baseline)).toBeFalsy();
  });
  it('should be true for valid JSON', () => {
    const baselineJson = '{\
      "baselineId": "baselineId",\
      "name": "name",\
      "buildingType": {"id": "RESIDENTIAL"},\
      "climateZone": {"territoryId": 31313},\
      "factors": {"peakDemand": 2121}\
      }';
    const baseline: Baseline = JSON.parse(baselineJson);
    expect(baseline.baselineId).toEqual('baselineId');
    expect(isBaseline(baseline)).toBeTruthy();
  });
});

describe('works for suitableTypicalBuildingIdForTariff', () => {
  it('should return string \'RESIDENTIAL\' if CustomerClass is RESIDENTIAL', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "RESIDENTIAL"}');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('RESIDENTIAL');
  });
  it('should return string \'LARGE_COMMERCIAL\' if CustomerClass is SPECIAL_USE', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "SPECIAL_USE"}');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('LARGE_COMMERCIAL');
  });
  it('should return string \'MEDIUM_COMMERCIAL\' if CustomerClass is GENERAL and minMonthlyConsumption, maxMonthlyConsumption, minMonthlyDemand and maxMonthlyDemand are not populated', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL"}');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('MEDIUM_COMMERCIAL');
  });

  it('should return string \'SMALL_COMMERCIAL\' if CustomerClass is GENERAL and maxMonthlyConsumption <= 5000', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "maxMonthlyConsumption": 5000 }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('SMALL_COMMERCIAL');
  });
  it('should return string \'SMALL_COMMERCIAL\' if CustomerClass is GENERAL and minMonthlyConsumption >= 5000', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "minMonthlyConsumption": 5000 }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('SMALL_COMMERCIAL');
  });
  it('should return string \'SMALL_COMMERCIAL\' if CustomerClass is GENERAL and maxMonthlyDemand <= 100', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "maxMonthlyDemand": 99  }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('SMALL_COMMERCIAL');
  });
  it('should return string \'SMALL_COMMERCIAL\' if CustomerClass is GENERAL and minMonthlyDemand >= 100', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "minMonthlyDemand": 101  }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('SMALL_COMMERCIAL');
  });

  it('should return string \'SMALL_COMMERCIAL\' if CustomerClass is GENERAL and maxMonthlyConsumption <= 10000', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "maxMonthlyConsumption": 10000 }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('SMALL_COMMERCIAL');
  });
  it('should return string \'SMALL_COMMERCIAL\' if CustomerClass is GENERAL and minMonthlyConsumption >= 10000', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "minMonthlyConsumption": 10000 }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('SMALL_COMMERCIAL');
  });
  it('should return string \'SMALL_COMMERCIAL\' if CustomerClass is GENERAL and maxMonthlyDemand <= 200', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "maxMonthlyDemand": 200  }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('SMALL_COMMERCIAL');
  });
  it('should return string \'SMALL_COMMERCIAL\' if CustomerClass is GENERAL and minMonthlyDemand >= 200', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "minMonthlyDemand": 200  }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('SMALL_COMMERCIAL');
  });

  it('should return string \'MEDIUM_COMMERCIAL\' if CustomerClass is GENERAL and maxMonthlyConsumption <= 50000', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "maxMonthlyConsumption": 50000 }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('MEDIUM_COMMERCIAL');
  });
  it('should return string \'MEDIUM_COMMERCIAL\' if CustomerClass is GENERAL and minMonthlyConsumption >= 50000', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "minMonthlyConsumption": 50000 }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('MEDIUM_COMMERCIAL');
  });
  it('should return string \'MEDIUM_COMMERCIAL\' if CustomerClass is GENERAL and maxMonthlyDemand <= 400', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "maxMonthlyDemand": 390  }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('MEDIUM_COMMERCIAL');
  });
  it('should return string \'MEDIUM_COMMERCIAL\' if CustomerClass is GENERAL and minMonthlyDemand >= 400', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "minMonthlyDemand": 401  }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('MEDIUM_COMMERCIAL');
  });

  it('should return string \'LARGE_COMMERCIAL\' if CustomerClass is GENERAL and maxMonthlyConsumption <= 250000', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "maxMonthlyConsumption": 250000 }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('LARGE_COMMERCIAL');
  });
  it('should return string \'LARGE_COMMERCIAL\' if CustomerClass is GENERAL and minMonthlyConsumption >= 250000', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "minMonthlyConsumption": 250000 }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('LARGE_COMMERCIAL');
  });
  it('should return string \'LARGE_COMMERCIAL\' if CustomerClass is GENERAL and maxMonthlyDemand <= 500', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "maxMonthlyDemand": 450  }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('LARGE_COMMERCIAL');
  });
  it('should return string \'LARGE_COMMERCIAL\' if CustomerClass is GENERAL and minMonthlyDemand >= 500', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "minMonthlyDemand": 550  }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('LARGE_COMMERCIAL');
  });

  it('should return string \'LARGE_COMMERCIAL\' if CustomerClass is GENERAL and maxMonthlyConsumption <= 500000', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "maxMonthlyConsumption": 450000 }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('LARGE_COMMERCIAL');
  });
  it('should return string \'LARGE_COMMERCIAL\' if CustomerClass is GENERAL and minMonthlyConsumption >= 500000', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "minMonthlyConsumption": 550000 }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('LARGE_COMMERCIAL');
  });
  it('should return string \'LARGE_COMMERCIAL\' if CustomerClass is GENERAL and maxMonthlyDemand <= 900', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "maxMonthlyDemand": 700  }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('LARGE_COMMERCIAL');
  });
  it('should return string \'LARGE_COMMERCIAL\' if CustomerClass is GENERAL and minMonthlyDemand >= 900', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "minMonthlyDemand": 950  }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('LARGE_COMMERCIAL');
  });

  it('should return string \'SMALL_COMMERCIAL\' if CustomerClass is GENERAL and minMonthlyConsumption < 5000', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "minMonthlyConsumption": 1000 }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('SMALL_COMMERCIAL');
  });
  it('should return string \'SMALL_COMMERCIAL\' if CustomerClass is GENERAL and minMonthlyDemand < 100', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "minMonthlyDemand": 50  }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('SMALL_COMMERCIAL');
  });
  it('should return string \'LARGE_COMMERCIAL\' if CustomerClass is GENERAL and maxMonthlyConsumption > 500000', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "maxMonthlyConsumption": 600000 }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('LARGE_COMMERCIAL');
  });
  it('should return string \'LARGE_COMMERCIAL\' if CustomerClass is GENERAL and maxMonthlyDemand > 900', () => {
    const tariff: Tariff = JSON.parse('{"tariffName": "StringName", "customerClass": "GENERAL", "maxMonthlyDemand": 1000  }');
    expect(suitableTypicalBuildingIdForTariff(tariff)).toEqual('LARGE_COMMERCIAL');
  });
});