import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

//declaración de valiables
const date = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');
const showDay = document.querySelector('.value[data-days]');
const showHour = document.querySelector('.value[data-hours]');
const showMinute = document.querySelector('.value[data-minutes]');
const showSecond = document.querySelector('.value[data-seconds]');
const today = new Date();
const todayMiliseconds = today.getTime();
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    //Llama a la función que valida la fecha
    validateDate();
  },
};

button.disabled = true;

flatpickr(date, options);

//Valida la fecha
function validateDate() {
  if (todayMiliseconds < selectedDate.getTime()) {
    button.disabled = false;
    button.addEventListener('click', countdown);
  } else {
    button.disabled = true;
    window.alert('Please choose a date in the future');
  }
}

//Hace la cuenta regresiva con setInterval
function countdown() {
  let specificCountdown = convertMs(selectedDate.getTime() - todayMiliseconds);
  addLeadingZero(specificCountdown);

  const timerId = setInterval(() => {
    if (specificCountdown.seconds > 0) {
      specificCountdown.seconds -= 1;
      addLeadingZero(specificCountdown);
    } else {
      if (specificCountdown.minutes > 0) {
        specificCountdown.seconds = 59;
        specificCountdown.minutes -= 1;
        addLeadingZero(specificCountdown);
      } else {
        if (specificCountdown.hours > 0) {
          specificCountdown.minutes = 59;
          specificCountdown.hours -= 1;
          addLeadingZero(specificCountdown);
        } else {
          if (specificCountdown.days > 0) {
            specificCountdown.hours = 23;
            specificCountdown.days -= 1;
            addLeadingZero(specificCountdown);
          } else {
            clearInterval(timerId);
          }
        }
      }
    }
  }, 1000);
}

//Calcula el tiempo detallado con los milisegundos
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

//Agrego un 0 a la izq en caso de necesitarse y muestra en pantalla
function addLeadingZero(value) {
  const show = Object.values(value).map(v => {
    const specificValue = v.toString();
    const valueShow = specificValue.padStart(2, '0');
    return valueShow;
  });

  showDay.textContent = show[0];
  showHour.textContent = show[1];
  showMinute.textContent = show[2];
  showSecond.textContent = show[3];
}
