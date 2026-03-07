gsap.registerPlugin(ScrollTrigger);

/* ===============================
   GLOBAL GSAP SETTINGS
================================ */

gsap.config({
  force3D: true,
  nullTargetWarn: false
});

ScrollTrigger.defaults({
  start: "top 85%",
  toggleActions: "play none none reverse"
});

/* ===============================
   REUSABLE ANIMATION FUNCTION
================================ */

function reveal(target, trigger, fromVars = {}) {
  gsap.from(target, {
    opacity: 0,
    duration: 1,
    y: 40,
    stagger: 0.15,
    ease: "power3.out",
    immediateRender: false,
    ...fromVars,
    scrollTrigger: {
      trigger: trigger
    }
  });
}

/* ===============================
   HEADER
================================ */

gsap.from(".header", {
  y: -60,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

/* ===============================
   HERO / HOME
================================ */

reveal(".home__content > *", "#home", {
  xPercent: -20
});

gsap.from(".home__img img", {
  scrollTrigger: {
    trigger: "#home"
  },
  scale: 0.8,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out"
});

/* ===============================
   STATS
================================ */

reveal(".stats__item", ".stats", {
  y: 60
});

/* ===============================
   ABOUT
================================ */

reveal(".about__content > *", "#about", {
  xPercent: 20
});

gsap.from(".about__image img", {
  scrollTrigger: {
    trigger: "#about"
  },
  xPercent: -20,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

/* ===============================
   EDUCATION / EXPERIENCE
================================ */

reveal(".education li", "#about", { y: 30 });
reveal(".experience li", "#about", { y: 30 });

/* ===============================
   SKILLS PROGRESS
================================ */

document.querySelectorAll(".fill").forEach((bar) => {

  const level = bar.dataset.level;

  gsap.fromTo(bar,
    { width: "0%" },
    {
      width: level,
      duration: 1.6,
      ease: "power4.out",
      scrollTrigger: {
        trigger: bar,
        start: "top 90%"
      }
    }
  );

});

/* ===============================
   SERVICES
================================ */

reveal(".service__card", "#service", {
  y: 80,
  scale: 0.95
});

/* ===============================
   PORTFOLIO (AWARD STYLE)
================================ */

gsap.from(".work__card", {
  scrollTrigger: {
    trigger: "#work"
  },
  opacity: 0,
  scale: 0.85,
  y: 60,
  stagger: 0.2,
  duration: 1,
  ease: "power3.out"
});

/* ===============================
   TESTIMONIAL
================================ */

reveal(".testimonial__card", "#testimonials", {
  xPercent: 20
});

/* ===============================
   BLOG
================================ */

reveal(".blog__card", "#blog", {
  y: 80
});

/* ===============================
   CONTACT
================================ */

reveal(".my__info > *", "#contact", {
  xPercent: -20
});

reveal(".form__container", "#contact", {
  xPercent: 20
});

/* ===============================
   FOOTER
================================ */

reveal(".main__footer > *", ".main__footer", {
  y: 30
});

/* ===============================
   NAV MENU
================================ */

const navBar = document.querySelector(".nav__bar");
const openMenu = document.querySelector(".open__menu");
const closeMenu = document.querySelector(".close__menu");

openMenu?.addEventListener("click", () => {
  navBar.classList.add("active");
});

closeMenu?.addEventListener("click", () => {
  navBar.classList.remove("active");
});

/* ===============================
   ACTIVE NAV LINK (CLICK)
================================ */

const navList = document.querySelectorAll(".nav__list");

navList.forEach((li) => {

  li.addEventListener("click", () => {

    navList.forEach((l) => l.classList.remove("on"));
    li.classList.add("on");

  });

});

/* ===============================
   ACTIVE NAV LINK (SCROLL)
================================ */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

  const scrollY = window.pageYOffset;

  sections.forEach((section) => {

    const height = section.offsetHeight;
    const top = section.offsetTop - 120;
    const id = section.getAttribute("id");

    const link = document.querySelector(`.nav__list a[href*=${id}]`);

    if (scrollY > top && scrollY <= top + height) {

      navList.forEach((l) => l.classList.remove("on"));

      link?.parentElement.classList.add("on");

    }

  });

});

/* ===============================
   EMAIL JS
================================ */

(function () {
  emailjs.init("WN9DblXeSQwklnIu6");
})();

const form = document.querySelector(".form__container form");

form?.addEventListener("submit", async function (e) {

  e.preventDefault();

  const name = this.querySelector('[name="form__name"]').value.trim();
  const email = this.querySelector('[name="form__email"]').value.trim();
  const message = this.querySelector('[name="form__message"]').value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  removeError();

  if (!name) return showError("Name required");
  if (!emailPattern.test(email)) return showError("Valid email required");
  if (!message) return showError("Message required");

  const btn = this.querySelector("button");

  const original = btn.innerText;

  btn.innerText = "Sending...";
  btn.disabled = true;

  try {

    await emailjs.sendForm("service_60ywxq7","template_28fcynh",this);

    alert("Message sent successfully!");
    this.reset();

  } catch {

    showError("Failed to send message.");

  } finally {

    btn.innerText = original;
    btn.disabled = false;

  }

});

/* ===============================
   FORM ERROR
================================ */

function showError(msg){

  const p = document.createElement("p");

  p.className = "form-error-msg";
  p.innerText = msg;

  p.style.color = "red";
  p.style.marginTop = "6px";
  p.style.fontSize = "14px";

  form.appendChild(p);

}

function removeError(){

  const err = document.querySelector(".form-error-msg");

  if(err) err.remove();

}

/* ===============================
   REFRESH
================================ */

window.addEventListener("load", () => {

  ScrollTrigger.refresh();

});