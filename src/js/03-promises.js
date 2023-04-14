import Notiflix from 'notiflix';

const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');
const formEl = document.querySelector('form');

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
};

const displayPromises = () => {
  let delay = +delayEl.value;

  for (let i = 1; i <= amountEl.value; i++) {
    createPromise(i, delay)
      .then(resolve => {
        Notiflix.Notify.success(resolve);
      })
      .catch(reject => {
        Notiflix.Notify.failure(reject);
      });

    delay += +stepEl.value;
  }
};

formEl.addEventListener('submit', event => {
  event.preventDefault();
  displayPromises();
});
