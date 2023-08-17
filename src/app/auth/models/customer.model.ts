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
