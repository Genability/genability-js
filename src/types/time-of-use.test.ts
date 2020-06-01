import { 
  TimeOfUse,
  Interval,
  TimeOfUsePeriod,
  Period,
  isTimeOfUsePeriod,
  isTimeOfUse,
  isInterval,
  isPeriod
} from './time-of-use';

describe("works for types", () => {
  it("works for TimeOfUse", () => {
    const timeOfUseJson = '{\
      "touId": 1,\
      "touName": 2,\
      "touGroupId": 3\
      }';
    const timeOfUse: TimeOfUse = JSON.parse(timeOfUseJson);
    expect(timeOfUse.touId).toEqual(1);
    expect(timeOfUse.touName).toEqual(2);
    expect(timeOfUse.touGroupId).toEqual(3);
  })
  it("works for Interval", () => {
    const intervalJson = '{\
      "touId": 1,\
      "touGroupId": 3,\
      "fromDateTime": "2011-06-12T19:00:00.0-0700"\
      }';
    const interval: Interval = JSON.parse(intervalJson);
    expect(interval.touId).toEqual(1);
    expect(interval.touGroupId).toEqual(3);
    expect(interval.fromDateTime).toEqual("2011-06-12T19:00:00.0-0700");
  })
  it("works for TimeOfUsePeriod", () => {
    const timeOfUseJson = '{\
      "touId": 1,\
      "touName": 2,\
      "touGroupId": 3\
      }';
    const tougJson = `{\
      "lseId": 1,\
      "touGroupId": 3,\
      "timeOfUses":[${timeOfUseJson}]\
      }`;
    const timeOfUse: TimeOfUse = JSON.parse(timeOfUseJson);
    const timeOfUseroup: TimeOfUsePeriod = JSON.parse(tougJson);
    expect(timeOfUseroup.lseId).toEqual(1);
    expect(timeOfUseroup.touGroupId).toEqual(3);
    expect(timeOfUseroup.timeOfUses).toEqual([timeOfUse]);
  })
  it("works for Period", () => {
    const periodJson = '{\
      "touId": 1,\
      "touPeriodId": 2\
      }';
    const period: Period = JSON.parse(periodJson);
    expect(period.touId).toEqual(1);
    expect(period.touPeriodId).toEqual(2);
  })
});

describe("works for isTimeOfUsePeriod", () => {
  it("should be false for invalid JSON", () => {
    const tougJson = `{\
      "lseId": 1\
      }`;
    const timeOfUseroup: TimeOfUsePeriod = JSON.parse(tougJson);
    expect(isTimeOfUsePeriod(timeOfUseroup)).toEqual(false);
  })
  it("should be true for valid JSON", () => {
    const tougJson = `{\
      "lseId": 1,\
      "touGroupId": 3\
      }`;
    const timeOfUseroup: TimeOfUsePeriod = JSON.parse(tougJson);
    expect(isTimeOfUsePeriod(timeOfUseroup)).toEqual(true);
  })
});

describe("works for isTimeOfUse", () => {
  it("should be false for invalid JSON", () => {
    const timeOfUseJson = '{\
      "touId": 1,\
      "touName": 2,\
      "touGroupId": 3\
      }';
    const timeOfUse: TimeOfUse = JSON.parse(timeOfUseJson);
    expect(isTimeOfUse(timeOfUse)).toEqual(false);
  })
  it("should be true for valid JSON", () => {
    const timeOfUseJson = '{\
      "touId": 1,\
      "touName": "name",\
      "lseId": 2,\
      "touGroupId": 3\
      }';
    const timeOfUse: TimeOfUse = JSON.parse(timeOfUseJson);
    expect(isTimeOfUse(timeOfUse)).toEqual(true);
  })
});

describe("works for isInterval", () => {
  it("should be false for invalid JSON", () => {
    const intervalJson = '{\
      "touId": 1,\
      "touGroupId": 3,\
      "fromDateTime": "2011-06-12T19:00:00.0-0700"\
      }';
    const interval: Interval = JSON.parse(intervalJson);
    expect(isInterval(interval)).toEqual(false);
  })
  it("should be true for valid JSON", () => {
    const intervalJson = '{\
      "touId": 1,\
      "touName": "name",\
      "touGroupId": 3,\
      "fromDateTime": "2011-06-12T19:00:00.0-0700"\
      }';
    const interval: Interval = JSON.parse(intervalJson);
    expect(isInterval(interval)).toEqual(true);
  })
});

describe("works for isPeriod", () => {
  it("should be false for invalid JSON", () => {
    const periodJson = '{\
      "touId": 1\
      }';
    const period: Period = JSON.parse(periodJson);
    expect(isPeriod(period)).toEqual(false);
  })
  it("should be true for valid JSON", () => {
    const periodJson = '{\
      "touId": 1,\
      "touPeriodId": 2\
      }';
    const period: Period = JSON.parse(periodJson);
    expect(isPeriod(period)).toEqual(true);
  })
});
