// Munu toggle system
const navBar = document.querySelector(".nav__bar");
const openMenu = document.querySelector(".open__menu");
const closeMenu = document.querySelector(".close__menu");

openMenu.addEventListener("click", () => {
  navBar.classList.add("active");
});
closeMenu.addEventListener("click", () => {
  navBar.classList.remove("active");
});

//Active bar changes
const navList = document.querySelectorAll(".nav__list");
navList.forEach((li) => {
  li.addEventListener("click", (e) => {
    e.preventDefault();
    navList.forEach((li) => li.classList.remove("on"));
    li.classList.add("on");
  });
});

