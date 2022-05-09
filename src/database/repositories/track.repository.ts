import { Model } from 'mongoose';
import { ITrack } from '../models/Track';
import { BaseRepository } from './base.repository';

export class TrackRepository extends BaseRepository<ITrack> {
  constructor(private readonly model: Model<ITrack>) {
    super();
  }

  public async insert(tracks: ITrack | ITrack[]): Promise<ITrack[]> {
    return this.model.insertMany(tracks);
  }
}
