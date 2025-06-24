import { Button } from './default-button';

export class ResetRaceButton extends Button {
  constructor(callback: () => void) {
    super({
      className: ['button--reset-race'],
      textContent: 'Reset Race',
      callback,
    });
  }
}
