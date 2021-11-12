import { refs } from './refs.js';

export default function getFilmDate(section, className) {
  const filmDate = [...section.querySelectorAll(className)];

  filmDate.forEach(function (el) {
    const year = new Date(el.textContent).getFullYear();

    isNaN(year) ? (el.style.display = 'none') : (el.textContent = year);
  });
}
