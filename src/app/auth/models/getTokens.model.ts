export interface GetAccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface GetUSerTokens extends GetAccessTokenResponse {
  refresh_token: string;
}
