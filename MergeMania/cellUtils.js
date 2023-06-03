import { GRID_SIZE } from "./Grid.js";
export function createCellElements(gridElement) {
    const cells = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cells.push(cell);
      gridElement.append(cell);
    }
    return cells;
  }