import { refs } from './refs.js';

export default class FilmGenres {
  constructor() {}

  setFilmGenresList(genre) {
    localStorage.setItem('filmGenresList', JSON.stringify(genre));
  }

  async getFilmGenresList(section, className) {
    const genresList = JSON.parse(localStorage.getItem('filmGenresList'));
    const filmGenres = [...section.querySelectorAll(className)];

    filmGenres.forEach(genre => {
      genresList.forEach(el => {
        if (Number(genre.textContent) === el.id) {
          genre.textContent = el.name;
        }
      });
    });
  }

  cutFilmGenres() {
    const filmGenres = [...refs.filmCards.querySelectorAll('.js-film-genres')];

    filmGenres.forEach(el => {
      const child = [...el.children];
      const length = child.length;

      if (length > 3) {
        child[2].textContent = 'Other';
      }
      if (length === 4) {
        child[2].textContent = 'Other';
        child[3].style.display = 'none';
      }
      if (length === 5) {
        child[2].textContent = 'Other';
        child[3].style.display = 'none';
        child[4].style.display = 'none';
      }
      if (length === 6) {
        child[2].textContent = 'Other';
        child[3].style.display = 'none';
        child[4].style.display = 'none';
        child[5].style.display = 'none';
      }

      child.forEach(el => {
        if (el.textContent === 'Other') {
          el.classList.add('other-hide');
        }
      });
    });
  }
}
