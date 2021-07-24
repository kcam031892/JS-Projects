const counterEl = document.querySelector('.counter__title');
const incrementBtn = document.querySelector('.btn-increment');
const decrementBtn = document.querySelector('.btn-decrement');
const resetBtn = document.querySelector('.btn-reset');
let currentValue = Number(counterEl.textContent) || 0;

// Event for increasing the value of counter
incrementBtn.addEventListener('click', function () {
  counterEl.textContent = currentValue += 1;
  animate(counterEl);
});

// Event for decreasing the value of counter if the counter is greater than 0
decrementBtn.addEventListener('click', function () {
  if (currentValue > 0) {
    counterEl.textContent = currentValue -= 1;
    animate(counterEl);
  }
});

// Event for reseting the value of counter
resetBtn.addEventListener('click', function () {
  currentValue = 0;
  counterEl.textContent = currentValue;
  animate(counterEl);
});

/**
 * Adding class animate to element
 * @param {Element} el - Element.
 * @param {number} [timer=1000] Time in milliseconds.
 * @param {string} [className=animate] className - Name of class  you want to animate.
 */
function animate(el, timer = 1000, className = 'animate') {
  el.classList.add('animate');
  setTimeout(() => {
    el.classList.remove(className);
  }, timer);
}
