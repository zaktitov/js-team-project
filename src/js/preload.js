export default class Preload {
  constructor() {}

  preloadAnimation() {
    const preload = document.querySelector('.preload');
    preload.style.display = 'none';
  }

  windowListener() {
    window.addEventListener('load', this.preloadAnimation);
  }
}
const newPreload = new Preload();
newPreload.windowListener();
