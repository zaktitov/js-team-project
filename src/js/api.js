import filmCardsTpl from '../templates/film-template.hbs';
import NewApiService from './apiClass';
import { debounce } from 'lodash';
import { refs } from './refs.js';
import Notifications from './pNotify';
import getFilmFullYear from './film-full-year';
import FilmGenres from './film-genres';
import { pagination } from './pagination';
import myCurrentPage from './currentPage';
import Preload from './preload';

const { input, filmCards, searchForm, preloadWrap } = refs;

export const newApiService = new NewApiService();
const notifications = new Notifications();
export const filmGenres = new FilmGenres();
const preload = new Preload();

searchForm.addEventListener('input', debounce(findFilmByWord, 500));

let formSubmitted = false;

export function findFilmByWord() {
  newApiService.query = input.value.trim();
  filmCards.innerHTML = '';

  formSubmitted = true;

  if (newApiService.query !== '' && preloadWrap.classList.contains('preload__end')) {
    preload.deleteAddPreload();
    newApiService.resetPage();
    fetchFilms();
    setTimeout(() => {
      notifications.showSuccess();
    }, 500);
  } else {
    getFilmsByDefault();
    setTimeout(() => {
      notifications.showSuccess();
    }, 500);
  }
}

export async function getFilmsByDefault() {
  try {
    preload.preloadAnimation();
    filmGenres.setFilmGenresList(await newApiService.fetchGenresList());
    appendFilmCardsMarkup(await newApiService.fetchTrends());
    pagination.setTotalItems(newApiService.results);
    newApiService.resetPage();
    if (newApiService.query === '') {
      setTimeout(() => {
        notifications.showTrends();
      }, 500);
    } else {
      setTimeout(() => {
        notifications.showSuccess();
      }, 500);
    }

    if (filmCards.children.length === 0) {
      error => console.log(error);
    }
  } catch {
    error => console.log(error);
  }
}
getFilmsByDefault();

export async function fetchFilms() {
  try {
    appendFilmCardsMarkup(await newApiService.fetchByKeyWord());

    preload.deleteAddPreload();

    if (refs.paginationContainer.classList.contains('visually-hidden')) {
      refs.paginationContainer.classList.remove('visually-hidden');
    }

    if (formSubmitted) {
      pagination.reset(newApiService.results);
    }
    formSubmitted = false;

    if (filmCards.children.length === 0) {
      error => console.log(error);
      refs.paginationContainer.classList.add('visually-hidden');
      pagination.reset(0);
    }
  } catch {
    error => console.log(error);
  }
}

function appendFilmCardsMarkup(films) {
  filmCards.innerHTML = filmCardsTpl(films);
  filmGenres.getFilmGenresList(filmCards, '.js-film-genre');
  myCurrentPage(films);
  filmGenres.cutFilmGenres(filmCards);
  getFilmFullYear(filmCards, '.js-film-release');
}
