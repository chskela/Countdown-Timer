const dateControl = document.querySelector('input[type="date"]');
const timeControl = document.querySelector('input[type="time"]');
const nameControl = document.querySelector('input[type="text"]');
const start = document.querySelector('#start');
const secondsInInterval = document.querySelector('#seconds');
const minutesInInterval = document.querySelector('#minutes');
const hoursInInterval = document.querySelector('#hours');
const dayInInterval = document.querySelector('#days');
const timerName = document.querySelector('#timerName');
const clock = document.querySelector('.clock');
const warning = document.querySelector('#warning');

const dateNow = new Date();

const month = (dateNow.getMonth() + 1 < 10) ? ('0' + (dateNow.getMonth() + 1)) : ('' + (dateNow.getMonth() + 1));
const day = (dateNow.getDate() < 10) ? ('0' + dateNow.getDate()) : ('' + dateNow.getDate());

dateControl.value = dateNow.getFullYear() + '-' + month + '-' + day;

let str = '';

for (let i = 0; i < localStorage.length; i++) {
  const time = calculationTime(Math.floor(+localStorage.getItem(localStorage.key(i)) - new Date()));
  str += `<li>
            <div>
              <p>${localStorage.key(i)}</p>
              <span>${time.days}</span> days 
              <span>${time.hours}</span> hours 
              <span>${time.minutes}</span> minutes 
              <span>${time.seconds}</span> seconds
            </div>
          </li>`;
} 
ul.innerHTML += str;

function calculationTime(intervalInSeconds) {
  
  const seconds = (intervalInSeconds % 60) < 10 ?
      '0' + (intervalInSeconds % 60) :
      (intervalInSeconds % 60);

  const minutes = (Math.floor(intervalInSeconds / 60) % 60 < 10) ?
      '0' + (Math.floor(intervalInSeconds / 60) % 60) :
      (Math.floor(intervalInSeconds / 60) % 60);

  const hours = (Math.floor(intervalInSeconds / 3600) % 24) < 10 ?
      '0' + (Math.floor(intervalInSeconds / 3600) % 24) :
      (Math.floor(intervalInSeconds / 3600) % 24);

  const days = Math.floor(intervalInSeconds / 86400);
  
  const time = {
    seconds, 
    minutes, 
    hours, 
    days
  } 
  return time;
};

start.addEventListener('click', () => {

    if (nameControl.value === '') {
        warning.textContent = 'Введите название события!';
    } else {

        timerName.textContent = nameControl.value;

        const setTime = new Date(dateControl.value + ' ' + timeControl.value);
        const nowTime = new Date();

        if (setTime <= nowTime)  {
            warning.textContent = 'Введите корректную дату и время!';
        } else {
            localStorage.setItem(nameControl.value, setTime);
            clock.hidden = false;
            intervalInSeconds = Math.floor(Math.abs((setTime - nowTime) / 1000));

            let timerId = setInterval(() => {
                if(intervalInSeconds <= 0) clearInterval(timerId);
                calculationTime(intervalInSeconds);
                
                intervalInSeconds--;
            }, 1000)
        }

    }

});