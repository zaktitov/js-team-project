import { refs } from './refs.js';
const { filmCards } = refs;

export default function getFilmDate() {
  const filmDate = [...filmCards.querySelectorAll('.js-film-release')];
  filmDate.forEach(fullDate => {
    const year = new Date(fullDate.textContent).getFullYear();
    isNaN(year) ? (fullDate.textContent = '') : (fullDate.textContent = year);
  });
}
