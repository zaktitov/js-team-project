import { refs } from './refs.js';
import modalTemplate from '../templates/modal-template.hbs';
import NewApiService from './apiClass';
import addToLocalArray from './library'

const newApiService = new NewApiService();

const { filmCards, body, backdrop, modal, closeBtn, homeLink, main } = refs;

window.addEventListener('click', onFilmCardClick)
closeBtn.addEventListener('click', onCloseButtonClick);

  function onFilmCardClick(e) {
      const currentIndex = Number(e.target.id)
      const [currentFilmList] = JSON.parse(localStorage.getItem('CurrentPageFilmList'))
      currentFilmList.forEach (e => {
          if (currentIndex === e.id) {
                renderModalWindow(e)
          }
      })
        
     
      
     
    //   if (e.target.nodeName === 'IMG') {
    //      renderModalWindow()
    //    }
    }

function renderModalWindow(e) {
        //   e.preventDefault();

    //  newApiService.fetchTrends().then(response => {
         const result = e
    
        modalMarkup(result);
        const popularity = document.querySelector('.popularity-js')
        const closeButton = document.querySelector('.modal-close.js')
        popularity.textContent = Math.round(popularity.textContent)
 getGenres()
        // const filmGenre = document.querySelectorAll('.genre-js');
        // console.log(filmGenre)

    addToLocalArray(result)
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


async function getGenres() {
    const genresList =  await newApiService.fetchGenresList();

    //Заміняє ID на жанр
    const filmGenre = document.querySelectorAll('.genre-js');
  
    const filmGenresArray = [...filmGenre];
    // console.log(filmGenresArray)
    filmGenresArray.map(filmGenre => {
        genresList.map(genreObject => {
            if (Number(filmGenre.textContent) === genreObject.id) {
                filmGenre.textContent = genreObject.name;
            }
        });
    });
}


// export default function bindModalToFilmsCard() {
//   const filmsCardLinks = [...filmCards.querySelectorAll('.js-film-link')];
//   filmsCardLinks.map(filmLink => filmLink.addEventListener('click', onFilmCardClick));
// }
