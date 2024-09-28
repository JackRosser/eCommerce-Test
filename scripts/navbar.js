// funzione per accendere e spegnere la lente al click
const main = document.querySelector("main");
const navBar = document.getElementById("navbar");
const searchLens = document.getElementById("lens");
const searchBar = document.getElementById("searchbar");

searchBar.addEventListener("click", function () {
  searchLens.classList.add("text-dark");
});

main.addEventListener("click", function () {
  searchLens.classList.remove("text-dark");
});
