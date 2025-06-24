import { APP_TITLE } from '@/constants/constants';
import { ElementBuilder } from '@/utils/element-builder';

import { Component } from '../base/component';
import { HeaderMenu } from './header-menu';

export class Header extends Component {
  private menu: HeaderMenu;

  constructor() {
    super({ tag: 'header', className: 'header' });
    this.menu = new HeaderMenu();
    this.render();
  }

  protected render(): void {
    const container = new ElementBuilder({
      tag: 'div',
      className: 'header__container',
    }).getElement();

    const logo = new ElementBuilder({
      tag: 'h1',
      className: 'header__logo',
      textContent: APP_TITLE,
    }).getElement();

    container.append(logo, this.menu.getElement());
    this.container.append(container);
  }
}
