"use strict";

// Dark by default; the button switches to light and remembers the choice.
const themeToggle = document.querySelector("#theme-toggle");

if (themeToggle) {
  const root = document.documentElement;
  const label = () => {
    const light = root.dataset.theme === "light";
    themeToggle.textContent = light ? "Dark mode" : "Light mode";
    themeToggle.setAttribute("aria-pressed", String(light));
  };
  themeToggle.hidden = false;
  themeToggle.addEventListener("click", () => {
    const light = root.dataset.theme !== "light";
    if (light) root.dataset.theme = "light";
    else delete root.dataset.theme;
    try {
      localStorage.setItem("theme", light ? "light" : "dark");
    } catch (e) {}
    label();
  });
  label();
}

// Smaran demo: pick a range of versions and compare proof sizes.
const versions = document.querySelector("#versions");
const result = document.querySelector("#range-result");
const naiveBar = document.querySelector("#bar-naive");
const naiveValue = document.querySelector("#bar-naive-value");

if (versions && result && naiveBar && naiveValue) {
  const buttons = [...versions.querySelectorAll("button")];
  let start = 1;
  let end = 4;
  let picking = false;

  const render = () => {
    const lo = Math.min(start, end);
    const hi = Math.max(start, end);
    const count = hi - lo + 1;
    buttons.forEach((button, i) => {
      const inRange = i >= lo && i <= hi;
      button.classList.toggle("hit", inRange);
      button.setAttribute("aria-pressed", String(inRange));
    });
    naiveBar.style.width = `${(count / buttons.length) * 100}%`;
    naiveValue.textContent = `${count} proof${count === 1 ? "" : "s"}`;
    result.textContent = picking
      ? `Starting at v${lo + 1}. Now pick where to stop.`
      : `Bob’s keys from v${lo + 1} to v${hi + 1}: ${count} version${count === 1 ? "" : "s"} come back. ` +
        "Checking them one by one takes a proof each. Smaran’s proof stays the same size.";
  };

  buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
      if (picking) {
        end = i;
        picking = false;
      } else {
        start = end = i;
        picking = true;
      }
      render();
    });
  });

  render();
}

// HotSwap demo: updating any value makes its whole group's proofs stale.
const groups = document.querySelector("#groups");
const groupsResult = document.querySelector("#groups-result");
const burst = document.querySelector("#burst");
const reset = document.querySelector("#reset");

if (groups && groupsResult && burst && reset) {
  const GROUPS = 4;
  const SLOTS = 4;
  const busy = new Set([1, 6, 11, 12]);
  const stale = new Set();
  let updates = 0;

  const render = () => {
    [...groups.children].forEach((group, g) =>
      group.classList.toggle("stale", stale.has(g)),
    );
    if (updates === 0) {
      groupsResult.textContent =
        "The filled values are the busy ones. Click any value to change it.";
      return;
    }
    groupsResult.textContent =
      `${updates} update${updates === 1 ? "" : "s"}, ` +
      `${stale.size * SLOTS} of 16 proofs to recompute.`;
  };

  const update = (i) => {
    updates += 1;
    stale.add(Math.floor(i / SLOTS));
    render();
  };

  for (let g = 0; g < GROUPS; g++) {
    const group = document.createElement("div");
    group.className = "group";
    for (let s = 0; s < SLOTS; s++) {
      const i = g * SLOTS + s;
      const slot = document.createElement("button");
      slot.type = "button";
      slot.className = busy.has(i) ? "hot" : "";
      slot.setAttribute(
        "aria-label",
        `Change value ${i + 1}${busy.has(i) ? " (busy)" : ""}`,
      );
      slot.addEventListener("click", () => update(i));
      group.append(slot);
    }
    groups.append(group);
  }

  burst.addEventListener("click", () => busy.forEach(update));
  reset.addEventListener("click", () => {
    updates = 0;
    stale.clear();
    render();
  });

  render();
}
