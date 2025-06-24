import { Button } from './default-button';

export class StopCarButton extends Button {
  constructor(callback: () => void) {
    super({
      className: ['button--stop-car'],
      textContent: 'Stop',
      callback,
    });
  }
}
