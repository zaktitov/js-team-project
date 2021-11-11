import Notifications from './pNotify';
const notifications = new Notifications();

export default function (data) {
  const addToWatched = document.querySelector('.modal__watch-list');
  const addToQueue = document.querySelector('.modal__queue-list');

  let watchedList = JSON.parse(localStorage.getItem(`watchedList`)) || [];
  let queueList = JSON.parse(localStorage.getItem(`queueList`)) || [];

  let indexOfElWatched = 0;
  let indexOfElQueue = 0;

  const checkButton = function () {
    watchedList.forEach((element, i) => {
      if (element.id === data.id) {
        addToWatched.textContent = 'REMOVE FROM WATCHED';
        indexOfElWatched = i;
        setTimeout(e => {
          notifications.addToWatched();
        }, 1000);
      }
    });

    queueList.forEach((element, i) => {
      if (element.id === data.id) {
        addToQueue.textContent = 'REMOVE FROM QUEUE';
        indexOfElQueue = i;
      }
    });
  };

  checkButton();

  const addToLocalStorageWatched = function () {
    if (addToWatched.textContent === 'REMOVE FROM WATCHED') {
      watchedList.splice(indexOfElWatched, 1);
      localStorage.setItem(`watchedList`, JSON.stringify(watchedList));
      addToWatched.textContent = 'ADD TO WATCHED';

      setTimeout(e => {
        notifications.removeFromwatched();
      }, 1000);

      checkButton();
    } else {
      watchedList.push(data);
      let watchedStr = JSON.stringify(watchedList);
      localStorage.setItem(`watchedList`, watchedStr);
      checkButton();
    }
  };

  const addToLocalStorageQueue = function () {
    if (addToQueue.textContent === 'REMOVE FROM QUEUE') {
      queueList.splice(indexOfElQueue, 1);
      localStorage.setItem(`queueList`, JSON.stringify(queueList));
      addToQueue.textContent = 'ADD TO QUEUE';

      checkButton();
    } else {
      queueList.push(data);
      let queueStr = JSON.stringify(queueList);
      localStorage.setItem(`queueList`, queueStr);
      checkButton();
    }
  };

  addToWatched.addEventListener(`click`, addToLocalStorageWatched);
  addToQueue.addEventListener('click', addToLocalStorageQueue);

  console.log('watchedList:', watchedList);
  console.log('queueList:', queueList);
}
