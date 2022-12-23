
export const animateChange = (menu, change) => {
  const title = document.getElementsByClassName('menu-title')[0];
  const content = document.getElementsByClassName('menu-content')[0];
  let i = 0;
  let id = setInterval(frame, 10);
  function frame() {
    i++;
    if (i == 25) {
      title.style.opacity = '0';
      content.style.opacity = '0'
    } else if (i == 75) {
      change(menu);
      title.style.opacity = '1';
      content.style.opacity = '1';
      clearInterval(id);
    }
  }
}
