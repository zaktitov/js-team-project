import { notice, error, success, info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export default class Notifications {
  constructor() {}

  showNotice() {
    notice({
      text: 'Please, enter some text ð¤',
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
      text: 'Oops, something wrong â!',
      hide: true,
      delay: 1000,
      animateSpeed: 'slow',
      closer: true,
      minHeight: 25,
    });
  }

  showSuccess() {
    success({
      text: 'The films have been found ð',
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
      text: 'Trends for today ð¿',
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
      text: 'The film was added to watched ð½ï¸',
      delay: 600,
      hide: true,
      animateSpeed: 'slow',
      closer: true,
      width: '250px',
      minHeight: 18,
    });
  }

  removeFromWatched() {
    error({
      text: 'The film was removed from watched ð½ï¸',
      delay: 1000,
      hide: true,
      animateSpeed: 'slow',
      closer: true,
      width: '250px',
      minHeight: 18,
    });
  }

  addToQueue() {
    success({
      text: 'The film was added to queue ð½ï¸',
      delay: 600,
      hide: true,
      animateSpeed: 'slow',
      closer: true,
      width: '250px',
      minHeight: 18,
    });
  }

  removeFromQueue() {
    error({
      text: 'The film was removed from queueð½ï¸',
      delay: 1000,
      hide: true,
      animateSpeed: 'slow',
      closer: true,
      width: '250px',
      minHeight: 18,
    });
  }

  alreadyInWatched() {
    error({
      text: 'This film is already in your Watched Library ð½ï¸',
      delay: 1000,
      hide: true,
      animateSpeed: 'slow',
      closer: true,
      width: '250px',
      minHeight: 18,
    });
  }

  alreadyInQueued() {
    error({
      text: 'This film is already in your Queued Library ð½ï¸',
      delay: 1000,
      hide: true,
      animateSpeed: 'slow',
      closer: true,
      width: '250px',
      minHeight: 18,
    });
  }

  startListening() {
    info({
      text: 'listening, please speak...',
      delay: 1000,
      hide: true,
      animateSpeed: 'slow',
      closer: true,
      width: '210px',
      minHeight: 18,
    });
  }

  stopListening() {
    info({
      text: 'stopped listening, hope you are done...',
      delay: 1000,
      hide: true,
      animateSpeed: 'slow',
      closer: true,
      width: '210px',
      minHeight: 18,
    });
  }

  showNotFound() {
    error({
      text: 'Sorry, video not found â!',
      hide: true,
      delay: 1000,
      animateSpeed: 'slow',
      closer: true,
      minHeight: 25,
    });
  }

  showNotFilms() {
    error({
      text: 'Sorry, films not found â!',
      hide: true,
      delay: 1000,
      animateSpeed: 'slow',
      closer: true,
      minHeight: 25,
    });
  }
}
