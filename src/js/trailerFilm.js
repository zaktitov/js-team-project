import movieTrailer from 'movie-trailer';
const basicLightbox = require('basiclightbox');
import { KEY } from './apiClass';
import Notifications from './pNotify';
const notifications = new Notifications();

export default class watchTrailer {
  constructor(trailerId, trailerTitle) {
    this.trailerId = trailerId;
    this.trailerTitle = trailerTitle;
  }

  async fetchTrailer() {
    const queryId = await movieTrailer(this.trailerTitle, {
      id: true,
      api_key: KEY,
      trailerId: this.trailerId,
    });

    if (queryId !== null) {
      return queryId;
    }
  }

  embedPlayer(queryId) {
    if (queryId !== undefined) {
      return `<iframe class="modal__trailer-video" type="text/html" width="640" height="360" src="https://www.youtube.com/embed/${queryId}?autoplay=1" frameborder="0" allow="autoplay; fullscreen"></iframe>`;
    } else {
      // notifications.showNotFound();
      const trailerBtn = document.querySelector('.js-trailer-btn');
      trailerBtn.textContent = 'Sorry, trailer not found';
    }
  }

  createModalForTrailerMarkup(markup) {
    return basicLightbox.create(markup).show();
  }

  showTrailer() {
    this.fetchTrailer().then(this.embedPlayer).then(this.createModalForTrailerMarkup);
  }

  // closeBtn() {
  // const trailerContainer = document.querySelector('.basicLightbox--iframe');
  // trailerContainer.insertAdjacentHTML(
  //   'beforeend',
  //   `<button type="button" class="trailer-video__btn js-trailer-close-btn"></button>`,
  // );

  // const closeBtnTrailer = document.querySelector('.js-trailer-close-btn');
  // closeBtnTrailer.addEventListener('click', e => {
  //   const trailerLightbox = document.querySelector('.basicLightbox');
  //   trailerLightbox.remove();
  // });
  // }
}
