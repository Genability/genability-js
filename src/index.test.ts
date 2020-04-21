import { echoHello } from "./index";

describe("echoHello", () => {
  it("should default correctly", () => {
    expect(echoHello()).toEqual("Hello World!");
    expect(echoHello("Universe")).toEqual("Hello Universe!");
  })
});
