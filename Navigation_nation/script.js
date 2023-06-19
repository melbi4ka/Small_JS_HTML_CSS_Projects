const menuBars = document.querySelector('#menu-bars');
const overlay = document.querySelector('#overlay');
const nav1 = document.querySelector('.nav-1');
const nav2 = document.querySelector('.nav-2');
const nav3 = document.querySelector('.nav-3');
const nav4 = document.querySelector('.nav-4');
const nav5 = document.querySelector('.nav-5');
const navItems = [nav1, nav2, nav3, nav4, nav5];

// Control navigation
function navAnimation(direction1, direction2) {
  navItems.forEach((navItem, index) => {
    navItem.classList.replace(
      `slide-${direction1}-${index + 1}`,
      `slide-${direction2}-${index + 1}`
    );
  });
}

menuBars.addEventListener('click', toggleNav);
navItems.forEach((navItem) => {
  navItem.addEventListener('click', toggleNav);
});

function toggleNav() {
  // Open/close menu bar
  menuBars.classList.toggle('change');

  // Toggle: Menu active
  overlay.classList.toggle('overlay-active');
  if (overlay.classList.contains('overlay-active')) {
    // Animate in - Overlay
    overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
    // Animate in
    navAnimation('out', 'in');
  } else {
    // Animate out - Overlay
    overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
    // Animate out
    navAnimation('in', 'out');
  }
}
