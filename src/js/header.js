import { refs } from './refs';
import moviesFromStorage from './get-movies-from-storage';
import { getFilmsByDefault, pagination, newApiService } from './api';
import appendFilmCardsMarkup from './append-films-cards';

const { getMoviesFromQueueStorage, getMoviesFromWatchedStorage } = moviesFromStorage;

refs.homeLink.addEventListener('click', onChangeHomeLink);
refs.libraryLink.addEventListener('click', onChangeLibraryLink);
refs.logoLink.addEventListener('click', onChangeHomeLink);
refs.headerWatchedBtn.addEventListener('click', onHeaderWatchedBtnClick);
refs.headerQueueBtn.addEventListener('click', onHeaderQueueBtnClick);

function onChangeHomeLink(e) {
  e.preventDefault();
  refs.libraryLink.classList.remove('current');
  refs.homeLink.classList.add('current');

  refs.headerInput.classList.remove('visually-hidden');
  refs.headerBtn.classList.add('visually-hidden');

  refs.header.classList.remove('header-library');
  refs.header.classList.add('header-home');

  newApiService.resetPage();
  getFilmsByDefault();
  pagination.reset();

  refs.homePageContainer.classList.remove('visually-hidden');
  refs.libraryPageContainer.classList.add('visually-hidden');
}

function onChangeLibraryLink(event) {
  event.preventDefault();
  refs.headerBtn.classList.remove('visually-hidden');
  refs.headerInput.classList.add('visually-hidden');

  refs.header.classList.remove('header-home');
  refs.header.classList.add('header-library');

  refs.homeLink.classList.remove('current');
  refs.libraryLink.classList.add('current');

  // console.log(refs.homePageContainer);
  refs.homePageContainer.classList.add('visually-hidden');
  refs.libraryPageContainer.classList.remove('visually-hidden');
  refs.headerWatchedBtn.classList.remove('current');
  refs.headerQueueBtn.classList.add('current');
  const films = getMoviesFromQueueStorage();
  appendFilmCardsMarkup(refs.libraryFilmCards, films);
}

function onHeaderWatchedBtnClick() {
  refs.headerWatchedBtn.classList.add('current');
  refs.headerQueueBtn.classList.remove('current');
  const films = getMoviesFromWatchedStorage();
  appendFilmCardsMarkup(refs.libraryFilmCards, films);
}

function onHeaderQueueBtnClick() {
  refs.headerQueueBtn.classList.add('current');
  refs.headerWatchedBtn.classList.remove('current');
  const films = getMoviesFromQueueStorage();
  appendFilmCardsMarkup(refs.libraryFilmCards, films);
}
