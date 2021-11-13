
const QUEUE = 'queueList';
const WATCHED = 'watchedList';

export default {
  getMoviesFromQueueStorage() {
    return getMoviesFromStorage(QUEUE)
  },
  
  getMoviesFromWatchedStorage() {
    return getMoviesFromStorage(WATCHED)
  },
}

function getMoviesFromStorage(list) {
  return JSON.parse(localStorage.getItem(list));
}