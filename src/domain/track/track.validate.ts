import { CreateTrackDto } from './track.dto';

const isNotEmptyString = (value: any): boolean => {
  return !!(value && typeof value === 'string' && value.length);
};

// custom validator for prevent install validate dependency
export const trackValidator = (track: CreateTrackDto): string[] => {
  const errors: string[] = [];

  if (!isNotEmptyString(track.event)) errors.push('You should send event.');
  if (!isNotEmptyString(track.title)) errors.push('You should send title.');
  if (!isNotEmptyString(track.ts)) errors.push('You should send ts.');
  if (!isNotEmptyString(track.url)) errors.push('You should send url.');
  if (!Array.isArray(track.tags)) errors.push('Tags should be array.');

  return errors;
};
