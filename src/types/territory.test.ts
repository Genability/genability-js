import { 
  Territory
} from './territory';

describe("Territory types", () => {
  it("works for Territory", () => {
    const territoryJson = '{\
      "territoryId": 1,\
      "territoryName": 2\
      }';
    const territory: Territory = JSON.parse(territoryJson);
    expect(territory.territoryId).toEqual(1);
    expect(territory.territoryName).toEqual(2);
  })
});
