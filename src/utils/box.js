import {growFlag, decreaseFlag, growTime, startBtn} from '..';
import { getAllNeighbors, openAllBombs, addBombs, setBoxType } from "./matrix";

localStorage.setItem("gameCondition", '-1');
const appElem = document.getElementById("app");
export let timer;
let win = 0;

class Box {
  constructor(isBomb, coordinates) {
    this.isBomb = isBomb;
    this.coordinates = coordinates;
  }

  open() {
    this.isOpenned = true;
    this.boxElem.classList.remove("initial");
    this.boxElem.classList.remove("question");
    this.boxElem.classList.add(`bomb-count-${this.value}`);
    if (this.boxElem.classList.contains("flag")) {
      if (this.boxElem.classList.contains("bomb")) {
        this.boxElem.classList.add("bomb--defused");
        this.boxElem.classList.remove("flag");
      } else {
        this.boxElem.classList.remove("flag");
      }
    }
  }

  close() {
    this.isOpenned = true;
  }

  createBoxOnArea() {
    const boxElem = document.createElement("div");
    boxElem.classList.add("box");
    boxElem.classList.add("initial");

    this.boxElem = boxElem;
    this.boxElem.addEventListener("click", () => this.onBoxClick());
    this.boxElem.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      this.setFlag(this.isFlagged);
    });

    this.boxElem.addEventListener("mousedown", (event) => {
      if (!this.boxElem.classList.contains('flag')){
      this.boxElem.classList.add('click');
      startBtn.classList.add('scared');
      }
    });
    this.boxElem.addEventListener("mouseup", (event) => {
      this.boxElem.classList.remove('click');
      startBtn.classList.remove('scared');
    });
    this.boxElem.addEventListener("mouseout", (event) => {
      this.boxElem.classList.remove('click');
      startBtn.classList.remove('scared');
    });
    appElem.appendChild(boxElem);
  }

  onBoxClick(allowOpenNumber = false) {
    if (localStorage.getItem("gameCondition") === "0") {
      addBombs(this.coordinates);
      clearInterval(timer);
      timer = setInterval(growTime, 1000);
      setBoxType();
      localStorage.gameCondition = 1;
    }
    if (localStorage.getItem("gameCondition") !== "-1") {
      if (allowOpenNumber){
        this.boxElem.classList.remove('flag');
      }
      if ((!this.value || this.value === '0') && !this.isOpenned && !this.isBomb && !this.boxElem.classList.contains('flag')) {
        this.open();
        const allNeighbors = getAllNeighbors(this.coordinates);
        allNeighbors.forEach((neighbor) => {
          if (!neighbor.isOpenned) {
            neighbor.onBoxClick(true);
          }
        });
      } else if (
          (!this.isBomb &&
              this.value && this.value !== '0' &&
              allowOpenNumber &&
              !this.boxElem.classList.contains("flag")) ||
          (typeof this.value === "number" && this.value !== '0' &&
              !this.isBomb &&
              !this.boxElem.classList.contains("flag"))
      ) {
        this.open();
      } else if (this.isBomb && !this.boxElem.classList.contains("flag")) {
        openAllBombs(this.coordinates);
        startBtn.classList.add('wasted');
        localStorage.gameCondition = -1;
      }
      if (win >= 40){
        openAllBombs(this.coordinates);
        startBtn.classList.add('win');
        win = 0;
        localStorage.gameCondition = -1;
      }
    }
  }

  setFlag(isFlagged) {
    if (localStorage.getItem("gameCondition") !== "-1") {
      if (!isFlagged && this.boxElem.classList.contains("initial")) {
        this.boxElem.classList.add("flag");
        this.isFlagged = !isFlagged;
        decreaseFlag();
        if (this.isBomb === true){
          win++;
        }
      } else if (
          isFlagged &&
          !this.boxElem.classList.contains("question") &&
          this.boxElem.classList.contains("initial")
      ) {
        this.boxElem.classList.add("question");
        this.boxElem.classList.remove("flag");
        growFlag();
        if (this.isBomb === true){
          win--;
        }
      } else {
        this.boxElem.classList.remove("question");
        this.isFlagged = !isFlagged;
      }
      if (win >= 40){
        openAllBombs(this.coordinates);
        startBtn.classList.add('win');
        win = 0;
        localStorage.gameCondition = -1;
      }
    }
  }
}


export function createBox(isBomb, coordinates) {
  const newBox = new Box(isBomb, coordinates);
  newBox.createBoxOnArea();

  return newBox;
}
