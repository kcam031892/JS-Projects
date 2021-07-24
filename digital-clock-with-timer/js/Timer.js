class Timer {
  constructor() {
    // Get all elements.
    this.selectHr = document.querySelector('#select_hr');
    this.selectMin = document.querySelector('#select_min');
    this.selectSec = document.querySelector('#select_sec');
    this.btnStart = document.querySelector('#timer-start');
  }
  // Adding items,values on the select element
  populateSelect(min, max, el) {
    for (let i = min; i <= max; i++) {
      const opt = document.createElement('option');
      if (i < 10) {
        opt.setAttribute('value', i);
        opt.textContent = '0' + i;
      } else {
        opt.setAttribute('value', i);
        opt.textContent = i;
      }
      el.appendChild(opt);
    }
  }
  // Disabling all elements.
  disabledElements() {
    this.selectHr.setAttribute('disabled', 'disabled');
    this.selectSec.setAttribute('disabled', 'disabled');
    this.selectMin.setAttribute('disabled', 'disabled');
    this.btnStart.setAttribute('disabled', 'disabled');
  }
  // Enabling all elements
  enabledElements() {
    this.selectHr.removeAttribute('disabled');
    this.selectSec.removeAttribute('disabled');
    this.selectMin.removeAttribute('disabled');
    this.btnStart.removeAttribute('disabled');
  }
  // Start a timer and disabling all elements.
  start() {
    let hr = Number(this.selectHr.value);
    let mins = Number(this.selectMin.value);
    let secs = Number(this.selectSec.value);
    this.updateTimer(hr, mins, secs);
    this.disabledElements();
  }
  // Updating a timer
  updateTimer(hr, mins, secs) {
    let tick = setInterval(() => {
      // Check if timer is done. If its done display an alert and enable elements.
      if (hr === 0 && mins === 0 && secs === 0) {
        alert('Timer Done.');
        clearInterval(tick);
        this.enabledElements();
      }

      if (mins <= 0 && hr > 0) {
        // Check if hour has a value
        hr = hr - 1;
        this.selectHr.value = hr;
        mins = 60;
      } else if (secs <= 0 && mins > 0) {
        // Check if mins has a value
        mins = mins - 1;
        this.selectMin.value = mins;
        secs = 60;
      }

      // Decrementing a seconds on timer.
      if (secs > 0) {
        secs = secs - 1;
        this.selectSec.value = secs;
      }
    }, 1000);
  }
  // Populate select element.
  populateHr() {
    this.populateSelect(0, 23, this.selectHr);
  }
  populateMin() {
    this.populateSelect(0, 59, this.selectMin);
  }
  populateSecs() {
    this.populateSelect(0, 59, this.selectSec);
  }
  populate() {
    this.populateHr();
    this.populateMin();
    this.populateSecs();
  }
}
