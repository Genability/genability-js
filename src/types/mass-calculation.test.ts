import { 
  MassCalculation,
  isMassCalculation,
} from "./mass-calculation";


describe("mass-caculation types", () => {
  describe("isMassCalculation function", () => {
    it("should be false for invalid JSON", () => {
      const massCalculation: MassCalculation = JSON.parse('{"notAKeyName": "BooleanKeyName","dataType": "BOOLEAN"}');
      expect(isMassCalculation(massCalculation)).toEqual(false);
    })
    it("should be true for valid JSON", () => {
      const json = '{\
        "fromDateTime": "2016-07-13T00:00:00-07:00",\
        "toDateTime": "2016-08-11T00:00:00-07:00",\
        "scenarios": ""\
      }';
      const massCalculation: MassCalculation  = JSON.parse(json);
      expect(isMassCalculation(massCalculation)).toEqual(true);
    })
  });
});