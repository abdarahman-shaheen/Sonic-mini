export class User {
  constructor(
    public id: number,
    public userName: string,
    public email: string,
    public password: string,
    public role: string,
    public token?: string
  ) {}
}
