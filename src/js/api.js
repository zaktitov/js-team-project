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

searchForm.addEventListener('input', debounce(findFilmByWord, 1200));
searchForm.addEventListener('keydown', blockEnterReset);

let formSubmitted = false;

export function findFilmByWord() {
  // e.preventDefault();
  newApiService.query = input.value.trim();
  // newApiService.query = e.currentTarget.elements.query.value;
  filmCards.innerHTML = '';
  // searchForm.reset();

  formSubmitted = true;

  if (newApiService.query !== '' && preloadWrap.classList.contains('preload__end')) {
    preload.deleteAddPreload();
    newApiService.resetPage();
    fetchFilms();

    setTimeout(() => {
      if (filmCards.children.length === 0) {
        notifications.showNotFilms();
      } else {
        notifications.showSuccess();
      }
    }, 250);
  } else {
    getFilmsByDefault();
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

    refs.homePageContainer.classList.remove('notice');

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
    if (refs.homePageContainer.classList.contains('notice')) {
      refs.homePageContainer.classList.remove('notice');
    }

    if (refs.paginationContainer.classList.contains('visually-hidden')) {
      refs.paginationContainer.classList.remove('visually-hidden');
    }

    if (formSubmitted) {
      pagination.reset(newApiService.results);
    }
    formSubmitted = false;

    if (filmCards.children.length === 0) {
      // getFilmsByDefault();
      refs.homePageContainer.classList.add('notice');
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

function blockEnterReset(e) {
  if (e.code === 'Enter') {
    e.preventDefault();
  }
}
