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
    navList.forEach((l) => l.classList.remove("on"));
    li.classList.add("on");
  });
});

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;
  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const targetLink = document.querySelector(
      `.nav__list a[href*=${sectionId}]`,
    );
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navList.forEach((l) => {
        l.classList.remove("on");
      });
      if (targetLink) {
        targetLink.parentElement.classList.add("on");
      }
    }
  });
});
