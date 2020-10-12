import { TimeOfUseApi } from './time-of-use-api';
import {
  TimeOfUse,
  TimeOfUseGroup,
  TimeOfUseInterval,
  isTimeOfUse,
  isTimeOfUseGroup,
  isTimeOfUseInterval,
  isTimeOfUsePeriod
} from '../types/time-of-use';
import { credentialsFromFile } from '../rest-client/credentials';
import { PagedResponse } from '../rest-client';
import { ResourceTypes } from '../types/resource-types';

const credentials = credentialsFromFile('unitTest');
const restClient = new TimeOfUseApi(credentials);

describe("TimeOfUse api", () => {
  it("should returns a time of use", async () => {
    const response: PagedResponse<TimeOfUse> = await restClient.getTimeOfUse(1908);
    expect(response.status).toEqual("success");
    expect(response.type).toEqual(ResourceTypes.TIME_OF_USE);
    expect(response.results[0].touId).toEqual(1908);
    expect(isTimeOfUse(response.results[0])).toBeTruthy();
    for(const touPeriod of response.results[0].touPeriods) {
      expect(isTimeOfUsePeriod(touPeriod)).toBeTruthy();
    }
  })
  it("should returns a time of use group", async () => {
    const { results }: PagedResponse<TimeOfUse> = await restClient.getTimeOfUse(1908);
    const response: TimeOfUseGroup = await restClient.getTimeOfUseGroup(results[0].lseId, results[0].touGroupId);
    expect(response.lseId).toEqual(results[0].lseId);
    expect(isTimeOfUseGroup(response)).toBeTruthy();
  }, 10000)
  it("should returns a list of time of use group intervals", async () => {
    const { results }: PagedResponse<TimeOfUse> = await restClient.getTimeOfUse(1908);
    const response: PagedResponse<TimeOfUseInterval> = await restClient.getTimeOfUseGroupIntervals(results[0].lseId, results[0].touGroupId);
    expect(response.status).toEqual("success");
    expect(response.type).toEqual(ResourceTypes.TIME_OF_USE_INTERVALS);
    for(const interval of response.results) {
      expect(isTimeOfUseInterval(interval)).toBeTruthy();
    }
  }, 10000)
  it("should return time of use groups", async () => {
    const { results }: PagedResponse<TimeOfUse> = await restClient.getTimeOfUse(1908);
    const response: PagedResponse<TimeOfUseGroup> = await restClient.getTimeOfUseGroups(results[0].lseId);
    expect(response.status).toEqual("success");
    expect(response.type).toEqual(ResourceTypes.TIME_OF_USE);
    for(const timeOfUseGroup of response.results) {
      expect(isTimeOfUseGroup(timeOfUseGroup)).toBeTruthy();
    }
  }, 10000)
});