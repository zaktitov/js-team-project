import { notice, error, success, info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export default class Notifications {
  constructor() {}

  showNotice() {
    notice({
      text: 'Please, enter some text 🔤',
      hide: true,
      delay: 1000,
      animateSpeed: 'fast',
      shadow: true,
      closer: true,
      minHeight: 18,
    });
  }

  showError() {
    error({
      text: 'Oops, something wrong ❌!',
      hide: true,
      delay: 1000,
      animateSpeed: 'slow',
      closer: true,
      minHeight: 25,
    });
  }

  showSuccess() {
    success({
      text: 'The films have been found 😃',
      delay: 1000,
      hide: true,
      animateSpeed: 'slow',
      closer: true,
      width: '280px',
      minHeight: 18,
    });
  }

  showTrends() {
    info({
      text: 'Trends for today 🍿',
      delay: 1000,
      hide: true,
      animateSpeed: 'slow',
      closer: true,
      width: '210px',
      minHeight: 18,
    });
  }

  addToWatched() {
    success({
      text: 'The film was added to watched 📽️',
      delay: 1000,
      hide: true,
      animateSpeed: 'slow',
      closer: true,
      width: '250px',
      minHeight: 18,
    });
  }

  removeFromwatched() {
    error({
      text: 'The film was removed from watched 📽️',
      delay: 1000,
      hide: true,
      animateSpeed: 'slow',
      closer: true,
      width: '250px',
      minHeight: 18,
    });
  }
}
