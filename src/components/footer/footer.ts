import { Component } from '../base/component';
import { Copyright } from './copyright';

export class Footer extends Component {
  private copyright: Copyright;

  constructor() {
    super({ tag: 'footer', className: 'footer' });
    this.copyright = new Copyright();
    this.render();
  }

  protected render(): void {
    this.container.append(this.copyright.getElement());
  }
}
