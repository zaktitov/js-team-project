import { toNumber } from 'lodash';
import NewApiService from './apiClass';
import { refs } from './refs.js';
const { filmCards } = refs;
const newApiService = new NewApiService();

export default class FilmGenres {
  constructor() {}

  async getFilmGenres() {
    const genresList = await newApiService.fetchGenresList();
    const filmGenre = filmCards.querySelectorAll('.js-film-genre');
    const filmGenresArray = [...filmGenre];
    filmGenresArray.map(filmGenre => {
      genresList.map(genreObject => {
        if (toNumber(filmGenre.textContent) === genreObject.id) {
          filmGenre.textContent = genreObject.name;
        }
      });
    });
  }

  async cutFilmGenres() {
    const filmGenres = filmCards.querySelectorAll('.js-film-genres');
    const filmGenreArray = [...filmGenres];
    filmGenreArray.map(genreArr => {
      if (genreArr.children.length > 3) {
        genreArr.children[2].textContent = 'Other';
      }
      if (genreArr.children.length === 4) {
        genreArr.children[2].textContent = 'Other';
        genreArr.children[3].textContent = '';
      }
      if (genreArr.children.length === 5) {
        genreArr.children[2].textContent = 'Other';
        genreArr.children[3].textContent = '';
        genreArr.children[4].textContent = '';
      }
      if (genreArr.children.length === 6) {
        genreArr.children[2].textContent = 'Other';
        genreArr.children[3].textContent = '';
        genreArr.children[4].textContent = '';
        genreArr.children[5].textContent = '';
      }
    });
  }
}
