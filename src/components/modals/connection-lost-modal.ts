import carIcon from '@/assets/images/no-connection.png';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

import { Modal } from './default-modal';

export class ConnectionLostModal extends Modal {
  constructor() {
    super(['connection-lost-modal']);
    this.addEventListeners();
  }

  protected renderChildren(): void {
    const messageContainer = new ElementBuilder({
      tag: 'div',
      className: 'connection-lost-modal__message',
    }).getElement();

    const heading = new ElementBuilder({
      tag: 'h2',
      className: 'connection-lost-modal__heading',
      textContent: 'Connection Lost',
    }).getElement();

    const image = new ImageBuilder({
      tag: 'img',
      className: 'connection-lost-modal__image',
      source: carIcon,
      alt: 'Broken down car',
    }).getElement();

    const message = new ElementBuilder({
      tag: 'p',
      className: 'connection-lost-modal__text',
      textContent:
        'Unfortunately, connection to the remote server has been lost or cannot be established',
    }).getElement();

    messageContainer.append(heading, image, message);
    this.modalContent.append(messageContainer);
  }

  private addEventListeners(): void {
    globalThis.addEventListener('connectionLost', () => {
      if (!this.isOpen) {
        this.open();
      }
    });
  }
}
