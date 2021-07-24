const secondLine = document.querySelector('.second-line');
const minuteLine = document.querySelector('.minute-line');
const hourLine = document.querySelector('.hour-line');

window.addEventListener('DOMContentLoaded', display);
update();

function display() {
  const date = new Date();
  const secs = date.getSeconds();
  const minutes = date.getMinutes();
  const hour = date.getHours();

  secondLine.style.transform = `rotate(${secs * 6}deg) translateY(-29%)`;
  minuteLine.style.transform = `rotate(${minutes * 6}deg) translateY(-50%) `;
  hourLine.style.transform = `rotate(${hour * 30}deg)  translateY(-50%) `;
}
function update() {
  setInterval(() => {
    display();
  }, 1000);
}
