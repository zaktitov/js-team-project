
import { refs } from './refs.js';
import modalTemplate from '../templates/modal-template.hbs';
import NewApiService from './apiClass';
import addToLocalArray from './library';
import FilmGenres from './film-genres';
const newApiService = new NewApiService();
const filmGenres = new FilmGenres();
const { filmCards, body, backdrop, modal, closeBtn, homeLink, main } = refs;

main.addEventListener('click', onFilmCardClick);
closeBtn.addEventListener('click', onCloseButtonClick);

function onFilmCardClick(e) {
  // e.preventDefault();

  //         window.addEventListener('keydown', onEscClick);
  // backdrop.addEventListener('click', onCloseButtonClick);
  const currentIndex = Number(e.target.id);
  const [currentFilmList] = JSON.parse(localStorage.getItem('CurrentPageFilmList'));
  currentFilmList.forEach(e => {
    if (currentIndex === e.id) {
      renderModalWindow(e);
    }
  });

}

function renderModalWindow(e) {
  const result = e;


    
  modalMarkup(result);
  
  const popularity = document.querySelector('.popularity-js');
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
  window.removeEventListener('keydown', onEscClick);
  backdrop.removeEventListener('click', onCloseButtonClick);
  const poster = document.querySelector('.modal__poster-container');
  const data = document.querySelector('.modal__data-container');
  poster.remove();
  data.remove();
}

function onEscClick(e) {
  if (e.code === 'Escape') {
    onCloseButtonClick();
  }
}

function toggleModal() {
  body.classList.toggle('is-open');
  backdrop.classList.toggle('is-hidden');
}

