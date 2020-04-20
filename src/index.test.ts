import { hello } from "./index";

describe("hello", () => {
  it("should default correctly", () => {
    expect(hello()).toEqual("Hello World!");
    expect(hello("Universe")).toEqual("Hello Universe!");
  })
});
