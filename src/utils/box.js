import { growFlag, decreaseFlag } from "..";
import { getAllNeighbors, openAllBombs, addBombs, setBoxType } from "./matrix";

localStorage.setItem("gameCondition", 0);
const appElem = document.getElementById("app");

class Box {
  //конструктор бомбы
  constructor(isBomb, coordinates) {
    this.isBomb = isBomb;
    this.coordinates = coordinates;
  }

  //когда открываются поля, их все еще перекрывают флажки
  setFlag(isFlagged) {
    if (localStorage.getItem("gameCondition") !== "-1") {
      if (!isFlagged && this.boxElem.classList.contains("initial")) {
        this.boxElem.classList.add("flag");
        this.isFlagged = !isFlagged;
        decreaseFlag();
      } else if (
        isFlagged &&
        !this.boxElem.classList.contains("question") &&
        this.boxElem.classList.contains("initial")
      ) {
        this.boxElem.classList.add("question");
        this.boxElem.classList.remove("flag");
        growFlag();
      } else {
        this.boxElem.classList.remove("question");
        this.isFlagged = !isFlagged;
      }
    }
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

  onBoxClick(allowOpenNumber = false) {
    if (localStorage.getItem("gameCondition") === "0") {
      addBombs(this.coordinates);
      setBoxType();
      localStorage.gameCondition = 1;
    }
    if (localStorage.getItem("gameCondition") !== "-1") {
      if (!this.value && !this.isOpenned && !this.isBomb) {
        this.open();
        const allNeighbors = getAllNeighbors(this.coordinates);
        allNeighbors.forEach((neighbor) => {
          if (!neighbor.isOpenned) {
            neighbor.onBoxClick(true);
          }
        });
      } else if (
        (!this.isBomb &&
          this.value &&
          allowOpenNumber &&
          !this.boxElem.classList.contains("flag")) ||
        (typeof this.value === "number" &&
          !this.isBomb &&
          !this.boxElem.classList.contains("flag"))
      ) {
        this.open();
      } else if (this.isBomb && !this.boxElem.classList.contains("flag")) {
        openAllBombs();
        localStorage.gameCondition = -1;
      }
    }
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
    appElem.appendChild(boxElem);
  }

  setBoxValue(value) {
    this.value = value;
  }
}

//создает бокс

export function createBox(isBomb, coordinates) {
  const newBox = new Box(isBomb, coordinates);
  newBox.createBoxOnArea();

  return newBox;
}
