/*#################### refrencing DOM nodes && declaring variables ###################*/
/*#################### refrencing DOM nodes && declaring variables ###################*/
/*#################### refrencing DOM nodes && declaring variables ###################*/
const stopWatchContainer = document.querySelector('.watch-container');
const mainMinuteSeconds = document.querySelector('.min-sec');
const mainMill = document.querySelector('.mill');
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

