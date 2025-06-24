import { MENU_ITEMS } from '@/constants/constants';
import { ElementBuilder } from '@/utils/element-builder';

import { Component } from '../base/component';

export class HeaderMenu extends Component {
  constructor() {
    super({ tag: 'ul', className: 'header__menu' });
    this.render();
  }

  protected render(): void {
    for (const item of MENU_ITEMS) {
      const menuItem = new ElementBuilder({
        tag: 'li',
        className: 'menu__item',
        textContent: item.name,
      }).getElement();

      menuItem.addEventListener('click', () => {
        globalThis.location.hash = item.route;
      });

      globalThis.addEventListener('raceStarted', () => {
        menuItem.classList.add('menu__item--disabled');
      });

      globalThis.addEventListener('carStarted', () => {
        menuItem.classList.add('menu__item--disabled');
      });

      globalThis.addEventListener('raceFinished', () => {
        menuItem.classList.remove('menu__item--disabled');
      });

      globalThis.addEventListener('carFinished', () => {
        menuItem.classList.remove('menu__item--disabled');
      });

      globalThis.addEventListener('carsStartedRacing', () => {
        menuItem.classList.remove('menu__item--disabled');
      });

      globalThis.addEventListener('carStartedDriving', () => {
        menuItem.classList.remove('menu__item--disabled');
      });

      this.container.append(menuItem);
    }
  }
}
