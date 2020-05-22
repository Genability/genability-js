import { 
  TimeOfUse
} from './time-of-use';

describe("TimeOfUse types", () => {
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
});
