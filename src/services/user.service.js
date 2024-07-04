
import UserRepository from "../repositories/user.repository.js";

export default class UserService {
  #repository;

  constructor() {
    this.#repository = new UserRepository()
  }

  getAll() {
    return this.#repository.getAll();
  }

  create(data) {
    return this.#repository.create(data);
  }
}