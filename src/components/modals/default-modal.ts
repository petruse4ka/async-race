import { ButtonBuilder } from '@/utils/button-builder';
import { ElementBuilder } from '@/utils/element-builder';

import { Component } from '../base/component';

export abstract class Modal extends Component {
  protected modalContent: HTMLElement;
  protected isOpen = false;
  private closeButton: HTMLElement;

  constructor(className: string[]) {
    super({ tag: 'dialog', className: ['modal', ...className] });

    this.modalContent = new ElementBuilder({
      tag: 'div',
      className: 'modal__content',
    }).getElement();

    this.closeButton = new ButtonBuilder({
      type: 'button',
      tag: 'button',
      className: 'modal__close-button',
      textContent: '×',
      callback: (): void => this.close(),
    }).getElement();

    this.container.addEventListener('click', (event) => {
      if (event.target === this.container) {
        this.close();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    this.render();
  }

  public open(): void {
    if (!this.isOpen) {
      document.body.append(this.container);
      document.body.style.overflow = 'hidden';

      if (this.container instanceof HTMLDialogElement) {
        this.container.showModal();
      }

      this.isOpen = true;
    }
  }

  public close(): void {
    if (this.isOpen) {
      if (this.container instanceof HTMLDialogElement) {
        this.container.close();
      }

      document.body.style.overflow = '';
      this.container.remove();
      this.isOpen = false;
    }
  }

  protected render(): void {
    this.modalContent.append(this.closeButton);
    this.container.append(this.modalContent);
    this.renderChildren();
  }

  protected abstract renderChildren(): void;
}
