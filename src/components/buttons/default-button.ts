import { ButtonBuilder } from '@/utils/button-builder';

import { Component } from '../base/component';

export abstract class Button extends Component {
  protected button: ButtonBuilder;

  constructor(parameters: { className: string[]; textContent: string; callback: () => void }) {
    super({ tag: 'div', className: 'button-container' });
    this.button = new ButtonBuilder({
      tag: 'button',
      type: 'button',
      className: ['button', ...parameters.className],
      textContent: parameters.textContent,
      callback: parameters.callback,
    });
    this.render();
  }

  public disable(): void {
    this.button.disableButton();
  }

  public enable(): void {
    this.button.enableButton();
  }

  protected render(): void {
    this.container.append(this.button.getElement());
  }
}
