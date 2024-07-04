import { randomUUID } from "node:crypto"

export default class User {
  constructor(name, email, phone) {
    this.guid = randomUUID();
    this.name = name;
    this.email = email;
    this;phone = phone;
  }
}