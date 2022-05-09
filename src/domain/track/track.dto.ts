export interface CreateTrackDto {
  event: string;
  tags: string[];
  url: string;
  title: string;
  ts: string;
}

export interface CreateTrackRequestDto {
  tracks: CreateTrackDto[];
}

export interface CreateTrackResponseDto {
  success: boolean; // can extend from some common response interface but lazy
  message?: string;
}
