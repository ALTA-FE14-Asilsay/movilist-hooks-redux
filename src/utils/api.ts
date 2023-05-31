import axios from 'axios';

const instance = axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
});

export default {
  getAll: (code: string) =>
    instance({
      method: 'GET',
      url: `movie/${code}?api_key=${
        import.meta.env.VITE_IMDB_API
          ? import.meta.env.VITE_IMDB_API
          : process.env.VITE_IMDB_API
      }`,
    }),
  getFavo: (code: string) =>
    instance({
      method: 'GET',
      url: `account/${code}/favorite/movies?api_key=${
        import.meta.env.VITE_IMDB_API
          ? import.meta.env.VITE_IMDB_API
          : process.env.VITE_IMDB_API
      }`,
    }),
};
