interface IBus {
  id?: number;
  name?: string;
  registrationNumber?: string;
  places?: string;
}

interface IBusPassword {
  oldPassword?: string;
  password?: string;
}

export class Bus implements IBus {
  constructor(
   public id?: number,
   public name?: string,
   public registrationNumber?: string,
   public places?: string
  ) {}
}

export class BusPassword implements IBusPassword {
  constructor(
    public oldPassword?: string,
    public password?: string
  ) {}
}
