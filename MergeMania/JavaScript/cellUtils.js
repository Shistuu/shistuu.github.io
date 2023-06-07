export function createCellElements(gridElement,RANDOM_INDEX, girdSize, level) {
  const CELLS = [];
  for (let i = 0; i < girdSize * girdSize; i++) { //loop runs for each cell position in the grid
    const cell = document.createElement("div");
    cell.classList.add("cell");
    for(const element of RANDOM_INDEX){
      const coordinates = element;
      if( coordinates[0] == i % girdSize && coordinates[1] == Math.floor(i / girdSize) && level == 3) {
        cell.classList.add("obstacleBorder");
        break;
      }
    }
    CELLS.push(cell);
    gridElement.append(cell);
  }
  return CELLS;
}