import { Component } from '@/components/base/component';
import { HomepageButton } from '@/components/buttons/go-homepage-button';
import { Router } from '@/router/router';
import { Route } from '@/types/types';
import { ElementBuilder } from '@/utils/element-builder';

export class ErrorPage extends Component {
  constructor() {
    super({ tag: 'main', className: 'error' });
    this.render();
  }

  protected render(): void {
    const errorSection = new ElementBuilder({
      tag: 'div',
      className: ['error__container'],
    }).getElement();

    const heading = new ElementBuilder({
      tag: 'h2',
      className: ['error__heading'],
      textContent: 'Page Not Found',
    }).getElement();

    const message = new ElementBuilder({
      tag: 'p',
      className: ['error__message'],
      textContent: 'Something went wrong! The page does not exist.',
    }).getElement();

    const homeButton = new HomepageButton(() => Router.followRoute(Route.Garage));

    errorSection.append(heading, message, homeButton.getElement());
    this.container.append(errorSection);
  }
}
