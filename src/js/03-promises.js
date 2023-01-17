const firstDelay = document.querySelector("input[name='delay']");
const delayStep = document.querySelector("input[name='step']");
const amount = document.querySelector("input[name='amount']");
const button = document.querySelector('button');

button.addEventListener('click', cicle);

function cicle(event) {
  event.preventDefault();
  const until = parseInt(amount.value);
  const delay = parseInt(firstDelay.value);
  const step = parseInt(delayStep.value);
  let repeat = delay;

  for (let counter = 1; counter <= until; counter++) {
    createPromise(counter, repeat)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    repeat = repeat + step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}
