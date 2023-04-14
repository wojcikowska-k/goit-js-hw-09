import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtnEl = document.querySelector('button[data-start]');
const inputEl = document.querySelector('input[type="text"]');
const daysValueEl = document.querySelector('[data-days]');
const hoursValueEl = document.querySelector('[data-hours]');
const minutesValueEl = document.querySelector('[data-minutes]');
const secondsValueEl = document.querySelector('[data-seconds]');

let timerId = null;
startBtnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtnEl.disabled = false;
    }
  },
};

const fp = flatpickr(inputEl, options); // flatpickr

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value.toString().length === 1) {
    return value.toString().padStart(2, '0');
  } else {
    return value;
  }
}

const getTime = () => {
  timerId = setInterval(() => {
    const selectedDate = inputEl.value;
    const selectedDateMs = new Date(selectedDate).getTime();
    const todayDateMs = new Date().getTime();
    const timeLeft = selectedDateMs - todayDateMs;
    const convertedDate = convertMs(timeLeft);
    daysValueEl.textContent = `${addLeadingZero(convertedDate.days)}`;
    hoursValueEl.textContent = `${addLeadingZero(convertedDate.hours)}`;
    minutesValueEl.textContent = `${addLeadingZero(convertedDate.minutes)}`;
    secondsValueEl.textContent = `${addLeadingZero(convertedDate.seconds)}`;
  }, 1000);
};

startBtnEl.addEventListener('click', getTime);
