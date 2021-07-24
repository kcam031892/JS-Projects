const wrapperEl = document.querySelector('.wrapper');
const btnGenerate = document.querySelector('.btn-generate');
const hexEl = document.querySelector('.hex-text');

window.addEventListener('DOMContentLoaded', function () {
  update();
});
btnGenerate.addEventListener('click', update);

/**
 * Update the elements.
 * @returns void
 */
function update() {
  const hex = generateHexCode();
  wrapperEl.style.background = hex;
  hexEl.textContent = hex;
}

/**
 * Generating a Hex Code
 * @returns string
 */
function generateHexCode() {
  let hex = '#';
  const letters = ['a', 'b', 'c', 'd', 'e', 'f'];
  const numbers = Array.from({ length: 10 }).map((_, i) => i);
  const validHex = [...letters, ...numbers];

  for (let i = 0; i < 6; i++) {
    hex += validHex[Math.floor(Math.random() * validHex.length)];
  }

  return hex;
}
