import { createMatrix } from "./utils/matrix";

const timeList = document.querySelector("#time-list");
const startBtn = document.querySelector("#start-btn");
const bombList = document.querySelector("#bomb-count");
let time;
let flagsCount;
let timer;

function startGame() {
  createMatrix();
}

startBtn.addEventListener("click", (event) => {
  time = 0;
  flagsCount = 40;
  openGame();
  if (localStorage.getItem("gameCondition") !== "-1") {
    localStorage.gameCondition = "1";
  }
});

function growTime() {
  if (localStorage.getItem("gameCondition") !== "-1") {
    let current = ++time;
    if (current < 10) {
      timeList.innerHTML = `00:0${time}`;
    } else timeList.innerHTML = `00:${time}`;
  }
}

function openGame() {
  timer = setInterval(growTime, 1000);
  startGame();
}

export function decreaseFlag() {
  if (localStorage.getItem("gameCondition") !== "-1") {
    let current = --flagsCount;
    if (current < 10) {
      bombList.innerHTML = `0${flagsCount}`;
    } else bombList.innerHTML = `${flagsCount}`;
  }
}

export function growFlag() {
  if (localStorage.getItem("gameCondition") !== "-1") {
    let current = ++flagsCount;
    if (current < 10) {
      bombList.innerHTML = `0${flagsCount}`;
    } else bombList.innerHTML = `${flagsCount}`;
  }
}
