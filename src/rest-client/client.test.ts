const axiosInstanceMock = {
  interceptors: {
    request: {
      use: (): object => {
        return {};
      }
    }
  },
  get: (): object => {
    return {
      data: {}
    };
  }
};

jest.mock('axios', () => {
  return {
    create: (): object => {
      return axiosInstanceMock;
    }
  }
});

import {
  RestApiClient, RestApiCredentials, RestApiCredentialsObject
} from './client';

const emptyApiCredentials: RestApiCredentials = {
  appId: '',
  appKey: '',
}

const jwtApiCredentials: RestApiCredentials = {
  jwt: ''
}

const proxyApiCredentials: RestApiCredentials = {
  jwt: '',
  proxyReq: (a = "") => {return a}
}

class TestClass extends RestApiClient{

}

const axiosInterceptorsRequestUseSpy = jest.spyOn(axiosInstanceMock.interceptors.request, "use");

describe("Check api credentials", () => {
  afterEach(() => {
    axiosInterceptorsRequestUseSpy.mockClear();
  })

  it("is Empty credentials", () => {
    const obj: TestClass = new TestClass('', emptyApiCredentials);
    expect(obj).toBeTruthy();
  })
  it("is jwt credentials", () => {
    const obj: TestClass = new TestClass('', jwtApiCredentials);
    expect(obj).toBeTruthy();
  })
  it("is proxy credentials", async () => {
    const obj: TestClass = new TestClass('', proxyApiCredentials);
    await obj.getSingle("test");
    await obj.getPaged("test");
    expect(obj).toBeTruthy();
    expect(axiosInterceptorsRequestUseSpy).toHaveBeenCalledTimes(1);
  })
  it("is jwt credentials with credentialsFn", async () => {
    const obj: TestClass = new TestClass('', (): Promise<RestApiCredentialsObject> => { return Promise.resolve(jwtApiCredentials) });
    await obj.getSingle("test");
    await obj.getPaged("test");
    expect(obj).toBeTruthy();
    expect(axiosInterceptorsRequestUseSpy).toHaveBeenCalledTimes(0);
  })
  it("is jwt credentials with credentialsFn and proxyReq", async () => {
    const obj: TestClass = new TestClass('', (): Promise<RestApiCredentialsObject> => { return Promise.resolve(proxyApiCredentials) });
    await obj.getSingle("test");
    await obj.getPaged("test");
    expect(obj).toBeTruthy();
    expect(axiosInterceptorsRequestUseSpy).toHaveBeenCalledTimes(2);
  })
})
