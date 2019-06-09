const dateControl = document.querySelector('input[type="date"]');
const timeControl = document.querySelector('input[type="time"]');
const nameControl = document.querySelector('input[type="text"]');
const start = document.querySelector('#start');

const date = new Date();

const month = (date.getMonth()+1 < 10) ? ('0' + (date.getMonth()+1)) : ('' + (date.getMonth()+1));
const day = (date.getDate() < 10) ? ('0' + date.getDate()) : ('' + date.getDate());
const hours = (date.getHours() < 10) ? ('0' + date.getHours()) : ('' + date.getHours());
const minutes = (date.getMinutes() < 10) ? ('0' + date.getMinutes()) : ('' + date.getMinutes());
const seconds = (date.getSeconds() < 10) ? ('0' + date.getSeconds()) : ('' + date.getSeconds());


dateControl.value = date.getFullYear()+'-'+ month +'-'+day;
timeControl.value = hours + ':' + minutes + ':' + seconds;


start.addEventListener('click', () => {
    console.log(Math.floor((+new Date(dateControl.value + ' ' + timeControl.value) - new Date())/1000) % 60);
})
