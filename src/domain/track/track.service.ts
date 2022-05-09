import { ITrack, Track } from '@src/database/models/Track';
import { TrackRepository } from '@src/database/repositories/track.repository';

class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  public async create(tracks: ITrack[]) {
    return tracks.length && this.trackRepository.insert(tracks);
  }
}

export const trackService = new TrackService(new TrackRepository(Track));
