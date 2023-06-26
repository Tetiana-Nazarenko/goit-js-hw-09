import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  calendar: document.querySelector('#datetime-picker'),
  timer: document.querySelector('.timer'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

document.body.style.backgroundColor = '#ec5dda';
refs.timer.style.display = 'flex';
refs.timer.style.gap = '40px';
refs.timer.style.fontSize = '30px';

refs.btnStart.addEventListener('click', counterTime);
//*** */

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDataCheck(selectedDates);
    console.log(selectedDates[0]);
  },
};
refs.btnStart.disabled = true;

let selectedDate = null;
let currentDate = null;
let intervalId = null;

flatpickr(refs.calendar, options);

function onDataCheck(selectedDates) {
  selectedDate = selectedDates[0].getTime();
  currentDate = new Date().getTime();
  if (selectedDate > currentDate) {
    refs.btnStart.disabled = false;
    console.log('Выбранная правильная дата');
    Notiflix.Report.success('Congratulations!', 'Date is true', 'Continue');
    return;
  }
  Notiflix.Report.failure(
    'Opps...',
    'Date is false. Choose another date!',
    'Ok'
  );
}
let remainingTime = 0;
function counterTime() {
  intervalId = setInterval(() => {
    currentDate = new Date().getTime();
    if (selectedDate - currentDate <= 1000) {
      clearInterval(intervalId);
      refs.btnStart.disabled = true;
      refs.calendar.disabled = false;
      Notiflix.Report.info(
        'Congratulation!',
        'Choose a date and click on start',
        'OK'
      );
      return;
    } else {
      refs.btnStart.disabled = true;
      refs.calendar.disabled = true;
      currentDate += 1000;
      remainingTime = Math.floor(selectedDate - currentDate);
      convertMs(remainingTime);
    }
  }, 1000);
}
//** */
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  createMarkup({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}
function createMarkup({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function pad(value) {
  return String(value).padStart(2, '0');
}
