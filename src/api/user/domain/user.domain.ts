export class UserDomain {
  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }

  email: string;
  name: string;
}
