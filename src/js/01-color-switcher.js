const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');

let timer;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

start.addEventListener('click', () => {
  timer = setInterval(changeColor, 1000);
});

stop.addEventListener('click', () => {
  clearInterval(timer);
});
