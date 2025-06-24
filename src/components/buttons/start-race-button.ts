import { Button } from './default-button';

export class StartRaceButton extends Button {
  constructor(callback: () => void) {
    super({
      className: ['button--start-race'],
      textContent: 'Start Race',
      callback,
    });
  }
}
