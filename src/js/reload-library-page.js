import { refs } from './refs';
import appendFilmCardsMarkup from './append-films-cards';
import moviesFromStorage from './get-movies-from-storage';

const { getMoviesFromQueueStorage, getMoviesFromWatchedStorage } = moviesFromStorage;


export default function () {
  if (refs.libraryPageContainer.classList.contains('visually-hidden')) {
    return
  }
  if (refs.headerQueueBtn.classList.contains('current')) {
    const films = getMoviesFromQueueStorage();
    appendFilmCardsMarkup(refs.libraryFilmCards, films);
    return
  }
  const films = getMoviesFromWatchedStorage();
  appendFilmCardsMarkup(refs.libraryFilmCards, films);
}