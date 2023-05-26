import axios from 'axios';

const instance = axios.create({
  baseURL: `https://api.themoviedb.org/3/movie/`,
});

export default {
  getAll: (code: string) =>
    instance({
      method: 'GET',
      url: `${code}?api_key=${import.meta.env.VITE_IMDB_API}`,
    }),
};
