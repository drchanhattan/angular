export class GameSettings {
  lives = 0;
  paused = true;
  showMenu = true;
  level = 0;
  ghost = true;
  invincible = false;

  pause() {
    this.paused = true;
  }

  unpause() {
    this.paused = false;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    const menu = document.getElementsByClassName('menu')[0].classList;
    menu.toggle('opacity-0');
    menu.toggle('pointer-events-none');
  }
}
