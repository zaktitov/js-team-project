const BASE_URL = `https://api.themoviedb.org/3`;
const KEY = `d4b4feb49258af79577d4fcd29006df0`;

export default class NewApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
    this.movieId = "123";
  }

  fetchTrends() {
    const searchParams = new URLSearchParams({
      api_key: KEY,
      language: 'ru',
    });

    const url = `${BASE_URL}/trending/all/day?${searchParams}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(`It's trends fetch`, data);
        return data;
      });
  }

  fetchByKeyWord() {
    const searchParams = new URLSearchParams({
      api_key: KEY,
      language: `ru`,
      query: this.searchQuery,
      page: this.page,
      include_adult: false,
    });

    const url = `${BASE_URL}/search/movie?${searchParams}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(`It's keyword fetch`, data);
        return data;
      });
  }

  fetchFullInfo() {
    const searchParams = new URLSearchParams({
      api_key: KEY,
      language: `ru`,
    });

    const url = `${BASE_URL}/movie/${this.movieId}?${searchParams}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(`It's full info fetch`, data);
        return data;
      });
  }

  increasePage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get filmId() {
    return this.movieId;
  }

  set filmId(newFilm) {
    this.movieId = newFilm;
  }
}
