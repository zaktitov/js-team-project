import { refs } from './refs';

refs.homeLink.addEventListener('click', onChangeHomeLink);
refs.libraryLink.addEventListener('click', onChangeLibraryLink);

function onChangeHomeLink(event) {
  event.preventDefault();

  refs.libraryLink.classList.remove('current');
  refs.homeLink.classList.add('current');

  refs.headerInput.classList.remove('visually-hidden');
  refs.headerBtn.classList.add('visually-hidden');

  refs.header.classList.remove('header-library');
  refs.header.classList.add('header-home');
}

function onChangeLibraryLink(event) {
  event.preventDefault();
  refs.headerBtn.classList.remove('visually-hidden');
  refs.headerInput.classList.add('visually-hidden');

  refs.header.classList.remove('header-home');
  refs.header.classList.add('header-library');

  refs.homeLink.classList.remove('current');
  refs.libraryLink.classList.add('current');
}
