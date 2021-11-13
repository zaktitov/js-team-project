export default class Preload {
  constructor() {
    this.preload = document.querySelector('.preload');
  }

  preloadAnimation() {
    window.addEventListener('load',
      () => {
        this.preload.classList.toggle('preload__end');
      })
  }

  deleteAddPreload() {
    this.preload.classList.toggle('preload__end');
  }
}
