const html = document.querySelector("html");
const menuButton = document.querySelector(".mobile-menu-button");
const menuButtonSpan = menuButton.querySelector('.burger-icon span')
const swipeMenu = document.querySelector(".swipe-menu");
const swipeMenuContainer = document.querySelector(".swipe-menu__container");
const swipeMenuScrollItem = swipeMenu && swipeMenu.querySelector(".swipe-menu__scroll-item");

function closeMenu() {
  swipeMenu.style.transition = "all 0.3s ease";

  html.style.overflow = "visible";
  menuButtonSpan.classList.remove('active');
  swipeMenu.classList.remove("--active");

  swipeMenu.style.transform = 'translateY(150%)';

  setTimeout(() => {
    swipeMenu.style.transition = "none";
  }, 200)
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

  
  menuButtonSpan.classList.toggle('active');
  swipeMenu.classList.toggle("--active");

  setTimeout(() => {
    swipeMenu.style.transition = "none";
  }, 200)
})

let touchstartY = 0;
let movedY = 0;
let touchendY = 0;

if (swipeMenu) {
  swipeMenu.addEventListener('touchstart', function (event) {
    if (swipeMenuContainer.scrollTop <= 0) {
      swipeMenuContainer.scrollTo({
        top: 0
      });

      touchstartY = event.changedTouches[0].screenY;
    }
  }, false)

  swipeMenu.addEventListener('touchmove', function (event) {
    if (swipeMenuContainer.scrollTop <= 0) {
      swipeMenuContainer.scrollTo({
        top: 0
      });

      movedY = event.changedTouches[0].screenY;

      if (movedY - touchstartY > 0) {
        swipeMenuContainer.style.overflow = "hidden";
        swipeMenu.style.transform = `translateY(${movedY - touchstartY}px)`;
      }
    }
  })

  swipeMenu.addEventListener('touchend', function () {
    if (swipeMenuContainer.scrollTop <= 0) {
      swipeMenuContainer.scrollTo({
        top: 0
      });
      swipeMenuContainer.style.overflow = "scroll";

      swipeMenu.style.transition = "all 0.3s ease";

      if (movedY - touchstartY > 100) {
        closeMenu();
      } else {
        swipeMenu.style.transform = `translateY(0)`;
      }

      touchstartY = 0;
      movedY = 0;

      setTimeout(() => {
        swipeMenu.style.transition = "none";
      }, 200)
    }
  }, false)
}