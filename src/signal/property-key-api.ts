import {
  RestApiClient,
  RestApiCredentials,
  PagedResponse
} from '../rest-client';
import {
  GenPropertyKey
} from '../types/property-key';


export class PropertyKeyApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    super('https://api.genability.com', credentials);
  }

  public async getPropertyKeys(): Promise<PagedResponse<GenPropertyKey>> {
    const response = await this.axiosInstance.get(`/rest/public/properties`);
    return new PagedResponse(response.data);
  } 

  public async getPropertyKey(keyName: string): Promise<GenPropertyKey> {
    const response = await this.axiosInstance.get(`/rest/public/properties/${keyName}`);
    return response.data.results[0];
  } 
}

