import { 
  TimeOfUseGroup,
  TimeOfUse,
  TimeOfUseInterval,
  TimeOfUsePeriod,
  isTimeOfUseGroup,
  isTimeOfUsePeriod,
  isTimeOfUse,
  isTimeOfUseInterval,
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
  it("works for TimeOfUseInterval", () => {
    const intervalJson = '{\
      "touId": 1,\
      "touGroupId": 3,\
      "fromDateTime": "2011-06-12T19:00:00.0-0700"\
      }';
    const interval: TimeOfUseInterval = JSON.parse(intervalJson);
    expect(interval.touId).toEqual(1);
    expect(interval.touGroupId).toEqual(3);
    expect(interval.fromDateTime).toEqual("2011-06-12T19:00:00.0-0700");
  })
  it("works for TimeOfUseGroup", () => {
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
    const timeOfUseroup: TimeOfUseGroup = JSON.parse(tougJson);
    expect(timeOfUseroup.lseId).toEqual(1);
    expect(timeOfUseroup.touGroupId).toEqual(3);
    expect(timeOfUseroup.timeOfUses).toEqual([timeOfUse]);
  })
  it("works for TimeOfUsePeriod", () => {
    const periodJson = '{\
      "touId": 1,\
      "touPeriodId": 2\
      }';
    const period: TimeOfUsePeriod = JSON.parse(periodJson);
    expect(period.touId).toEqual(1);
    expect(period.touPeriodId).toEqual(2);
  })
});

describe("works for isTimeOfUseGroup", () => {
  it("should be false for invalid JSON", () => {
    const tougJson = `{\
      "lseId": 1\
      }`;
    const timeOfUseroup: TimeOfUseGroup = JSON.parse(tougJson);
    expect(isTimeOfUseGroup(timeOfUseroup)).toEqual(false);
  })
  it("should be true for valid JSON", () => {
    const tougJson = `{\
      "lseId": 1,\
      "touGroupId": 3\
      }`;
    const timeOfUseroup: TimeOfUseGroup = JSON.parse(tougJson);
    expect(isTimeOfUseGroup(timeOfUseroup)).toEqual(true);
  })
});

describe("works for isTimeOfUse", () => {
  it("should be false for invalid JSON", () => {
    const timeOfUseJson = '{\
      "tou": 1,\
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

describe("works for isTimeOfUseInterval", () => {
  it("should be false for invalid JSON", () => {
    const intervalJson = '{\
      "tou": 1,\
      "touGroupId": 3,\
      "fromDateTime": "2011-06-12T19:00:00.0-0700"\
      }';
    const interval: TimeOfUseInterval = JSON.parse(intervalJson);
    expect(isTimeOfUseInterval(interval)).toEqual(false);
  })
  it("should be true for valid JSON", () => {
    const intervalJson = '{\
      "touId": 1,\
      "touName": "name",\
      "touGroupId": 3,\
      "fromDateTime": "2011-06-12T19:00:00.0-0700"\
      }';
    const interval: TimeOfUseInterval = JSON.parse(intervalJson);
    expect(isTimeOfUseInterval(interval)).toEqual(true);
  })
});

describe("works for isTimeOfUsePeriod", () => {
  it("should be false for invalid JSON", () => {
    const periodJson = '{\
      "touId": 1\
      }';
    const period: TimeOfUsePeriod = JSON.parse(periodJson);
    expect(isTimeOfUsePeriod(period)).toEqual(false);
  })
  it("should be true for valid JSON", () => {
    const periodJson = '{\
      "touId": 1,\
      "touPeriodId": 2\
      }';
    const period: TimeOfUsePeriod = JSON.parse(periodJson);
    expect(isTimeOfUsePeriod(period)).toEqual(true);
  })
});
