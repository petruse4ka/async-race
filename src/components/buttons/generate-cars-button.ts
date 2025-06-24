import { Button } from './default-button';

export class GenerateCarsButton extends Button {
  constructor(callback: () => void) {
    super({
      className: ['button--generate-cars'],
      textContent: 'Generate Cars',
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
