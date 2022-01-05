const API_KEY = '0b90be182e3dbde2b4df3375af7f8e24';
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}
export function fetchPopularFilm() {
  return fetchWithErrorHandling(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=1&language=en`,
  );
}

export function fetchFilm(query, page) {
  console.log(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}&language=en-US&include_adult=false`,
  );
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}&language=en-US&include_adult=false`,
  );
}

export function fetchDetailsFilm(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&page=1&language=en`,
  );
}

export function fetchCastFilm(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchReviewsFilm(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
  );
}
