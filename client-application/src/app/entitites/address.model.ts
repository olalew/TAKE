interface IAddress {
  addressId?: number;
  city?: string;
  country?: string;
  flatNumber?: string;
  postCode?: string;
  street?: string;
  streetNumber?: string;
}

export class Address implements IAddress {
  constructor(
  public addressId?: number,
  public city?: string,
  public country?: string,
  public flatNumber?: string,
  public postCode?: string,
  public street?: string,
  public streetNumber?: string
  ) {}
}
