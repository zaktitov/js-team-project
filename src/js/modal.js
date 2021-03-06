import { refs } from './refs.js';
import modalTemplate from '../templates/modal-template.hbs';
import NewApiService from './apiClass';
import addToLocalArray from './library';
import FilmGenres from './film-genres';
import watchTrailer from './trailerFilm';

const newApiService = new NewApiService();
const filmGenres = new FilmGenres();
const { filmCards, body, backdrop, modal, closeBtn, homeLink, main, libraryFilmCards } = refs;

filmCards.addEventListener('click', onFilmCardClick);
libraryFilmCards.addEventListener('click', onFilmCardClick);
closeBtn.addEventListener('click', onCloseButtonClick);

function onFilmCardClick(e) {
  e.preventDefault();

  window.addEventListener('keydown', onEscClick);
  backdrop.addEventListener('click', onBackdropClick);
  const currentIndex = Number(e.target.id);
  const [currentFilmList] = JSON.parse(localStorage.getItem('CurrentPageFilmList'));
  currentFilmList.forEach(e => {
    if (currentIndex === e.id) {
      renderModalWindow(e);
      onPosterBlackout();
    }
  });
}

function renderModalWindow(e) {
  modalMarkup(e);

  const popularity = document.querySelector('.popularity-js');
  const popularityValue = Number(popularity.textContent).toFixed(1);

  popularity.textContent = popularityValue;
  filmGenres.getFilmGenresList(document, '.genre-js');

  addToLocalArray(e);
  toggleModal();

  //trailer
  const trailerBtn = document.querySelector('.js-trailer-btn');
  trailerBtn.addEventListener('click', getFilmTrailer);
}

function modalMarkup(obj) {
  modal.insertAdjacentHTML('afterbegin', modalTemplate(obj));
}

function onCloseButtonClick(e) {
  toggleModal();
  const poster = document.querySelector('.modal__poster-container');
  const data = document.querySelector('.modal__data-container');

  poster.remove();
  data.remove();
  window.removeEventListener('keydown', onEscClick);
  backdrop.removeEventListener('click', onBackdropClick);
}

function onEscClick(e) {
  if (e.code === 'Escape') {
    onCloseButtonClick();
    closeTrailer();
  }
}

function onBackdropClick(e) {
  if (e.target === backdrop) {
    onCloseButtonClick();
  }
}

function toggleModal() {
  body.classList.toggle('is-open');
  backdrop.classList.toggle('is-hidden');
}

function getFilmTrailer(event) {
  const id = event.target.dataset.id;
  const name = event.target.dataset.name;
  new watchTrailer(id, name).showTrailer();
}

function onPosterBlackout() {
  setTimeout(() => {
    document.querySelector('.modal__trailer-wrapper').style.opacity = 1;
  }, 500);
}

function closeTrailer() {
  const trailerLightbox = document.querySelector('.basicLightbox');
  trailerLightbox.remove();
}
