import { Button } from './default-button';

export class CreateCarButton extends Button {
  constructor(callback: () => void) {
    super({
      className: ['button--create-car'],
      textContent: 'Create',
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
