export interface GetMovieType {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: Array<number>;
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export interface GetGenresType {
  name?: string;
  id?: number;
}

export interface GetDetailType {
  id?: number;
  title?: string;
  runtime?: string;
  genres?: Array<GetGenresType>;
  original_language?: string;
  poster_path?: string;
  status?: string;
  overview?: string;
  datasSimilar?: Array<GetMovieType>;
}
