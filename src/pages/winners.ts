import { Component } from '@/components/base/component';
import { WinnersList } from '@/components/blocks/winners-list';
import { ElementBuilder } from '@/utils/element-builder';

export class Winners extends Component {
  private winnersList: WinnersList;

  constructor() {
    super({ tag: 'main', className: 'winners' });
    this.winnersList = new WinnersList();
    this.render();
  }

  protected render(): void {
    const title = new ElementBuilder({
      tag: 'h1',
      className: ['winners__title'],
      textContent: 'Winners',
    }).getElement();

    this.container.append(title, this.winnersList.getElement());
  }
}
