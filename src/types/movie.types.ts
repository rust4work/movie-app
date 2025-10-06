export interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date: string;
  vote_average: number;
  overview: string;
  backdrop_path?: string;
  genre_ids?: number[];
  original_language?: string;
  original_title?: string;
  popularity: number;
  video?: boolean;
  vote_count?: number;
  adult?: boolean;
}
