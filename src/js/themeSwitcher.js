const input = document.getElementById('checkbox');
const body = document.querySelector('body');

const currentTheme = {
  DARK: 'dark-theme',
  LIGHT: 'light-theme',
};

input.addEventListener('change', changeTheme);

function changeTheme(e) {
  if (input.checked) {
    body.classList.toggle('dark');
    localStorage.setItem('theme', currentTheme.DARK);
  } else {
    body.classList.toggle('dark');
    localStorage.setItem('theme', currentTheme.LIGHT);
  }
}

if (localStorage.getItem('theme') === currentTheme.DARK) {
  input.checked = true;
  body.classList.toggle('dark');
}
