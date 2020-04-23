
export interface ApiCredentials {
  appId: string;
  appKey: string;
}

export interface ApiResponse {
  status: string;
  type: string;
  count: number;
  pageCount?: number;
  pageStart?: number;
  requestId?: string;
  results: unknown;
}

export class RestClient {
  auth: string;
  constructor(credentials: ApiCredentials) {
    this.auth = Buffer.from(`${credentials.appId}:${credentials.appKey}`).toString('base64');
  }

  sendGet(url: string): string {
    return `sent-get to ${url}`;
  };

}
