import { readFile, writeFile } from 'node:fs/promises';

export default class UserRepository {
  #filePath;
  constructor() {
    this.#filePath = './src/database/data.json';
  }

  async #getFile() {
    return JSON.parse(await readFile(this.#filePath));
  }

  getAll() {
    return this.#getFile();
  }

  async create(data) {
    const currentFile = await this.#getFile();
    currentFile.push(data);

    await writeFile(
      this.#filePath,
      JSON.stringify(currentFile)
    );

    return data.id;
  }
}