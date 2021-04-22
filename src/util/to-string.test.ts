import { ToString } from "./to-string";
import { TimeOfUse, TimeOfUsePeriod } from "../types/time-of-use";

describe('Test timeOfUsePeriod method', () => {
  it('should return correct fromatted text', () => {
    const toup1: TimeOfUsePeriod = {
      touPeriodId: 1,
      fromDayOfWeek: 0,
      fromHour: 0,
      fromMinute: 0,
      toDayOfWeek: 4,
      toHour: 13,
      toMinute: 30
    };

    const toup2: TimeOfUsePeriod = {
      touPeriodId: 1,
      fromDayOfWeek: 0,
      fromHour: 9,
      fromMinute: 15,
      toDayOfWeek: 6,
      toHour: 20,
      toMinute: 0
    };

    const toup3: TimeOfUsePeriod = {
      touPeriodId: 1,
      fromDayOfWeek: 5,
      fromHour: 22,
      fromMinute: 0,
      toDayOfWeek: 6,
      toHour: 4,
      toMinute: 0
    };

    const toup4: TimeOfUsePeriod = {
      touPeriodId: 1,
      fromDayOfWeek: 0,
      fromHour: 0,
      fromMinute: 59,
      toDayOfWeek: 6,
      toHour: 23,
      toMinute: 10
    };

    const toup5: TimeOfUsePeriod = {
      touPeriodId: 1,
      fromDayOfWeek: 0,
      fromHour: 22,
      fromMinute: 0,
      toDayOfWeek: 6,
      toHour: 4,
      toMinute: 0
    };
    
    const formattedText1 = ToString.timeOfUsePeriod(toup1);
    expect(formattedText1).toEqual("12am-1:30pm Mo-Fr");
    const formattedText2 = ToString.timeOfUsePeriod(toup2);
    expect(formattedText2).toEqual("9:15am-8pm");
    const formattedText3 = ToString.timeOfUsePeriod(toup3);
    expect(formattedText3).toEqual("10pm-4am Sa-Su");
    const formattedText4 = ToString.timeOfUsePeriod(toup4);
    expect(formattedText4).toEqual("12:59am-11:10pm");
    const formattedText5 = ToString.timeOfUsePeriod(toup5);
    expect(formattedText5).toEqual("10pm-4am");
  });
});

describe('Test timeOfUse method', () => {
  it('touName but no season, and no periods', () => {
    const tou: TimeOfUse = { touId: 1, touName: 'testTouName' }
    const res = ToString.timeOfUse(tou);
    expect(res).toEqual("testTouName")
  });

  it('touName and season, but no periods', () => {
    const tou: TimeOfUse = {
      touId: 1,
      touName: 'testTouName',
      season: {
        seasonId: 1,
        seasonName: 'testSeasonName'
      }
    }
    const res = ToString.timeOfUse(tou);
    expect(res).toEqual("testTouName testSeasonName")
  });

  it('touName and 1 period but no season', () => {
    const tou: TimeOfUse = {
      touId: 1,
      touName: 'testTouName',
      touPeriods: [{
        touPeriodId: 1,
        fromDayOfWeek: 0,
        fromHour: 0,
        fromMinute: 0,
        toDayOfWeek: 4,
        toHour: 13,
        toMinute: 30
      }]
    }
    const res = ToString.timeOfUse(tou);
    expect(res).toEqual("testTouName 12am-1:30pm Mo-Fr")
  })

  it('touName and 2 periods but no season', () => {
    const tou: TimeOfUse = {
      touId: 1,
      touName: 'testTouName',
      touPeriods: [{
        touPeriodId: 1,
        fromDayOfWeek: 0,
        fromHour: 0,
        fromMinute: 0,
        toDayOfWeek: 4,
        toHour: 13,
        toMinute: 30
      }, {
        touPeriodId: 1,
        fromDayOfWeek: 0,
        fromHour: 9,
        fromMinute: 15,
        toDayOfWeek: 6,
        toHour: 20,
        toMinute: 0
      }]
    }
    const res = ToString.timeOfUse(tou);
    expect(res).toEqual("testTouName 12am-1:30pm Mo-Fr, 9:15am-8pm")
  })

  it('touName and a season and 1 period', () => {
    const tou: TimeOfUse = {
      touId: 1,
      touName: 'testTouName',
      season: {
        seasonId: 1,
        seasonName: 'testSeasonName'
      },
      touPeriods: [{
        touPeriodId: 1,
        fromDayOfWeek: 0,
        fromHour: 0,
        fromMinute: 0,
        toDayOfWeek: 4,
        toHour: 13,
        toMinute: 30
      }]
    }
    const res = ToString.timeOfUse(tou);
    expect(res).toEqual("testTouName testSeasonName 12am-1:30pm Mo-Fr")
  })
});