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
    
    // Create the grid cells by calling the createCellElements function,
    // map them to Cell objects, and assign them to the private #cells property
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
    // Getter for the cells property
  get cells() {
    return this.#cells;
  }

  // Getter for the cells grouped by rows
  get Row() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.y] = cellGrid[cell.y] || [];
      cellGrid[cell.y][cell.x] = cell;
      return cellGrid;
    }, []);
  }

  // Getter for the cells grouped by columns
  get Column() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || [];
      cellGrid[cell.x][cell.y] = cell;
      return cellGrid;
    }, []);
  }

    // Getter for the empty cells in the grid
  get #emptyCells() {
    return this.#cells.filter((cell) => cell.tile == null);
  }
  // Method to get a random empty cell from the grid
  randomEmptyCell() {
    const RANDOM_INDEX = Math.floor(Math.random() * this.#emptyCells.length);
    return this.#emptyCells[RANDOM_INDEX];
  }
}