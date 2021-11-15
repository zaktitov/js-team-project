import { refs } from './refs.js';
import Notifications from './pNotify';

const notifications = new Notifications();
let SpeechRecognition = null;

function onSpeechRec() {
  SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onstart = () => notifications.startListening();

  recognition.onspeechend = () => {
    notifications.stopListening();
    recognition.stop();
  };

  recognition.onresult = event => {
    const transcript = event.results[0][0].transcript;
    refs.input.value = transcript;
  };

  recognition.lang = 'en-US';
  recognition.start();
}

refs.speechBtn.addEventListener('click', onSpeechRec);