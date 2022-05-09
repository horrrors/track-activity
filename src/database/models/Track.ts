import database from '../db';

export interface ITrack {
  event: string;
  tags: string[];
  url: string;
  title: string;
  ts: Date;
}

const trackSchema = new database.Schema<ITrack>({
  event: { type: String, required: true },
  tags: { type: [String], required: true },
  url: { type: String, required: true },
  title: { type: String, required: true },
  ts: { type: Date, required: true }
});

export const Track = database.model('Track', trackSchema);
