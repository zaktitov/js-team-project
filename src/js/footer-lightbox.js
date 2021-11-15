import { refs } from './refs.js';
const {
  footerLightbox,
  footerLightboxOverlay,
  footerLightboxWindow,
  footerLightboxOpenBtn,
  footerLightboxCloseBtn,
  body,
} = refs;

footerLightboxOpenBtn.addEventListener('click', onOpenModal);
footerLightboxCloseBtn.addEventListener('click', onCloseModal);
footerLightboxOverlay.addEventListener('click', onLightBoxOverlayClick);

function onOpenModal(e) {
  e.preventDefault();
  window.addEventListener('keydown', onEscBtnPress);
  footerLightboxCloseBtn.addEventListener('click', onCloseModal);
  footerLightbox.classList.add('is-open');
  body.style.overflow = 'hidden';
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscBtnPress);
  footerLightbox.classList.remove('is-open');
  body.style.overflow = 'auto';
}

function onCloseBtnClick() {
  window.addEventListener('keydown', onEscBtnPress);
  onCloseModal();
}

function onLightBoxOverlayClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onEscBtnPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

// class Modal {
//     constructor({ modalWindowSelector, modalOpenBtnSelector, modalCloseBtnSelector, modalOverlaySelector }) {
//         this.modalWindow = document.querySelector(modalWindowSelector);
//         this.modalOpenBtn = document.querySelector(modalOpenBtnSelector);
//         this.modalCloseBtn = document.querySelector(modalCloseBtnSelector);
//         this.modalOverlay = document.querySelector(modalOverlaySelector);
//         this.modalOpenBtn.addEventListener('click', this.onOpenModal);
//         this.modalCloseBtn.addEventListener('click', this.onCloseModal);
//         this.modalOverlay.addEventListener('click', this.onModalOverlayClick);
//     }

//     onOpenModal(e) {
//         e.preventDefault();
//         window.addEventListener('keydown', this.onEscBtnPress);
//         refs.footerModal.classList.add("is-open");
//     }

//     onCloseModal() {
//         window.removeEventListener('keydown', this.onEscBtnPress)
//         refs.footerModal.classList.remove("is-open");
//     }

//     onModalOverlayClick(e) {
//         if (e.currentTarget === e.target) {
//             window.removeEventListener('keydown', this.onEscBtnPress)
//             refs.footerModal.classList.remove("is-open");
//         }
//     }

//     onEscBtnPress(e) {
//         if (e.code === 'Escape') {
//             window.removeEventListener('keydown', this.onEscBtnPress)
//             refs.footerModal.classList.remove("is-open");
//         }
//     }
// }

// const modalWindow = new Modal({
//     modalWindowSelector: '.footer-modal-window',
//     modalOpenBtnSelector: '.footer-modal-open',
//     modalCloseBtnSelector: '.footer-modal-close-btn',
//     modalOverlaySelector: '.modal-overlay',
// })
