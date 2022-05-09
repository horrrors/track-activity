import { CreateTrackRequestDto, CreateTrackResponseDto } from './track.dto';
import { trackService } from './track.service';
import { Request, Response } from 'express';
import { logger } from '@src/utils/logger';
import { trackValidator } from './track.validate';
import { ITrack, Track } from '@src/database/models/Track';

export const trackController = {
  POST: async (req: Request<{}, {}, CreateTrackRequestDto>, res: Response) => {
    const { tracks } = req.body;

    logger.log('POST /track request body - ', req.body);

    if (!tracks) return res.status(400).json({ success: false, message: 'Bad request' } as CreateTrackResponseDto);

    const tracksToBeInserted: ITrack[] = [];
    for (const track of tracks) {
      // same behavior with class-validator
      const errors = trackValidator(track);
      if (errors.length) {
        logger.error(`ERROR. Subject - track: ${track}. Errors - ${errors.join('\n')}`);
        continue;
      }
      tracksToBeInserted.push(new Track({ event: track.event, tags: track.tags, title: track.title, url: track.url, ts: new Date(track.ts) }));
    }

    await trackService.create(tracksToBeInserted);

    const response: CreateTrackResponseDto = { success: true };
    logger.log('POST /track outcome response - ', response);

    return res.status(200).json(response);
  }
};
