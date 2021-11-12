import movieTrailer from 'movie-trailer';
const basicLightbox = require('basiclightbox');
import { KEY } from './apiClass';

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
    return queryId;
  }

  embedPlayer(queryId) {
    return `<iframe class="modal__trailer-video" type="text/html" width="640" height="360" src="https://www.youtube.com/embed/${queryId}?autoplay=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  }

  createModalForTrailerMarkup(markup) {
    return basicLightbox.create(markup).show();
  }

  showTrailer() {
    this.fetchTrailer().then(this.embedPlayer).then(this.createModalForTrailerMarkup);
  }
}
