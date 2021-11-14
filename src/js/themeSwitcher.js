
import { refs } from './refs.js'
const{checkbox, body, modal, footerLightboxWindow} = refs


const currentTheme = {
  DARK: 'dark-theme',
  LIGHT: 'light-theme',
};

checkbox.addEventListener('change', changeTheme);

function changeTheme(e) {
  if (checkbox.checked) {
    body.classList.toggle('dark');
    modal.classList.toggle('dark');
    footerLightboxWindow.classList.toggle('dark')
    localStorage.setItem('theme', currentTheme.DARK);
    body.classList.toggle('light');
    modal.classList.toggle('light');
    footerLightboxWindow.classList.toggle('light')
   
  } else {
    body.classList.toggle('dark');
    modal.classList.toggle('dark');
    footerLightboxWindow.classList.toggle('dark')
    localStorage.setItem('theme', currentTheme.LIGHT);
    body.classList.toggle('light');
    modal.classList.toggle('light');
    footerLightboxWindow.classList.toggle('light')
  
  }
}

if (localStorage.getItem('theme') === currentTheme.DARK) {
  checkbox.checked = true;
  body.classList.toggle('dark');
  body.classList.toggle('light');
  modal.classList.toggle('dark');
  modal.classList.toggle('light');
  footerLightboxWindow.classList.toggle('dark')
  footerLightboxWindow.classList.toggle('light')
}
