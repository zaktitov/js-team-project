import { notice, error, success } from '@pnotify/core';
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
    });
  }

  showError() {
    error({
      text: 'Oops, something wrong!',
      hide: true,
      delay: 1000,
      animateSpeed: 'slow',
      closer: true,
    });
  }

  showSuccess() {
    success({
      text: 'Found awesome films for you 🎞️',
      delay: 1000,
      hide: true,
      animateSpeed: 'slow',
      closer: true,
      width: '280px',
    });
  }

  showTrends() {
    success({
      text: 'Trends for today 🍿',
      delay: 1000,
      hide: true,
      animateSpeed: 'slow',
      closer: true,
      width:"210px"
      
    });
  }
}
