const BASE_URL = `https://api.themoviedb.org/3`;
const KEY = `d4b4feb49258af79577d4fcd29006df0`;

export default class NewApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
    this.movieId = '123';
    this.language = 'en-US';
    this.results = null;
    this.searchType = ''; 
  }

  async fetchTrends() {
    const searchParams = new URLSearchParams({
      api_key: KEY,
      language: this.language,
      page: this.page,
    });

    const url = `${BASE_URL}/trending/movie/day?${searchParams}`;

    const response = await fetch(url);
    const data = await response.json();

    this.results = data.total_results;
    this.pages = data.total_pages;
    this.searchType = 'byDefault';

    return data.results;
  }

  async fetchByKeyWord() {
    const searchParams = new URLSearchParams({
      api_key: KEY,
      language: this.language,
      query: this.searchQuery,
      page: this.page,
      include_adult: false,
    });

    const url = `${BASE_URL}/search/movie?${searchParams}`;
    const response = await fetch(url);
    const data = await response.json();

    this.results = data.total_results;
    this.pages = data.total_pages;

    this.searchType = 'byName'

    return data.results;
  }

  async fetchFullInfo() {
    const searchParams = new URLSearchParams({
      api_key: KEY,
      language: this.language,
    });

    const url = `${BASE_URL}/movie/${this.movieId}?${searchParams}`;

    const dataImages = await fetch(url);
    const parseData = await dataImages.json();

    return await parseData.results;
  }

  async fetchGenresList() {
    const searchParams = new URLSearchParams({
      api_key: KEY,
    });

    const url = `${BASE_URL}/genre/movie/list?${searchParams}`;
    const response = await fetch(url);
    const data = await response.json();

    return data.genres;
  }

  incrementPage() {
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
