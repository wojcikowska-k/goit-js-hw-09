import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtnEl = document.querySelector('button[data-start]');
const inputEl = document.querySelector('input[type="text"]');
const daysValueEl = document.querySelector('[data-days]');
const hoursValueEl = document.querySelector('[data-hours]');
const minutesValueEl = document.querySelector('[data-minutes]');
const secondsValueEl = document.querySelector('[data-seconds]');

startBtnEl.disabled = true;
const todayDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: todayDate,
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] < todayDate) {
      window.alert('Please choose a date in the future');
    } else {
      startBtnEl.disabled = false;
    }
  },
};

const fp = flatpickr(inputEl, options); // flatpickr

function getMiliseconds() {
  const selectedDate = inputEl.value;
  const selectedDateMs = new Date(selectedDate).getTime();
  const todayDateMs = new Date(todayDate).getTime();
  const timeLeft = selectedDateMs - todayDateMs;
  console.log(timeLeft);
  return timeLeft;
}

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

startBtnEl.addEventListener('click', () => {
  console.log('clicked');
  const convertedDate = convertMs(getMiliseconds());
  daysValueEl.textContent = `${convertedDate.days}`;
  hoursValueEl.textContent = `${convertedDate.hours}`;
  minutesValueEl.textContent = `${convertedDate.minutes}`;
  secondsValueEl.textContent = `${convertedDate.seconds}`;
});
