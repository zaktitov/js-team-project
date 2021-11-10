import { refs } from './refs.js';
import NewApiService from './apiClass';

const newApiService = new NewApiService();

export default class FilmGenres {
  constructor() {}

  setFilmGenresList(genre) {
    localStorage.setItem('filmGenresList', JSON.stringify(genre));
  }

  async getFilmGenresList(sectionName, className) {
    const genresList = JSON.parse(localStorage.getItem('filmGenresList'));
    const filmGenresArray = [...sectionName.querySelectorAll(className)];
    filmGenresArray.map(filmGenre => {
      genresList.map(genreObject => {
        if (Number(filmGenre.textContent) === genreObject.id) {
          filmGenre.textContent = genreObject.name;
        }
      });
    });
  }

  async cutFilmGenres() {
    const filmGenreArray = [...refs.filmCards.querySelectorAll('.js-film-genres')];
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
