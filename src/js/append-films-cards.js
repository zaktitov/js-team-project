// import moviesFromStorage from './get-movies-from-storage';
import filmCardsTpl from '../templates/film-template.hbs';
import FilmGenres from './film-genres';
import getFilmFullYear from './film-full-year';
import myCurrentPage from './currentPage';
import { pagination } from './pagination';

const filmGenres = new FilmGenres();

export default async function (container, films) {
  container.innerHTML = filmCardsTpl(films);
  filmGenres.getFilmGenresList(container, '.js-film-genre');
  myCurrentPage(films);
  filmGenres.cutFilmGenres(container);
  getFilmFullYear(container, '.js-film-release');
}
