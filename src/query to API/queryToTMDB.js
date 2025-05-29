import axios from "axios";
const api_read_access_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzUxNzU1YTU3MjI3NjMyMGRhNWU4MjlmMzU4MmFiMSIsIm5iZiI6MTc0ODI3MTM3Ny42MzkwMDAyLCJzdWIiOiI2ODM0ODExMTIxYTQ4NWZiNmIwMzc2NjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.gcVsjNsigbDqBYfWLtiehj19R3DI_vUncvnm2QzTMD8";

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