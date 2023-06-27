import Notiflix from 'notiflix';

const form = document.querySelectorAll('input');
const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const btn = document.querySelector('submit', createPromise);

document.body.style.backgroundColor = 'green';
form.style.alignItem = 'center';

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    // Asynchronous operation
    console.log(promise);
  });
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    Notiflix.Report.success('Congratulations!', 'Date is true', 'Continue');
  } else {
    Notiflix.Report.failure(
      'Opps...',
      'Date is false. Choose another date!',
      'Ok'
    );
    // Reject
  }
}
//

createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
