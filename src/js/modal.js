import { refs } from './refs.js';
import modalTemplate from '../templates/modal-template.hbs';
import NewApiService from './apiClass';
import addToLocalArray from './library';
import FilmGenres from './film-genres';
const newApiService = new NewApiService();
const filmGenres = new FilmGenres();
const { filmCards, body, backdrop, modal, closeBtn, homeLink, main } = refs;

window.addEventListener('click', onFilmCardClick);
closeBtn.addEventListener('click', onCloseButtonClick);
function onFilmCardClick(e) {
  const currentIndex = Number(e.target.id);
  const [currentFilmList] = JSON.parse(localStorage.getItem('CurrentPageFilmList'));
  currentFilmList.forEach(e => {
    if (currentIndex === e.id) {
      renderModalWindow(e);
    }
  });

  //   if (e.target.nodeName === 'IMG') {
  //      renderModalWindow()
  //    }
}

function renderModalWindow(e) {
  //   e.preventDefault();

  //  newApiService.fetchTrends().then(response => {
  const result = e;

  modalMarkup(result);
  const popularity = document.querySelector('.popularity-js');
  const closeButton = document.querySelector('.modal-close.js');
  popularity.textContent = Math.round(popularity.textContent);
  filmGenres.getFilmGenresList(document, '.genre-js');

  addToLocalArray(result);
  toggleModal();
}

function modalMarkup(obj) {
  modal.insertAdjacentHTML('afterbegin', modalTemplate(obj));
}

function onCloseButtonClick(e) {
  toggleModal();

  // modal.innerHTML = '';
  const poster = document.querySelector('.modal__poster-container');
  const data = document.querySelector('.modal__data-container');

  poster.innerHTML = '';
  data.innerHTML = '';
}

function toggleModal() {
  body.classList.toggle('is-open');
  backdrop.classList.toggle('is-hidden');
}
