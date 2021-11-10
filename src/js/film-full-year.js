import { refs } from './refs.js';

export default function getFilmDate() {
  const filmDate = [...refs.filmCards.querySelectorAll('.js-film-release')];

  filmDate.forEach(function (el) {
    const year = new Date(el.textContent).getFullYear();

    isNaN(year) ? (el.style.display = 'none') : (el.textContent = year);
  });
}
