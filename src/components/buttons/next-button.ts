import { Button } from './default-button';

export class NextButton extends Button {
  constructor(callback: () => void) {
    super({
      className: ['button--next'],
      textContent: '→',
      callback,
    });
  }
}
