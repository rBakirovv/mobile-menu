const html = document.querySelector("html");
const menuButton = document.querySelector(".mobile-menu-button");
const swipeMenu = document.querySelector(".swipe-menu");
const swipeMenuScrollItem = swipeMenu && swipeMenu.querySelector(".swipe-menu__scroll-item")

function closeMenu() {
  html.style.overflow = "visible";
  menuButton.classList.remove("--active");
  swipeMenu.classList.remove("--active");

  swipeMenu.style.transform = 'translateY(150%)';
}

menuButton.addEventListener("click", () => {
  if (html.style.overflow === "hidden") {
    html.style.overflow = "visible";
    swipeMenu.style.transform = 'translateY(150%)';
  } else {
    html.style.overflow = "hidden";
    swipeMenu.style.transform = 'translateY(0%)';
  }

  menuButton.classList.toggle("--active");
  swipeMenu.classList.toggle("--active");
})

/*
// Get a reference to an element
var manager = new Hammer.Manager(swipeMenuScrollItem);

// Create a recognizer
var Swipe = new Hammer.Swipe();

// Add the recognizer to the manager
manager.add(Swipe);

deltaY = 0;

// Subscribe to a desired event
manager.on('swipedown', function (e) {
  deltaY = deltaY + e.deltaY;
  //var direction = e.offsetDirection;
  var translateY = 'translateY(' + deltaY + 'px)';

  swipeMenu.style.transform = translateY;

  if (deltaY > 100) {
    closeMenu();
  }
});
*/

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
    //touchendY = event.changedTouches[0].screenY;

    if ((movedY - touchstartY > 100)) {
      closeMenu();
    } else {
      swipeMenu.style.transform = `translateY(0)`;
    }

    touchstartY = 0;
    movedY = 0;
    //touchendY = 0;
  }, false)
}