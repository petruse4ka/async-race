import { Button } from './default-button';

export class StartCarButton extends Button {
  constructor(callback: () => void) {
    super({
      className: ['button--start-car'],
      textContent: 'Start',
      callback,
    });
  }
}
