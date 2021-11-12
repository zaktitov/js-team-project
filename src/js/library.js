import Notifications from './pNotify';
const notifications = new Notifications();

export default function (data) {
  const addToWatched = document.querySelector('.modal__watch-list')
  const addToQueue = document.querySelector('.modal__queue-list')

  let watchedList = JSON.parse(localStorage.getItem(`watchedList`)) || []
  let queueList = JSON.parse(localStorage.getItem(`queueList`)) || []

  let indexOfElWatched = 0
  let indexOfElQueue = 0

  function checkButton() {
    watchedList.forEach((element, i) => {
      if (element.id === data.id) {
        addToWatched.textContent = 'REMOVE FROM WATCHED';
        indexOfElWatched = i;
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

  function addToLocalStorageWatched() {
    if (addToWatched.textContent === 'REMOVE FROM WATCHED') {
      watchedList.splice(indexOfElWatched, 1);
      localStorage.setItem(`watchedList`, JSON.stringify(watchedList));
      addToWatched.textContent = 'ADD TO WATCHED';

      setTimeout(e => {
        notifications.removeFromWatched();
      }, 1000);

      checkButton();
    } else
      if (addToQueue.textContent === 'ADD TO QUEUE') {
        watchedList.push(data);
        let watchedStr = JSON.stringify(watchedList);
        localStorage.setItem(`watchedList`, watchedStr);
        setTimeout(e => {
          notifications.addToWatched();
        }, 1000);

        checkButton();
      } else
        {setTimeout(e => {
          notifications.alreadyInQueued();
        }, 1000);
}
  
  };

  function addToLocalStorageQueue () {
    if (addToQueue.textContent === 'REMOVE FROM QUEUE') {
      queueList.splice(indexOfElQueue, 1);
      localStorage.setItem(`queueList`, JSON.stringify(queueList));
      addToQueue.textContent = 'ADD TO QUEUE';
      setTimeout(e => {
        notifications.removeFromQueue();
      }, 1000);

      checkButton();
    } else 
      if (addToWatched.textContent === 'ADD TO WATCHED') {
        queueList.push(data);
        let queueStr = JSON.stringify(queueList);
        localStorage.setItem(`queueList`, queueStr);
        setTimeout(e => {
          notifications.addToQueue();
        }, 1000);

        checkButton();
      }
     else {
        setTimeout(e => {
          notifications.alreadyInWatched();
        }, 1000);

      }
  };

  
  addToWatched.addEventListener(`click`, addToLocalStorageWatched);
  addToQueue.addEventListener('click', addToLocalStorageQueue);


  // console.log('watchedList:', watchedList);
  // console.log('queueList:', queueList);

}
