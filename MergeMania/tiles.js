export default class Tile {
  constructor(tileContainer, value = Math.random() > 0.5 ? 2 : 4) {
    this.tileElement = document.createElement("div");
    this.tileElement.classList.add("tile");
    this.tileElement.dataset.value = value;
    tileContainer.append(this.tileElement);
    this.value = value;
  }

  get value() {
    return this._value;
  }

  set value(v) {
    this._value = v;
    this.tileElement.textContent = this.value;
    this.updateTileBackground();
  }

  set x(value) {
    this._x = value;
    this.tileElement.style.setProperty("--x", value);
  }

  set y(value) {
    this._y = value;
    this.tileElement.style.setProperty("--y", value);
  }

  remove() {
    this.tileElement.remove();
  }

  waitForTransition(animation = false) {
    //returns a Promise that resolves when a transition or animation event is triggered
    return new Promise((resolve) => {
      const eventName = animation ? "animationend" : "transitionend";
      this.tileElement.addEventListener(eventName, resolve, { once: true });
    });
  }
  //updates the color of the tiles
  updateTileBackground() {
    const colors = {
      2: "#800080",
      4: "#f08080",
      8: "#ffd700",
      16: "#008000",
      32: "#00ced1",
      64: "#ff1493",
      128: "#b22222",
      256: "#cd853f",
      512: "#008080",
      1024: "#9acd32",
      2048: "#191970",
    };
    const backgroundColor = colors[this.value] || "#444444";
    this.tileElement.style.backgroundColor = backgroundColor;
  }
}
