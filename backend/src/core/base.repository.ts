import { db } from "../config/db";

export abstract class BaseRepository<T> {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async findAll(): Promise<T[]> {
    return db(this.tableName).select("*");
  }
}
