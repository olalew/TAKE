import { Address } from "./address.model";

interface IClient {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  birthDate?: string;
  pesel?: string;
  phoneNumber?: string;
}

interface IClientRequest {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  pesel?: string;
  phoneNumber?: string;
}

export class LocalClient implements IClient {
  constructor(
    public id?: number,
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public fullName?: string,
    public birthDate?: string,
    public pesel?: string,
    public phoneNumber?: string,
    public name? : string
    ) {
      this.name = `${this.firstName} ${this.lastName}`;
    }
}

export class Client implements IClient {
  constructor(
  public id?: number,
  public email?: string,
  public firstName?: string,
  public lastName?: string,
  public fullName?: string,
  public birthDate?: string,
  public pesel?: string,
  public phoneNumber?: string
  ) {}
}

export class ClientRequest implements IClientRequest {
  constructor(
  public id?: number,
  public email?: string,
  public firstName?: string,
  public lastName?: string,
  public birthDate?: string,
  public pesel?: string,
  public phoneNumber?: string,
  ) {}
}
