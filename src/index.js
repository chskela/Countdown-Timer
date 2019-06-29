const dateControl = document.querySelector('input[type="date"]');
const timeControl = document.querySelector('input[type="time"]');
const nameControl = document.querySelector('input[type="text"]');
//const start = document.querySelector('#start');
//const warning = document.querySelector('#warning');

// Устанавливаем текущую дату
const dateNow = new Date();

const month =
  dateNow.getMonth() + 1 < 10
    ? "0" + (dateNow.getMonth() + 1)
    : "" + (dateNow.getMonth() + 1);
const day =
  dateNow.getDate() < 10 ? "0" + dateNow.getDate() : "" + dateNow.getDate();

dateControl.value = dateNow.getFullYear() + "-" + month + "-" + day;

// Получаем таймер из LocalStorage
for (let i = 0; i < localStorage.length; i++) {
  intervalInSeconds = Math.floor(
    (new Date(localStorage.getItem(localStorage.key(i))) - new Date()) / 1000
  );
  nameTimer.textContent = localStorage.key(i);

  let timerId = setInterval(() => {
    if (intervalInSeconds <= 0) {
      nameTimer.textContent = nameTimer.textContent + ` - Время вышло!!!`;

      clearInterval(timerId);
    }

    const time = calculationTime(intervalInSeconds);

    days.textContent = time.days;
    hours.textContent = time.hours;
    minutes.textContent = time.minutes;
    seconds.textContent = time.seconds;

    intervalInSeconds--;
  }, 1000);
}

// Вычисляем интервал в днях, часах, минутах и секундах
function calculationTime(intervalInSeconds) {
  const seconds = intervalInSeconds % 60;

  const minutes = Math.floor(intervalInSeconds / 60) % 60;

  const hours = Math.floor(intervalInSeconds / 3600) % 24;

  const days = Math.floor(intervalInSeconds / 86400);

  return {
    seconds,
    minutes,
    hours,
    days
  };
}

start.addEventListener("click", () => {
  if (nameControl.value === "") {
    warning.textContent = "Введите название события!";
  } else {
    const setTime = new Date(dateControl.value + " " + timeControl.value);

    const nowTime = new Date();

    if (setTime <= nowTime) {
      warning.textContent = "Введите корректную дату и время!";
    } else {
      warning.textContent = "";
      localStorage.setItem(nameControl.value, setTime);

      intervalInSeconds = Math.floor((setTime - nowTime) / 1000);
      nameTimer.textContent = nameControl.value;

      let timerId = setInterval(() => {
        if (intervalInSeconds <= 0) {
          nameTimer.textContent = nameTimer.textContent + ` - Время вышло!!!`;

          clearInterval(timerId);
        }
        const time = calculationTime(intervalInSeconds);

        days.textContent = time.days;
        hours.textContent = time.hours;
        minutes.textContent = time.minutes;
        seconds.textContent = time.seconds;

        intervalInSeconds--;
      }, 1000);
    }
  }
});
