const axiosInstanceMock = {
  interceptors: {
    request: {
      use: (): object => {
        return {};
      }
    },
    response: {
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

import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GenabilityConfig } from '.';
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

const credentialsWithInterceptor = new GenabilityConfig({
  credentials: emptyApiCredentials,
  requestInterceptor: (request): AxiosRequestConfig => request,
  responseInterceptor: (response): AxiosResponse => response
});

class TestClass extends RestApiClient{

}

const axiosInterceptorsRequestUseSpy = jest.spyOn(axiosInstanceMock.interceptors.request, "use");
const axiosInterceptorsResponseUseSpy = jest.spyOn(axiosInstanceMock.interceptors.response, "use");

describe("Check api credentials", () => {
  afterEach(() => {
    axiosInterceptorsRequestUseSpy.mockClear();
  })

  it("is Empty credentials", () => {
    const obj: TestClass = new TestClass(new GenabilityConfig({credentials: emptyApiCredentials}));
    expect(obj).toBeTruthy();
  })
  it("is jwt credentials", () => {
    const obj: TestClass = new TestClass(new GenabilityConfig({credentials: jwtApiCredentials}));
    expect(obj).toBeTruthy();
  })
  it("is jwt credentials with credentialsFn", async () => {
    const obj: TestClass = new TestClass(new GenabilityConfig({credentials: (): Promise<RestApiCredentialsObject> => { return Promise.resolve(jwtApiCredentials) }}));
    await obj.getSingle("test");
    await obj.getPaged("test");
    expect(obj).toBeTruthy();
  })
})

describe("Check interceptors", () => {
  afterEach(() => {
    axiosInterceptorsRequestUseSpy.mockClear();
  })

  it("is jwt credentials with credentialsFn", async () => {
    const obj: TestClass = new TestClass(credentialsWithInterceptor);
    await obj.getSingle("test");
    await obj.getPaged("test");
    expect(obj).toBeTruthy();
    expect(axiosInterceptorsRequestUseSpy).toHaveBeenCalledTimes(1);
    expect(axiosInterceptorsResponseUseSpy).toHaveBeenCalledTimes(1);
  })
})
