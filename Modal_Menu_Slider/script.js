const toggle = document.querySelector("#toggle");
const close = document.querySelector("#close");
const open = document.querySelector("#open");
const modal = document.querySelector("#modal-container");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

open.addEventListener("click", (event) => {
  modal.classList.add("show-modal");
});

close.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

window.addEventListener("click", (event) => {
  event.target == modal ? modal.classList.remove("show-modal") : false;
});
