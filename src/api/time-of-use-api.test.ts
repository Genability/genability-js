import { TimeOfUseApi } from './time-of-use-api';
import {
  TimeOfUseGroup,
  TimeOfUseInterval,
  isTimeOfUseGroup,
  isTimeOfUseInterval,
} from '../types/time-of-use';
import { SingleResponse, PagedResponse, GenabilityConfig } from '../rest-client';
import { ResourceTypes } from '../types/resource-types';


describe('TimeOfUse api', () => {
  let config;
  let restClient: TimeOfUseApi;

  beforeAll(async () => {
    config = new GenabilityConfig({profileName:'unitTest'});
    if (config.useCredentialsFromFile) {
      const configFromFile = await config.getCredentialsFromFile();
      config = configFromFile || config;;
    }
    restClient = new TimeOfUseApi(config);
  })
  it('should returns a time of use group', async () => {
    const lseId = 210;
    const touGroupId = 2;
    const response: SingleResponse<TimeOfUseGroup> = await restClient.getTimeOfUseGroup(lseId, touGroupId);
    expect(response.result).toBeTruthy();
    expect(response.errors).toBeUndefined();
    if(response.result == null) fail('response.result null');
    expect(response.result.lseId).toEqual(lseId);
    expect(isTimeOfUseGroup(response.result)).toBeTruthy();
  }, 10000)
  it('should returns a list of time of use group intervals', async () => {
    const lseId = 210;
    const touGroupId = 2;
    const response: PagedResponse<TimeOfUseInterval> = await restClient.getTimeOfUseGroupIntervals(lseId, touGroupId);
    expect(response.status).toEqual('success');
    expect(response.type).toEqual(ResourceTypes.TIME_OF_USE_INTERVALS);
    for(const interval of response.results) {
      expect(isTimeOfUseInterval(interval)).toBeTruthy();
    }
  }, 10000)
  it('should return time of use groups', async () => {
    const lseId = 210;
    const response: PagedResponse<TimeOfUseGroup> = await restClient.getTimeOfUseGroups(lseId);
    expect(response.status).toEqual('success');
    expect(response.type).toEqual(ResourceTypes.TIME_OF_USE_GROUP);
    for(const timeOfUseGroup of response.results) {
      expect(isTimeOfUseGroup(timeOfUseGroup)).toBeTruthy();
    }
  }, 10000)
});
