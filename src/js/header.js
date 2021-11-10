import { refs } from './refs';
import filmCardsTpl from '../templates/film-template.hbs';
import FilmGenres from './film-genres';
import getFilmFullYear from './film-full-year';
import myCurrentPage from './currentPage';

const filmGenres = new FilmGenres();
console.log(refs.libraryFilmCards)

refs.homeLink.addEventListener('click', onChangeHomeLink);
refs.libraryLink.addEventListener('click', onChangeLibraryLink);

function onChangeHomeLink() {
  refs.libraryLink.classList.remove('current');
  refs.homeLink.classList.add('current');

  refs.headerInput.classList.remove('visually-hidden');
  refs.headerBtn.classList.add('visually-hidden');

  refs.header.classList.remove('header-library');
  refs.header.classList.add('header-home');
}

function onChangeLibraryLink(event) {
  event.preventDefault();
  refs.headerBtn.classList.remove('visually-hidden');
  refs.headerInput.classList.add('visually-hidden');

  refs.header.classList.remove('header-home');
  refs.header.classList.add('header-library');

  refs.homeLink.classList.remove('current');
  refs.libraryLink.classList.add('current');

  console.log(refs.homePageContainer)
  refs.homePageContainer.classList.add('visually-hidden');
  refs.libraryPageContainer.classList.remove('visually-hidden');
  const films = getMoviesFromStorage('queueList');
  appendFilmCardsMarkup(films);
}



function appendFilmCardsMarkup(films) {
  refs.libraryFilmCards.innerHTML = filmCardsTpl(films);
  filmGenres.getFilmGenres();
  filmGenres.cutFilmGenres();
  getFilmFullYear();
  myCurrentPage(films);
  // console.log(JSON.parse(localStorage.getItem('CurrentPageFilmList')))
}

function getMoviesFromStorage(list) {
  return JSON.parse(localStorage.getItem(list))
}

console.log(getMoviesFromStorage('queueList'))