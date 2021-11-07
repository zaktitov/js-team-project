
import { refs } from './refs.js';
import modalTemplate from '../templates/modal-template.hbs';
import NewApiService from './apiClass';

const newApiService = new NewApiService();
const {filmCards,  body, backdrop, modal, closeBtn, homeLink } = refs;




homeLink.addEventListener('click', onFilmCardClick);
closeBtn.addEventListener('click', onCloseButtonClick);


function onFilmCardClick(e) {
    newApiService.fetchTrends().then(response => {
        const result = response[4]
     
renderModal(result)
    })

  toggleModal();
}

function renderModal(obj) {
  modal.insertAdjacentHTML('afterbegin', modalTemplate(obj));
}

function onCloseButtonClick(e) {
    toggleModal();
    const poster = document.querySelector('.modal__poster-container')
    const data = document.querySelector('.modal__data-container')

    poster.innerHTML = ''
    data.innerHTML = ''
    
}




function toggleModal() {
  body.classList.toggle('is-open');
  backdrop.classList.toggle('is-hidden');
}
