import filmCardsTpl from '../templates/film-template.hbs';
import NewApiService from './apiClass';
import { debounce, find } from 'lodash';
import { refs } from './refs.js';
import Notifications from './pNotify';

const { input, filmCards, loadMore } = refs;
const newApiService = new NewApiService();
const filmsElements = filmCards.children;
const notifications = new Notifications();

input.addEventListener('input', debounce(findFilmByWord, 250));

function findFilmByWord(e) {
  newApiService.query = e.target.value.trim();
  filmCards.innerHTML = '';

  if (newApiService.query !== '') {
    newApiService.resetPage();
    observer.observe(loadMore);
  } else {
    error => console.log(error);
    observer.unobserve(loadMore);
  }
}

function findFilmById(e) {
  newApiService.filmId = e.target.value;

  if (newApiService.filmId !== '') {
    newApiService.fetchFullInfo().catch(error => {
      console.log(error);
    });
  }
}

function getFilmsByDefault() {
  newApiService.query = input.value;
  if (newApiService.query === '') {
    newApiService.fetchTrends().catch(error => {
      console.log(error);
    });
  }
}
getFilmsByDefault();

async function fetchFilms() {
  try {
    appendFilmCardsMarkup(await newApiService.fetchByKeyWord());
    if (filmsElements.length === 0) {
      error => console.log(error);
    }
  } catch {
    error => console.log(error);
  }
}

function appendFilmCardsMarkup(films) {
  filmCards.insertAdjacentHTML('beforeend', filmCardsTpl(films));
}

// Lazy Loader
function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      fetchFilms();
    }
  });
}

const options = {
  rootMargin: '300px',
};

const observer = new IntersectionObserver(onEntry, options);
