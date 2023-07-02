interface IEmployeeRole {
  roleId?: number;
  roleName?: string;
}

export class EmployeeRole implements IEmployeeRole {
  constructor(
    public roleId?: number,
    public roleName?: string
  ) {}
}
