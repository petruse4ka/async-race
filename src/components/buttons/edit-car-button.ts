import { Button } from './default-button';

export class EditCarButton extends Button {
  constructor(callback: () => void) {
    super({
      className: ['button--edit-car'],
      textContent: '⚙',
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
