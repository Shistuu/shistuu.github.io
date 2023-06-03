import { createCellElements } from "./cellUtils.js";
import Cell from "./Cell.js";

export const GRID_SIZE = 4;
export const TILE = 15;
export const GAP = 2.5;

export default class Grid {
  #cells;

  constructor(gridElement, gridSize = GRID_SIZE) {
    gridElement.style.setProperty("--grid-size", gridSize);
    gridElement.style.setProperty("--cell-size", `${TILE}vh`);
    gridElement.style.setProperty("--cell-gap", `${GAP}vh`);
    this.#cells = createCellElements(gridElement).map((cellElement, index) => {
      return new Cell(
        cellElement,
        index % GRID_SIZE,
        Math.floor(index / GRID_SIZE)
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