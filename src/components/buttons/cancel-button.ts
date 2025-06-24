import { Button } from './default-button';

export class CancelButton extends Button {
  constructor(callback: () => void) {
    super({
      className: ['button--cancel'],
      textContent: '✖',
      callback,
    });

    this.addEventListeners();
  }

  private addEventListeners(): void {
    globalThis.addEventListener('raceStarted', () => {
      this.disable();
    });

    globalThis.addEventListener('raceFinished', () => {
      this.enable();
    });
  }
}
