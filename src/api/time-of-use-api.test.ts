import { TimeOfUseApi } from './time-of-use-api';
import {
  TimeOfUseGroup,
  TimeOfUseInterval,
  isTimeOfUseGroup,
  isTimeOfUseInterval,
} from '../types/time-of-use';
import { credentialsFromFile } from '../rest-client/credentials';
import { PagedResponse } from '../rest-client';
import { ResourceTypes } from '../types/resource-types';

const credentials = credentialsFromFile('unitTest');
const restClient = new TimeOfUseApi(credentials);

describe("TimeOfUse api", () => {
  it("should returns a time of use group", async () => {
    const lseId = 210;
    const touGroupId = 2;
    const response: TimeOfUseGroup = await restClient.getTimeOfUseGroup(lseId, touGroupId);
    expect(response.lseId).toEqual(lseId);
    expect(isTimeOfUseGroup(response)).toBeTruthy();
  }, 10000)
  it("should returns a list of time of use group intervals", async () => {
    const lseId = 210;
    const touGroupId = 2;
    const response: PagedResponse<TimeOfUseInterval> = await restClient.getTimeOfUseGroupIntervals(lseId, touGroupId);
    expect(response.status).toEqual("success");
    expect(response.type).toEqual(ResourceTypes.TIME_OF_USE_INTERVALS);
    for(const interval of response.results) {
      expect(isTimeOfUseInterval(interval)).toBeTruthy();
    }
  }, 10000)
  it("should return time of use groups", async () => {
    const lseId = 210;
    const response: PagedResponse<TimeOfUseGroup> = await restClient.getTimeOfUseGroups(lseId);
    expect(response.status).toEqual("success");
    expect(response.type).toEqual(ResourceTypes.TIME_OF_USE_GROUP);
    for(const timeOfUseGroup of response.results) {
      expect(isTimeOfUseGroup(timeOfUseGroup)).toBeTruthy();
    }
  }, 10000)
});
