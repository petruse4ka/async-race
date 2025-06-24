import type { ElementParameters } from '@/types/types';

import { ElementBuilder } from './element-builder';

interface ButtonParameters extends ElementParameters {
  type: 'button' | 'submit' | 'reset';
}

export class ButtonBuilder extends ElementBuilder {
  constructor(parameters: ButtonParameters) {
    super({ ...parameters });
    this.setButtonType(parameters.type);
  }

  public disableButton(): void {
    this.element.classList.add('button--disabled');
    if (this.element instanceof HTMLButtonElement) {
      this.element.disabled = true;
    }
  }

  public enableButton(): void {
    this.element.classList.remove('button--disabled');
    if (this.element instanceof HTMLButtonElement) {
      this.element.disabled = false;
    }
  }

  private setButtonType(type: ButtonParameters['type']): void {
    if (type && this.element instanceof HTMLInputElement) {
      this.element.type = type;
    }
  }
}
