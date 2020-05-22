import { 
  Season
} from './season';

describe("Season types", () => {
  it("works for Season", () => {
    const seasonJson = '{\
      "seasonId": 1,\
      "seasonName": 2,\
      "seasonGroupId": 3\
      }';
    const season: Season = JSON.parse(seasonJson);
    expect(season.seasonId).toEqual(1);
    expect(season.seasonName).toEqual(2);
    expect(season.seasonGroupId).toEqual(3);
  })
});
