import filmCardsTpl from '../templates/film-template.hbs';
import NewApiService from './apiClass';
// import { debounce, throttle } from 'lodash';
import { refs } from './refs.js';
import Notifications from './pNotify';
import getFilmFullYear from './film-full-year';
import FilmGenres from './film-genres';
import { pagination } from './pagination';

import myCurrentPage from './currentPage';
import Preload from './preload';

const { input, filmCards, searchForm } = refs;
const filmsElements = filmCards.children;

export const newApiService = new NewApiService();
const notifications = new Notifications();
export const filmGenres = new FilmGenres();
const preload = new Preload();

searchForm.addEventListener('submit', findFilmByWord);

let formSubmitted = false;

function findFilmByWord(e) {
  e.preventDefault();

  newApiService.query = e.currentTarget.elements.query.value;
  filmCards.innerHTML = '';
  searchForm.reset();

  formSubmitted = true;

  if (newApiService.query !== '' && refs.preloadWrap.classList.contains('preload__end')) {
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

    if (filmsElements.length === 0) {
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
    

    if (formSubmitted) {
      pagination.reset(newApiService.results);
    }
    formSubmitted = false;

    if (filmsElements.length === 0) {
      error => console.log(error);
      pagination.reset(0);
    }
  } catch {
    error => console.log(error);
  }
}

function appendFilmCardsMarkup(films) {
  refs.filmCards.innerHTML = filmCardsTpl(films);
  filmGenres.getFilmGenresList(refs.filmCards, '.js-film-genre');
  myCurrentPage(films);
  filmGenres.cutFilmGenres(refs.filmCards);
  getFilmFullYear(refs.filmCards, '.js-film-release');
}

