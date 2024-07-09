export class GameSettings {
  level = 0;
  lives = 0;
  paused = true;
  showMenu = true;
  ghost = true;
  invincible = false;

  pause() {
    this.paused = true;
  }

  unpause() {
    this.paused = false;
  }

  reset() {
    this.level = 1;
    this.lives = 3;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    const menu = document.getElementsByClassName('menu')[0].classList;
    menu.toggle('opacity-0');
    menu.toggle('pointer-events-none');
  }
}
