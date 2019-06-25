const dateControl = document.querySelector('input[type="date"]');
const timeControl = document.querySelector('input[type="time"]');
const nameControl = document.querySelector('input[type="text"]');
const start = document.querySelector('#start');
const secondsInInterval = document.querySelector('#seconds');
const minuteInInterval = document.querySelector('#minutes');
const hoursInInterval = document.querySelector('#hours');
const dayInInterval = document.querySelector('#days');
const timerName = document.querySelector('#timerName');
const clock = document.querySelector('.clock');
const warning = document.querySelector('#warning');

const dateNow = new Date();

const month = (dateNow.getMonth() + 1 < 10) ? ('0' + (dateNow.getMonth() + 1)) : ('' + (dateNow.getMonth() + 1));
const day = (dateNow.getDate() < 10) ? ('0' + dateNow.getDate()) : ('' + dateNow.getDate());

dateControl.value = dateNow.getFullYear() + '-' + month + '-' + day;

const calculationTime = intervalInSeconds => {

  secondsInInterval.textContent = (intervalInSeconds % 60) < 10 ?
      '0' + (intervalInSeconds % 60) :
      (intervalInSeconds % 60);

  minuteInInterval.textContent = (Math.floor(intervalInSeconds / 60) % 60 < 10) ?
      '0' + (Math.floor(intervalInSeconds / 60) % 60) :
      (Math.floor(intervalInSeconds / 60) % 60);

  hoursInInterval.textContent = (Math.floor(intervalInSeconds / 3600) % 24) < 10 ?
      '0' + (Math.floor(intervalInSeconds / 3600) % 24) :
      (Math.floor(intervalInSeconds / 3600) % 24);

  dayInInterval.textContent = Math.floor(intervalInSeconds / 86400);

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