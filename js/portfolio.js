"use strict";
document.documentElement.classList.add("js");
const menu = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
if (menu && navigation) {
  menu.hidden = false;
  const closeMenu = () => {
    menu.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  };
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    navigation.classList.toggle("is-open", open);
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menu.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu();
      menu.focus();
    }
  });
  window.matchMedia("(min-width: 801px)").addEventListener("change", closeMenu);
}
const thoughts = [
  "My most reliable distributed system is a group chat deciding where to eat. Just kidding. It never reaches consensus.",
  "A recipe is just an algorithm with more generous error margins. Usually.",
  "I believe in graceful degradation. Especially before the first cup of tea.",
  "“It depends” is a complete answer. The interesting part is figuring out what it depends on.",
  "Some people collect souvenirs. I also collect tabs I am definitely going to read.",
];
let thoughtIndex = 0;
const thoughtButton = document.querySelector("#new-aside");
if (thoughtButton) {
  thoughtButton.hidden = false;
  thoughtButton.addEventListener("click", () => {
    thoughtIndex = (thoughtIndex + 1) % thoughts.length;
    document.querySelector("#aside-text").textContent = thoughts[thoughtIndex];
  });
}
const copyButton = document.querySelector("#copy-email");
if (copyButton && navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    const status = document.querySelector("#copy-status");
    try {
      await navigator.clipboard.writeText("shiss@uoregon.edu");
      status.textContent = "Email copied.";
    } catch {
      status.textContent =
        "Please select the address to copy it, or click it to send an email.";
    }
  });
}
document.querySelector("#year").textContent = String(new Date().getFullYear());
