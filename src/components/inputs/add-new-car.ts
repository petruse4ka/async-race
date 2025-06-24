import { GarageRequests } from '@/api/garage-requests';
import { Component } from '@/components/base/component';
import { CreateCarButton } from '@/components/buttons/create-car-button';
import { DEFAULT_COLOR } from '@/constants/constants';
import { InputBuilder } from '@/utils/input-builder';

export class AddNewCarOption extends Component {
  private carNameInput: InputBuilder;
  private carColorInput: InputBuilder;
  private createButton: CreateCarButton;
  private garageRequests: GarageRequests;

  constructor() {
    super({ tag: 'div', className: 'add-new-car' });
    this.garageRequests = new GarageRequests();
    this.carNameInput = AddNewCarOption.createCarNameInput();
    this.carColorInput = AddNewCarOption.createColorInput();
    this.createButton = new CreateCarButton(() => {
      void this.createCar();
    });
    this.render();
    this.addEventListeners();
  }

  private static createCarNameInput(): InputBuilder {
    const input = new InputBuilder({
      tag: 'input',
      className: ['input__field', 'input--add-new'],
      type: 'text',
      value: '',
      placeholder: 'Add car brand',
      readonly: false,
    });

    return input;
  }

  private static createColorInput(): InputBuilder {
    const input = new InputBuilder({
      tag: 'input',
      className: ['input__field', 'input--color'],
      type: 'color',
      value: DEFAULT_COLOR,
      readonly: false,
    });

    return input;
  }

  protected render(): void {
    this.container.append(
      this.carNameInput.getElement(),
      this.carColorInput.getElement(),
      this.createButton.getElement()
    );
  }

  private addEventListeners(): void {
    this.carNameInput.getElement().addEventListener('focus', () => {
      this.carNameInput.getElement().classList.remove('input--error');
    });
  }

  private async createCar(): Promise<void> {
    const name = this.carNameInput.getValue().trim();
    const color = this.carColorInput.getValue();

    if (!name || name.length === 0 || !color) {
      this.carNameInput.getElement().classList.add('input--error');
      return;
    }

    try {
      await this.garageRequests.createCar({ name, color });
      this.carNameInput.getElement().classList.remove('input--error');
      this.carNameInput.setValue('');
      this.carColorInput.setValue(DEFAULT_COLOR);
      const garageUpdated = new CustomEvent('garageUpdated');
      globalThis.dispatchEvent(garageUpdated);
    } catch (error) {
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        globalThis.dispatchEvent(new CustomEvent('connectionLost'));
      }
      console.error('Error creating car:', error);
    }
  }
}
