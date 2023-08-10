export interface Customer {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
  title: string;
  salutation: string;
  dateOfBirth: string;
  defaultBillingAddressId: string;
  defaultShippingAddressID: string;
  shippingAddressIds: string[];
}

export interface GetAccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface GetUSerTokens extends GetAccessTokenResponse {
  refresh_token: string;
}

export interface SignInResult {
  customer: Customer;
}

export interface LocalStorageAuthData {
  customerId: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExp: number;
  refreshTokenExp: number;
}
