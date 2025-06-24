import { AddNewCarOption } from '@/components/inputs/add-new-car';

import { Component } from '../base/component';

export class GarageControls extends Component {
  private newCarOption: AddNewCarOption;

  constructor() {
    super({ tag: 'div', className: 'garage-controls' });
    this.newCarOption = new AddNewCarOption();
    this.render();
  }

  protected render(): void {
    this.container.append(this.newCarOption.getElement());
  }
}
