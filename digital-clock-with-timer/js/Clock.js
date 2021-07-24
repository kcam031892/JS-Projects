class Clock {
  constructor() {
    // Get elements.
    this.clockEl = document.querySelector('#clock');
    this.dateEl = document.querySelector('.clock-date');
    this.dayEl = document.querySelector('.clock-day');
    this.hrEl = document.querySelector('.clock-hr');
    this.minEl = document.querySelector('.clock-min');
    this.secEl = document.querySelector('.clock-sec');
    this.periodEl = document.querySelector('.clock-period');
    // A list of days and months.
    this.dayList = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    this.monthList = [
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
      'December',
    ];
  }
  // Returning a current date.
  getDate() {
    return new Date();
  }
  // Display Full Date
  setDate() {
    let month = this.monthList[this.getDate().getMonth()];
    let day = this.getDate().getUTCDate();
    let year = this.getDate().getFullYear();
    const date = `${month} ${day}, ${year}`;
    this.dateEl.textContent = date;
  }
  // Display Day of the week.
  setDay() {
    const day = this.dayList[this.getDate().getDay() - 1];
    this.dayEl.textContent = day;
  }
  // Display an hour, Its not a military time.
  setHour() {
    let hr = this.getDate().getHours();
    if (hr > 12) {
      hr -= 12;
    }
    this.hrEl.textContent = this.stringPadding(hr);
  }
  // Display Minutes
  setMins() {
    const mins = this.getDate().getMinutes();
    this.minEl.textContent = this.stringPadding(mins);
  }
  // Display Seconds
  setSecs() {
    let secs = this.getDate().getSeconds();
    this.secEl.textContent = this.stringPadding(secs);
  }
  // Display AM,PM
  setPeriod() {
    let period;
    let hr = this.getDate().getHours();
    if (hr > 12) {
      period = 'PM';
    } else {
      period = 'AM';
    }
    this.periodEl.textContent = period;
  }
  // Adding 0 padding.
  stringPadding(num) {
    num = String(num);
    if (num.length <= 1) {
      num = `0${num}`;
    }
    return num;
  }

  start() {
    if (this.clockEl) {
      this.setDate();
      this.setDay();
      this.setHour();
      this.setMins();
      this.setSecs();
      this.setPeriod();
      this.update();
    }
  }
  // Updating the clock.
  update() {
    const tick = setInterval(() => {
      this.setDate();
      this.setDay();
      this.setHour();
      this.setMins();
      this.setSecs();
    }, 1000);
  }
}

// Instantiate a clock and start running.
const clock = new Clock();
clock.start();
