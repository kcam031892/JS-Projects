const hrEl = document.querySelector('.clock__hr h1');
const minEl = document.querySelector('.clock__minute h1');
const secEl = document.querySelector('.clock__second h1');
const amPmEl = document.querySelector('.clock__ampm h1');
const dateEl = document.querySelector('.date');
const daysEl = document.querySelectorAll('.days h3');

const arrayMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

window.addEventListener('DOMContentLoaded', function () {
  render();
});

update();
function render() {
  const date = new Date();
  const secs = date.getSeconds();
  const mins = date.getMinutes();
  const hr = date.getHours();

  const convertedHour = hr <= 0 ? 12 : hr;
  const amPm = hr >= 12 ? 'PM' : 'AM';
  const dateNow = `${arrayMonths[date.getMonth()]} ${addPad(date.getDate())}, ${date.getFullYear()}`;
  const dayOfTheWeek = date.getDay();

  hrEl.textContent = addPad(convertedHour);
  minEl.textContent = addPad(mins);
  secEl.textContent = addPad(secs);
  amPmEl.textContent = amPm;
  dateEl.textContent = dateNow;

  setActiveDay(dayOfTheWeek);
}

function update() {
  setInterval(render, 1000);
}

function setActiveDay(index) {
  daysEl[index - 1].classList.add('active');
}

function addPad(num) {
  return +num < 10 ? '0' + num : num;
}
