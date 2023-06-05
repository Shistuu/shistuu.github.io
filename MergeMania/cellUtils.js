export function createCellElements(gridElement,RANDOM_INDEX_X,RANDOM_INDEX_Y, girdSize, level) {
  const CELLS = [];
  for (let i = 0; i < girdSize * girdSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    if( RANDOM_INDEX_X == i % girdSize && RANDOM_INDEX_Y == Math.floor(i / girdSize) && level == 3) {
      cell.classList.add("obstacleBorder");
    }
    CELLS.push(cell);
    gridElement.append(cell);
  }
  return CELLS;
}