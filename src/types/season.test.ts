import { 
  Season,
  PredominanceRule,
  SeasonGroup,
  isSeasonGroup
} from './season';

describe("Season types", () => {
  it("works for PredominanceRule", () => {
    const seasonJson = '{\
      "seasonId": 1,\
      "seasonGroupId": 3,\
      "fromEdgePredominance": "PREDOMINANT"\
      }';
    const season: Season = JSON.parse(seasonJson);
    expect(season.seasonId).toEqual(1);
    expect(season.seasonGroupId).toEqual(3);
    expect(season.fromEdgePredominance).toEqual(PredominanceRule.PREDOMINANT);
  })
  it("works for Season", () => {
    const seasonJson = '{\
      "seasonId": 1,\
      "seasonGroupId": 3\
      }';
    const season: Season = JSON.parse(seasonJson);
    expect(season.seasonId).toEqual(1);
    expect(season.seasonGroupId).toEqual(3);
  })
  it("works for SeasonGroup", () => {
    const seasonJson = '{\
      "seasonId": 1,\
      "seasonGroupId": 3\
      }';
    const seasonGroupJson = `{\
      "seasonGroupId": 3,\
      "seasons": [${seasonJson}]\
      }`;
    const season: Season = JSON.parse(seasonJson);
    const seasonGroup: SeasonGroup = JSON.parse(seasonGroupJson);
    expect(seasonGroup.seasonGroupId).toEqual(3);
    expect(season.seasonGroupId).toEqual(3);
    expect(seasonGroup.seasons).toEqual([season]);
  })
});
describe("isSeasonGroup", () => {
  it("works for isSeasonGroup", () => {
    const seasonGroupJson = `{\
      "seasonGroupId": 3\
      }`;
    const seasonGroup: SeasonGroup = JSON.parse(seasonGroupJson);
    expect(seasonGroup.seasonGroupId).toEqual(3);
    expect(isSeasonGroup(seasonGroup)).toBeTruthy();
  });
});
