import { Model } from 'mongoose';

export abstract class BaseRepository<T> {
  public abstract insert(value: T | T[]): Promise<T[]>;
}
