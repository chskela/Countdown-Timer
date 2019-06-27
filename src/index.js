const dateControl = document.querySelector('input[type="date"]');
const timeControl = document.querySelector('input[type="time"]');
const nameControl = document.querySelector('input[type="text"]');
//const start = document.querySelector('#start');
//const warning = document.querySelector('#warning');

const dateNow = new Date();

const month = (dateNow.getMonth() + 1 < 10) ? ('0' + (dateNow.getMonth() + 1)) : ('' + (dateNow.getMonth() + 1));
const day = (dateNow.getDate() < 10) ? ('0' + dateNow.getDate()) : ('' + dateNow.getDate());

dateControl.value = dateNow.getFullYear() + '-' + month + '-' + day;

let str = '';

for (let i = 0; i < localStorage.length; i++) {
    intervalInSeconds = Math.floor((new Date(localStorage.getItem(localStorage.key(i))) - new Date()) / 1000);
    let timerId = setInterval(() => {
        ul.innerHTML = '';
        if(intervalInSeconds <= 0) clearInterval(timerId);

        const time = calculationTime(intervalInSeconds);

        str =   `<li>
                    <div>
                        <p>${localStorage.key(i)}</p>
                        <span>${time.days}</span> days 
                        <span>${time.hours}</span> hours 
                        <span>${time.minutes}</span> minutes 
                        <span>${time.seconds}</span> seconds
                    </div>
                </li>`;

        ul.innerHTML = str;

        intervalInSeconds--;
    }, 1000)
}

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

  return {
      seconds,
      minutes,
      hours,
      days
  };
}

start.addEventListener('click', () => {

    if (nameControl.value === '') {
        warning.textContent = 'Введите название события!';
    } else {

        const setTime = new Date(dateControl.value + ' ' + timeControl.value);
        const nowTime = new Date();

        if (setTime <= nowTime)  {
            warning.textContent = 'Введите корректную дату и время!';
        } else {
            localStorage.setItem(nameControl.value, setTime);

            intervalInSeconds = Math.floor(Math.abs((setTime - nowTime) / 1000));

            let timerId = setInterval(() => {
                if(intervalInSeconds <= 0) clearInterval(timerId);
                calculationTime(intervalInSeconds);
                const time = calculationTime(intervalInSeconds);

                str = `<li>
                            <div>
                                <p>${nameControl.value}</p>
                                <span>${time.days}</span> days 
                                <span>${time.hours}</span> hours 
                                <span>${time.minutes}</span> minutes 
                                <span>${time.seconds}</span> seconds
                            </div>
                      </li>`;

                ul.innerHTML = str;
                intervalInSeconds--;
            }, 1000)
        }

    }

});