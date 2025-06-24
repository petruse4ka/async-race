import type { ElementParameters } from '@/types/types';
import { ElementBuilder } from '@/utils/element-builder';

export abstract class Component {
  protected container: HTMLElement;

  constructor(parameters: ElementParameters) {
    this.container = new ElementBuilder(parameters).getElement();
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  public remove(): void {
    this.container.remove();
  }

  protected abstract render(): void;
}
