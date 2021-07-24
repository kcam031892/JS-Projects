const btnSetTimer = document.querySelector('#timer-start');
const btnClock = document.querySelectorAll('.btn-clock');
const btnTimer = document.querySelectorAll('.btn-timer');
const timer = new Timer();

document.addEventListener('DOMContentLoaded', () => {
  timer.populate();
});

btnSetTimer.addEventListener('click', () => timer.start());

btnClock.forEach((t) => t.addEventListener('click', toggleDisplay));
btnTimer.forEach((t) => t.addEventListener('click', toggleDisplay));

function toggleDisplay(e) {
  const clockEl = document.getElementById('clock');
  const timerEl = document.getElementById('timer');
  if (e.target.classList.contains('btn-clock')) {
    clockEl.style.display = 'block';
    timerEl.style.display = 'none';
  } else {
    clockEl.style.display = 'none';
    timerEl.style.display = 'block';
  }
}
