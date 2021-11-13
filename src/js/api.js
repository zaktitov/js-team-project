import filmCardsTpl from '../templates/film-template.hbs';
import NewApiService from './apiClass';
// import { debounce, throttle } from 'lodash';
import { refs } from './refs.js';
import Notifications from './pNotify';
import getFilmFullYear from './film-full-year';
import FilmGenres from './film-genres';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
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
    notifications.showSuccess();
  } else {
    getFilmsByDefault();
    notifications.showNotice();
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
      notifications.showTrends();
    } else {
      notifications.showSuccess();
    }

    if (filmsElements.length === 0) {
      error => console.log(error);
    }
  } catch {
    error => console.log(error);
  }
}
getFilmsByDefault();

async function fetchFilms() {
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

/* ----- PAGINATION ------ */

const options = {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
  template: {
    page: '<a href="#" class="tui-page-btn" style="color:#ff6b01;  border:1px solid transparent; border-radius:5px; width:40px; height:40px; display:inline-flex; align-items:center; justify-content:center;">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected" style="background-color: #ff6b01; border:1px solid transparent;border-radius: 5px; font-size: 12px; width:40px; height:40px; display:inline-flex; align-items:center; justify-content:center;">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}"style="background-color:#F7F7F7; border-radius:5px; border:none;width:40px; height:40px; display:inline-flex; align-items:center; justify-content:center;">' +
      '<span class="tui-ico-{{type}}" style="background-color:#F7F7F7; border:none">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}" style="background-color:#F7F7F7; border-radius:5px; width:40px; height:40px;display:inline-flex; align-items:center; justify-content:center;">' +
      '<span class="tui-ico-{{type}}" style= border:none">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}" style="border-radius:5px;color:black;width:40px; height:40px; display:none;">' +
      '<span class="tui-ico-ellip" style="border:none;">...</span>' +
      '</a>',
  },
};

export const pagination = new Pagination('pagination', options);

pagination.on('afterMove', function (eventData) {
  newApiService.page = eventData.page;
  if (newApiService.searchType === 'byName') {
    fetchFilms();
  } else {
    getFilmsByDefault();
  }
  filmCards.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});
