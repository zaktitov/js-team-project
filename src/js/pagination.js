import { refs } from './refs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { getFilmsByDefault, newApiService } from './api';
import { fetchFilms } from './api';
import Preload from './preload';
const preload = new Preload();

const options = {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
  template: {
    page: '<a href="#" class="tui-page-btn" style="color:#ff6b01;  border:1px solid transparent; border-radius:5px; width:40px; height:40px; display:inline-flex; align-items:center; justify-content:center;">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected" style="background-color: #ff6b01; border:1px solid transparent;border-radius: 5px; font-size: 12px; width:40px; height:40px; display:inline-flex; align-items:center; justify-content:center;">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}"style="background-color:#F7F7F7; border-radius:5px; border:none;width:40px; height:40px; display:inline-flex; align-items:center; justify-content:center;">' +
      '<span class="tui-ico-{{type}}" style="background-color:#F7F7F7; border:none">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}" style="background-color:#F7F7F7; border:1px solid transparent; border-radius:5px; width:40px; height:40px;display:inline-flex; align-items:center; justify-content:center;">' +
      '<span class="tui-ico-{{type}}" style="border:none;">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}" style="display:none;">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

export const pagination = new Pagination('pagination', options);

pagination.on('afterMove', function (eventData) {
  newApiService.page = eventData.page;
  if (newApiService.searchType === 'byName') {
    fetchFilms();
    preload.deleteAddPreload()
  } else {
    getFilmsByDefault();
  }
  refs.filmCards.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});
