import {createMatrix, clearField} from './utils/matrix';
import {timer} from './utils/box';

export const startBtn = document.querySelector("#start-btn");

const bcount1 = document.querySelector("#bcount1");
const bcount2 = document.querySelector("#bcount2");

const time1 = document.querySelector("#time1");
const time2 = document.querySelector("#time10");
const time3 = document.querySelector("#time100");

let time;
export let flagsCount;


openGame();

startBtn.addEventListener("click", (event) => {
  clearInterval(timer);
  time = 0;
  flagsCount = 40;
  for (let i = 0; i < 10; i++){
    bcount1.classList.remove(`bcount${i}`);
    bcount2.classList.remove(`bcount${i}`);
    time1.classList.remove(`bcount${i}`);
    time2.classList.remove(`bcount${i}`);
    time3.classList.remove(`bcount${i}`);
  }
  bcount1.classList.add(`bcount${flagsCount/10%10}`);
  bcount2.classList.add(`bcount${flagsCount%10}`);
  time1.classList.add(`bcount`);
  time2.classList.add(`bcount`);
  time3.classList.add(`bcount`);
  clearField();
  localStorage.gameCondition = 0;
});

startBtn.addEventListener("mousedown", (event) => {
  startBtn.classList.remove('wasted');
  startBtn.classList.remove('win');
  startBtn.classList.add('smile--clicked');
});
startBtn.addEventListener("mouseup", (event) => {
  startBtn.classList.remove('smile--clicked');
});

export function growTime() {
  if (localStorage.getItem("gameCondition") !== "-1") {
    let current = ++time;
    if (current < 10) {
      time3.classList.add(`bcount${time%10}`);
    } else if (current < 100) {
      for (let i = 0; i < 10; i++){
        time3.classList.remove(`bcount${i}`);
      }
      time2.classList.add(`bcount${Math.floor(time/10%10)}`);
      time3.classList.add(`bcount${time%10}`);
    }else {
      for (let i = 0; i < 10; i++){
        time2.classList.remove(`bcount${i}`);
        time3.classList.remove(`bcount${i}`);
      }
      time1.classList.add(`bcount${Math.floor(time/100%10)}`);
      time2.classList.add(`bcount${Math.floor(time/10%10)}`);
      time3.classList.add(`bcount${time%10}`);
    }
  }
}

function openGame() {
  createMatrix();
}

export function decreaseFlag() {
  if (localStorage.getItem("gameCondition") !== "-1") {
    let current = --flagsCount;
    if (current > -1) {
      if (current < 10) {
        bcount1.classList.remove(`bcount1`);
        for (let i = 0; i < 10; i++){
          bcount2.classList.remove(`bcount${i}`);
        }
        bcount2.classList.add(`bcount${flagsCount%10}`);
      } else {
        for (let i = 0; i < 10; i++){
          bcount1.classList.remove(`bcount${i}`);
          bcount2.classList.remove(`bcount${i}`);
        }
        bcount1.classList.add(`bcount${Math.floor(flagsCount/10%10)}`);
        bcount2.classList.add(`bcount${flagsCount%10}`);
      }
    }
  }
}

export function growFlag() {
  if (localStorage.getItem("gameCondition") !== "-1") {
    let current = ++flagsCount;
    if (current > -1) {
      if (current < 10) {
        for (let i = 0; i < 10; i++){
          bcount2.classList.remove(`bcount${i}`);
        }
        bcount2.classList.add(`bcount${flagsCount%10}`);
      } else {
        for (let i = 0; i < 10; i++){
          bcount1.classList.remove(`bcount${i}`);
          bcount2.classList.remove(`bcount${i}`);
        }
        bcount1.classList.add(`bcount${Math.floor(flagsCount/10%10)}`);
        bcount2.classList.add(`bcount${flagsCount%10}`);
      }
    }
  }
}


