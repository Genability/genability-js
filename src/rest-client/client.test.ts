import {
  RestApiClient, RestApiCredentials
} from './client';

const emptyApiCredentials: RestApiCredentials = {
  appId: '',
  appKey: '',
}

const jwtApiCredentials: RestApiCredentials = {
  jwt: ''
}

const proxyApiCredentials: RestApiCredentials = {
  proxyReq: (a = "") => {return a}
}

class TestClass extends RestApiClient{

}

describe("Check api credentials", () => {
  it("is Empty credentials", () => {
    const obj: TestClass = new TestClass('', emptyApiCredentials);
    expect(obj).toBeTruthy();
  })
  it("is jwt credentials", () => {
    const obj: TestClass = new TestClass('', jwtApiCredentials);
    expect(obj).toBeTruthy();
  })
  it("is proxy credentials", () => {
    const obj: TestClass = new TestClass('', proxyApiCredentials);
    expect(obj).toBeTruthy();
  })
  it("is jwt credentials with credentialsFn", () => {
    const obj: TestClass = new TestClass('', jwtApiCredentials, (): Promise<RestApiCredentials> => { return Promise.resolve(jwtApiCredentials) });
    expect(obj).toBeTruthy();
  })
})
