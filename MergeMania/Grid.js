import { createCellElements } from "./cellUtils.js";
import Cell from "./Cell.js";

// export const gridSize = 4;
export const TILE = 15;
export const GAP = 2.5;

export default class Grid {
  #cells;
  #RANDOM_INDEX_X;
  #RANDOM_INDEX_Y;

  constructor(gridElement, gridSize, level) {
    gridElement.style.setProperty("--grid-size", gridSize);
    gridElement.style.setProperty("--cell-size", `${TILE}vh`);
    gridElement.style.setProperty("--cell-gap", `${GAP}vh`);
    this.#RANDOM_INDEX_X = Math.floor(Math.random() * gridSize);
    this.#RANDOM_INDEX_Y = Math.floor(Math.random() * gridSize);
    this.#cells = createCellElements(gridElement,this.#RANDOM_INDEX_X,this.#RANDOM_INDEX_Y,gridSize,level).map((cellElement, index) => {
      return new Cell(
        index % gridSize,
        Math.floor(index / gridSize),
        this.#RANDOM_INDEX_X,
        this.#RANDOM_INDEX_Y,
        level
      );
    });
  }
  get cells() {
    return this.#cells;
  }

  get Row() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.y] = cellGrid[cell.y] || [];
      cellGrid[cell.y][cell.x] = cell;
      return cellGrid;
    }, []);
  }

  get Column() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || [];
      cellGrid[cell.x][cell.y] = cell;
      return cellGrid;
    }, []);
  }

  get #emptyCells() {
    return this.#cells.filter((cell) => cell.tile == null);
  }

  randomEmptyCell() {
    const RANDOM_INDEX = Math.floor(Math.random() * this.#emptyCells.length);
    return this.#emptyCells[RANDOM_INDEX];
  }
}