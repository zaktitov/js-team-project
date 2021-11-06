import NewApiService from './apiClass';
import { debounce, find } from 'lodash';
import { refs } from './refs.js';
const { input } = refs;
const newApiService = new NewApiService();

input.addEventListener('input', debounce(findFilmByWord, 500));

function findFilmByWord(e) {
  newApiService.query = e.target.value;
  console.log(newApiService.query);

  if (newApiService.query !== '') {
    newApiService.fetchByKeyWord().catch(error => {
      console.log(error);
    });
  }
}

function findFilmById(e) {
  newApiService.filmId = e.target.value;

  if (newApiService.filmId !== '') {
    newApiService.fetchFullInfo().catch(error => {
      console.log(error);
    });
  }
}

function getFilmsByDefault() {
  newApiService.query = input.value;
  if (newApiService.query === '') {
    newApiService.fetchTrends().catch(error => {
      console.log(error);
    });
  }
}
getFilmsByDefault();
