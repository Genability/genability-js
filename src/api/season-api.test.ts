import { 
  SeasonGroupApi,
  GetSeasonGroupsRequest
} from './season-api';
import {
  SeasonGroup,
  isSeasonGroup,
  isSeason
} from '../types/season';
import { ResourceTypes } from '../types/resource-types'
import { credentialsFromFile } from '../rest-client/credentials';
import { PagedResponse } from '../rest-client';

const credentials = credentialsFromFile('unitTest');
const restClient = new SeasonGroupApi(credentials);

describe("call to queryStringify", () => {
  it("handles no parameters", async () => {
    const request: GetSeasonGroupsRequest = new GetSeasonGroupsRequest();
    const qs: string = request.queryStringify();
    expect(qs).toEqual('');
  })
  it("handles lseId parameter", async () => {
    const request: GetSeasonGroupsRequest = new GetSeasonGroupsRequest();
    request.lseId = 355;
    const qs: string = request.queryStringify();
    expect(qs).toEqual('lseId=355');
  })
});

describe("Season api", () => {
  it("returns a list of season groups", async () => {
    const request: GetSeasonGroupsRequest = new GetSeasonGroupsRequest();
    request.lseId = 734;
    const response: PagedResponse<SeasonGroup> = await restClient.getSeasonGroups(request);
    expect(response.status).toEqual("success");
    expect(response.type).toEqual(ResourceTypes.SEASON_GROUP);
    for(const seasonGroup of response.results) {
      expect(isSeasonGroup(seasonGroup)).toBeTruthy();
      for(const season of seasonGroup.seasons) {
        expect(isSeason(season)).toBeTruthy();
      }
    }
  })
});
