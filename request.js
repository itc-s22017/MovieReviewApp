const BASE_URL = 'https://api.themoviedb.org/3';
import {API_KEY} from '@env'

export const requests = {
    NOW_PLAYING: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ja&page=1`,
}