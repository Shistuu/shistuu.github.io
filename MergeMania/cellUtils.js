import { GRID_SIZE } from "./Grid.js";
export function createCellElements(gridElement) {
    const CELLS = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      CELLS.push(cell);
      gridElement.append(cell);
    }
    return CELLS;
  }