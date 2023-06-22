const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
btnStop.disabled = true;
let timerId = null;
btnStart.addEventListener('click', onClick);

function onClick() {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
}

btnStop.addEventListener('click', offClick);

function offClick() {
  clearInterval(timerId);
  btnStart.disabled = false;
  btnStop.disabled = true;
}
//const btn = document.querySelectorAll('button');
// btn.forEach(button => {
//   button.addEventListener('click', () => {
//     button.setAttribute('disabled', '');
//   });
//   button.removeAttribute('disabled');
// });

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
