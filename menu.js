const html = document.querySelector("html");
const menuButton = document.querySelector(".mobile-menu-button");
const swipeMenu = document.querySelector(".swipe-menu");
const swipeMenuScrollItem = swipeMenu && swipeMenu.querySelector(".swipe-menu__scroll-item")

function closeMenu() {
  swipeMenu.style.transition = "all 0.3s ease";

  html.style.overflow = "visible";
  menuButton.classList.remove("--active");
  swipeMenu.classList.remove("--active");

  swipeMenu.style.transform = 'translateY(150%)';

  setTimeout(() => {
    swipeMenu.style.transition = "none";
  }, 300)
}

menuButton.addEventListener("click", () => {
  swipeMenu.style.transition = "all 0.3s ease";

  if (html.style.overflow === "hidden") {
    html.style.overflow = "visible";
    swipeMenu.style.transform = 'translateY(150%)';
  } else {
    html.style.overflow = "hidden";
    swipeMenu.style.transform = 'translateY(0%)';
  }

  menuButton.classList.toggle("--active");
  swipeMenu.classList.toggle("--active");

  setTimeout(() => {
    swipeMenu.style.transition = "none";
  }, 300)
})

let touchstartY = 0;
let movedY = 0;
let touchendY = 0;

if (swipeMenu) {
  swipeMenuScrollItem.addEventListener('touchstart', function (event) {
    touchstartY = event.changedTouches[0].screenY;
  }, false)

  swipeMenuScrollItem.addEventListener('touchmove', function (event) {
    movedY = event.changedTouches[0].screenY;

    if ((movedY - touchstartY > 0)) {
      swipeMenu.style.transform = `translateY(${movedY - touchstartY}px)`;
    }
  })

  swipeMenu.addEventListener('touchend', function (event) {
    swipeMenu.style.transition = "all 0.3s ease";

    if ((movedY - touchstartY > 100)) {
      closeMenu();
    } else {
      swipeMenu.style.transform = `translateY(0)`;
    }

    touchstartY = 0;
    movedY = 0;

    setTimeout(() => {
      swipeMenu.style.transition = "none";
    }, 300)
  }, false)
}