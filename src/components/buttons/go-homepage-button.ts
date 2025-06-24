import { Button } from './default-button';

export class HomepageButton extends Button {
  constructor(callback: () => void) {
    super({
      className: ['button--homepage'],
      textContent: 'Go to Homepage',
      callback,
    });
  }
}
