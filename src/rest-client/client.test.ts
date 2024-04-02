jest.mock('axios', () => ({
  create: (): any => ({
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
    get: jest.fn(() => Promise.resolve({ data: {} })),
  }),
}));

import axios from 'axios';
import { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
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
  requestInterceptor: (request): InternalAxiosRequestConfig => request,
  responseInterceptor: (response): AxiosResponse => response
});

class TestClass extends RestApiClient{

}

describe('Check api credentials', () => {
  it('is Empty credentials', async () => {
    const obj: TestClass = new TestClass(new GenabilityConfig({ credentials: emptyApiCredentials }));
    expect(obj).toBeTruthy();
  })
  it('is jwt credentials', async () => {
    const obj: TestClass = new TestClass(new GenabilityConfig({credentials: jwtApiCredentials}));
    expect(obj).toBeTruthy();
  })
  it('is jwt credentials with credentialsFn', async () => {
    const obj: TestClass = new TestClass(new GenabilityConfig({credentials: (): Promise<RestApiCredentialsObject> => { return Promise.resolve(jwtApiCredentials) }}));
    await obj.getSingle('test');
    await obj.getPaged('test');
    expect(obj).toBeTruthy();
  })
})

describe('Check interceptors', () => {
  const axiosCreateSpy = jest.spyOn(axios, 'create');

  beforeEach(() => {
    axiosCreateSpy.mockClear();
  })

  it('is jwt credentials with credentialsFn', async () => {
    if (credentialsWithInterceptor.useCredentialsFromFile) {
      await credentialsWithInterceptor.setCredentialsFromFile();
    }
    const obj: TestClass = new TestClass(credentialsWithInterceptor);
    await obj.getSingle('test');
    await obj.getPaged('test');
    expect(obj).toBeTruthy();
    expect(axiosCreateSpy).toHaveBeenCalledTimes(1);
    const mockAxiosInstance = axiosCreateSpy.mock.results[0].value;
    expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalledTimes(1);
    expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalledTimes(1);
  })
})
