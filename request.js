const BASE_URL = 'https://api.themoviedb.org/3';
import { API_KEY } from '@env'

export const generateSearchByIdUrl = (id) => {
    return `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
};

export const requests = {
    NOW_PLAYING: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-us&page=1`,
    COMMING_SOON: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-us&page=1`,
    POPULARS: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-us&page=1`,
    TOP_RATED: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-us&page=1`,
    SEARCH: `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ja&page=1&include_adult=false&query=`,
}