import { Button } from './default-button';

export class PreviousButton extends Button {
  constructor(callback: () => void) {
    super({
      className: ['button--prev'],
      textContent: '←',
      callback,
    });
  }
}
