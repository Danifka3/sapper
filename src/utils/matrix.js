import { createBox } from "./box";
import { generateRandom } from "./getRandom";

export let matrix = [];

export function createMatrix(width = 16, height = 16, bombCount = 40) {
  matrix = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 0)
  );

  matrix.forEach((matrixLine, y) => {
    matrixLine.forEach((matrixElem, x) => {
      const newBox = createBox(Boolean(matrixElem), { x, y });

      matrix[y][x] = newBox;
    });
  });
}

//Присваивает 1 местам, где будут стоять бомбы ->
export function addBombs(coordinates, bombCount = 40) {
  let currentBombCount = bombCount;

  const xBox = coordinates.x;
  const yBox = coordinates.y;

  const matrixHeight = matrix.length;
  const matrixWidth = matrix[0].length;

  while (currentBombCount) {
    const x = generateRandom(0, matrixWidth - 1);
    const y = generateRandom(0, matrixHeight - 1);

    if (!matrix[y][x].isBomb && x !== xBox && y !== yBox) {
      matrix[y][x].isBomb = true;
      currentBombCount--;
    }
  }
}
//Получает элементы вокруг заданной клетки ->

export function getAllNeighbors(coordinates) {
  const { x, y } = coordinates;

  const n_1 = matrix[y - 1]?.[x];
  const n_2 = matrix[y - 1]?.[x + 1];
  const n_3 = matrix[y]?.[x + 1];
  const n_4 = matrix[y + 1]?.[x + 1];
  const n_5 = matrix[y + 1]?.[x];
  const n_6 = matrix[y + 1]?.[x - 1];
  const n_7 = matrix[y]?.[x - 1];
  const n_8 = matrix[y - 1]?.[x - 1];

  return [n_1, n_2, n_3, n_4, n_5, n_6, n_7, n_8].filter(
    (item) => typeof item !== "undefined"
  );
}

//Открывает все бомбы ->

export function openAllBombs() {
  matrix.forEach((matrixLine) => {
    matrixLine.forEach((box) => {
      if (box.isBomb) {
        box.open();
      } else {
        box.close();
      }
    });
  });
}

export function setBoxType() {
  let bombCount = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j].isBomb) {
        matrix[i][j].boxElem.classList.add("bomb");
      }
      const allNeighbors = getAllNeighbors(matrix[i][j].coordinates);
      bombCount = 0;

      allNeighbors.forEach((neighbor) => {
        if (neighbor.isBomb || neighbor === 1) {
          // зачем здесь 2 свойства?
          bombCount++;
        }
      });
      if (bombCount) {
        matrix[i][j].setBoxValue(bombCount);
      }
    }
  }
}

//Наполняет матрицу боксами ->

/* 
1) создает матрицу нулей
2) радомно заполняет нужное кол-во мест единицами
3)
*/
