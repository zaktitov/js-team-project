import { refs } from './refs.js';
import Notifications from './pNotify';
import { findFilmByWord } from './api.js';

const notifications = new Notifications();
let SpeechRecognition = null;

const onSpeechRec = () => {
  SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onstart = () => notifications.startListening();

  recognition.onspeechend = () => {
    notifications.stopListening();
    recognition.stop();
    setTimeout(() => {
      findFilmByWord();
    }, 500);
  };

  recognition.onresult = event => {
    const transcript = event.results[0][0].transcript;
    refs.input.value = transcript;
  };

  recognition.lang = 'en-US';
  recognition.start();
};

refs.speechBtn.addEventListener('click', onSpeechRec);
