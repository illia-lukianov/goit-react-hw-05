import axios from "axios";
const api_read_access_token = import.meta.env.VITE_SECRET_TOKEN;

const config = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        Authorization: `Bearer ${api_read_access_token}`,
        Accept: 'application/json',
    },
    params: {
        language: "en-US",
    }
});

export function queryTrandingMovies() {
    const responce = config.get('trending/movie/day');

    return responce;
}

export function querySearchMovie(query) {
    const responce = config.get(`search/movie`, {
        params: {
          query: query,
          include_adult: false,
          page: 1,
        },
    });
    
    return responce;
}

export function queryDetailsWithId(id) {
    const responce = config.get(`movie/${id}`);

    return responce;
}

export function queryCastWithId(id) {
    const responce = config.get(`movie/${id}/credits`);

    return responce;
}

export function queryReviewsWithId(id) {
    const responce = config.get(`movie/${id}/reviews`);

    return responce;
}