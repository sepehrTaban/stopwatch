/*#################### refrencing DOM nodes && declaring variables ###################*/
/*#################### refrencing DOM nodes && declaring variables ###################*/
/*#################### refrencing DOM nodes && declaring variables ###################*/
const stopWatchContainer = document.querySelector('.watch-container');
const mainMinSecSpan = document.querySelector('.min-sec');
const mainMillSpan = document.querySelector('.mill');
const lapMinuteSeconds = document.querySelector('.lap-min-sec');
const lapMill = document.querySelector('.lap-mill');
const lapTable = document.querySelector('.laps-table');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause-resume');
const lapBtn = document.querySelector('.lap-reset');

let mainInterval;
let startTime;
let stopTime;
let pausedTime;

let lapInterval = false;
let lapStart;
let lapStop;
let lapPaused;
let lapCount = 0;



/*############################################*/
startBtn.addEventListener('click', ()=> {
    start();
})
startBtn.addEventListener('touchstart', ()=> {
    start();
})
/**************************************/
pauseBtn.addEventListener('click', ()=> {
    pauseResume();
})
pauseBtn.addEventListener('touchend', ()=> {
    pauseResume();
})
/*************************************/
function start() {

    addClass(startBtn, 'unvisible');
    setTimeout(() => {
        addClass(pauseBtn, 'visible');
        addClass(lapBtn, 'visible');
    }, 500);
    
    startTime = new Date().getTime();
    setStopWatchInterval();
}
/*************************************/
function pauseResume() {
    if (pauseBtn.textContent === 'Pause') {

        pauseBtn.textContent = 'Resume';
        stopTime = new Date().getTime();
        clearInterval(mainInterval);
        return;
    }
    pauseBtn.textContent = 'Pause';
    pausedTime = new Date().getTime() - stopTime;
    startTime += pausedTime;
    setStopWatchInterval(); 


}
/*************************************/
//calculating the time that has passed since clicking or touching start btn
function updateWatch(startingTime, minSecSpan, millSpan) {
    let currentTime = new Date().getTime();
    let diffrence = currentTime - startingTime;

    let millSecs = Math.floor(diffrence / 10);
    let seconds = Math.floor(diffrence / 1000);
    let minutes = Math.floor(diffrence / 1000 / 60);

    let displayMillSecs = millSecs - (seconds * 100);
    let displaySecs = seconds - (minutes * 60);
    let displayMins = (minutes < 10) ? `0${minutes}` : minutes;

    displayMillSecs = (displayMillSecs < 10) ? `0${displayMillSecs}` : displayMillSecs;
    displaySecs = (displaySecs < 10) ? `0${displaySecs}` : displaySecs;

    minSecSpan.textContent = `${displayMins}:${displaySecs}`;
    millSpan.textContent = `:${displayMillSecs}`;
}
/*************************************/
function addClass(element, targetclass) {
    element.classList.add(targetclass);
}
/*************************************/
function setStopWatchInterval(intervalName){
    if(intervalName === 'lap'){
        return;
    }
    mainInterval = setInterval(() => {
        updateWatch(startTime, mainMinSecSpan, mainMillSpan);
    }, 10);
}

