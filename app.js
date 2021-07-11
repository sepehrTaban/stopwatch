/*#################### refrencing DOM nodes && declaring variables ###################*/
/*#################### refrencing DOM nodes && declaring variables ###################*/
/*#################### refrencing DOM nodes && declaring variables ###################*/
const stopWatchContainer = document.querySelector('.watch-container');
const mainMinSecSpan = document.querySelector('.min-sec');
const mainMillSpan = document.querySelector('.mill');
const lapMinSecSpan = document.querySelector('.lap-min-sec');
const lapMillSpan = document.querySelector('.lap-mill');
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

let movedUp = false;
let isLandscape = window.innerWidth > window.innerHeight;
window.addEventListener('resize', () =>{
    isLandscape = window.innerWidth > window.innerHeight;
})


/*############################################*/
startBtn.addEventListener('click', () => {
    start();

    if (isLandscape) {
        addClass(lapBtn, 'hovarable')
        addClass(pauseBtn, 'hovarable')
        
    } else {
        removeClass(lapBtn, 'hovarable')
        removeClass(pauseBtn, 'hovarable')
        
    }
})
/**************************************/
pauseBtn.addEventListener('click', () => {
    pauseResume();
    if(!isLandscape){
        addClass(pauseBtn, 'touched');
        
        setTimeout(() => {
            removeClass(pauseBtn, 'touched');
        }, 300);

    }
})
/**************************************/
lapBtn.addEventListener('click', () => {
    lapReset();
    if(!isLandscape){
        addClass(lapBtn, 'touched');
        
        setTimeout(() => {
            removeClass(lapBtn, 'touched');
        }, 300);

    }
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
        lapBtn.textContent = 'Reset';
        stopTime = new Date().getTime();
        clearInterval(mainInterval);
        if (lapCount) {
            lapStop = new Date().getTime();
            clearInterval(lapInterval);
        }
        return;
    }
    //if pauseBtn.textContent === 'Resume'
    pauseBtn.textContent = 'Pause';
    lapBtn.textContent = 'Lap';
    pausedTime = new Date().getTime() - stopTime;
    startTime += pausedTime;

    if (lapCount) {
        lapPaused = new Date().getTime() - lapStop;
        lapStart += lapPaused;
        setStopWatchInterval('lap');
    }
    setStopWatchInterval();


}
/*************************************/
function lapReset() {
    if (lapBtn.textContent === 'Lap') {
        if (lapInterval) clearInterval(lapInterval);

        lapStart = new Date().getTime();
        setStopWatchInterval('lap');

        updateLapTable();
        return;
    }
    //if lapBtn.textContent === 'Reset'
    reset();

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
/**************************************/
function updateLapTable() {
    let mainText = mainMinSecSpan.textContent + mainMillSpan.textContent;
    let lapText = lapMinSecSpan.textContent + lapMillSpan.textContent;
    lapCount++;

    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    td1.textContent = (lapCount > 9) ? lapCount : `0${lapCount}`;
    td2.textContent = mainText;
    td3.textContent = (lapCount > 1) ? lapText : mainText;

    if (!movedUp) {
        addClass(stopWatchContainer, 'move-up');

        setTimeout(() => {
            lapTable.insertBefore(tr, lapTable.firstChild);
            setTimeout(() => {
                addClass(tr, 'shown');
            }, 200);

        }, 300);

        movedUp = true;
        return;
    }

    lapTable.insertBefore(tr, lapTable.firstChild);
    setTimeout(() => {
        addClass(tr, 'shown');
    }, 200);

}
function reset() {
    lapCount = 0;
    while (lapTable.firstChild)
        lapTable.removeChild(lapTable.firstChild);

    removeClass(pauseBtn, 'visible');
    removeClass(lapBtn, 'visible');
    pauseBtn.textContent = 'Pause';
    lapBtn.textContent = 'Lap';
    mainMinSecSpan.textContent = '00:00';
    mainMillSpan.textContent = ':00';

    lapMinSecSpan.textContent = '';
    lapMillSpan.textContent = '';

    setTimeout(() => {
        removeClass(stopWatchContainer, 'move-up');
        removeClass(startBtn, 'unvisible');
    }, 300);
    movedUp = false;


}
/*************************************/
function addClass(element, targetclass) {
    element.classList.add(targetclass);
}
function removeClass(element, targetclass) {
    element.classList.remove(targetclass);
}
/*************************************/
function setStopWatchInterval(intervalName) {
    if (intervalName === 'lap') {
        lapInterval = setInterval(() => {
            updateWatch(lapStart, lapMinSecSpan, lapMillSpan);
        }, 10);
        return;
    }
    mainInterval = setInterval(() => {
        updateWatch(startTime, mainMinSecSpan, mainMillSpan);
    }, 10);
}

