import filmCardsTpl from '../templates/film-template.hbs';
import NewApiService from './apiClass';
import { debounce, find } from 'lodash';
import { refs } from './refs.js';
import Notifications from './pNotify';

const { input, filmCards, loadMore } = refs;
const newApiService = new NewApiService();
const filmsElements = filmCards.children;
const notifications = new Notifications();

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
input.addEventListener('input', debounce(findFilmByWord, 1200));

function findFilmByWord(e) {
  newApiService.query = e.target.value.trim();
  filmCards.innerHTML = '';

  if (newApiService.query !== '') {
    newApiService.resetPage();
    fetchFilms();
    notifications.showSuccess();
    // observer.observe(loadMore);
  } else {
    getFilmsByDefault();
    // error => console.log(error);
    // observer.unobserve(loadMore);
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

async function getFilmsByDefault() {
  try {
    appendFilmCardsMarkup(await newApiService.fetchTrends());
    if (newApiService.query === '') {
      notifications.showTrends()
    } else {
      notifications.showSuccess()
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

    if (filmsElements.length === 0) {
      error => console.log(error);
    }
  } catch {
    error => console.log(error);
  }
}

function appendFilmCardsMarkup(films) {
  filmCards.innerHTML = filmCardsTpl(films);
}

/* ----- PAGINATION ------ */

const options = {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
  template: {
    currentPage:
      '<strong class="tui-page-btn tui-is-selected" style="background-color: #ff6b01; border-radius: 5px;">{{page}}</strong>',
  },
};

const pagination = new Pagination('pagination', options);

pagination.on('afterMove', function (eventData) {
  newApiService.page = eventData.page;
  getFilmsByDefault();
  filmCards.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});

// // IntersObserv
// function onEntry(entries) {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       // fetchFilms();
//     }
//   });
// }

// const options = {
//   rootMargin: '300px',
// };

// const observer = new IntersectionObserver(onEntry, options);