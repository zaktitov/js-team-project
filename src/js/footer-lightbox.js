const refs = {
    footerLightbox: document.querySelector('.js-footer-light-box'),
    footerLightboxOverlay: document.querySelector('.js-footer-light-box-overlay'),
    footerLightboxWindow: document.querySelector('.js-footer-lightbox-window'),
    footerLightboxOpenBtn: document.querySelector('.modal-open-btn'),
    footerLightboxCloseBtn: document.querySelector('.footer-lightbox-close-btn'),
}

refs.footerLightboxOpenBtn.addEventListener('click', onOpenModal);
refs.footerLightboxCloseBtn.addEventListener('click', onCloseModal);
refs.footerLightboxOverlay.addEventListener('click', onLightBoxOverlayClick)


function onOpenModal(e) {
        e.preventDefault();
        window.addEventListener('keydown', onEscBtnPress);
        refs.footerLightboxCloseBtn.addEventListener('click', onCloseModal)
        refs.footerLightbox.classList.add("is-open");
}

function onCloseModal() {
    window.removeEventListener('keydown', onEscBtnPress)
    refs.footerLightbox.classList.remove("is-open");
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