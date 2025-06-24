import { GarageRequests } from '@/api/garage-requests';
import { Component } from '@/components/base/component';
import { CancelButton } from '@/components/buttons/cancel-button';
import { UpdateCarButton } from '@/components/buttons/update-car-button';
import type { Car } from '@/types/api';
import type { ActionHandler } from '@/types/types';
import { InputBuilder } from '@/utils/input-builder';

export class UpdateCarOption extends Component {
  private carNameInput: InputBuilder;
  private carColorInput: InputBuilder;
  private updateButton: UpdateCarButton;
  private cancelButton: CancelButton;
  private garageRequests: GarageRequests;
  private car: Car;
  private onUpdate: ActionHandler;
  private onCancel: ActionHandler;

  constructor(car: Car, onUpdate: ActionHandler, onCancel: ActionHandler) {
    super({ tag: 'div', className: 'update-car' });
    this.car = car;
    this.onUpdate = onUpdate;
    this.onCancel = onCancel;
    this.garageRequests = new GarageRequests();
    this.carNameInput = UpdateCarOption.createCarNameInput(car.name);
    this.carColorInput = UpdateCarOption.createColorInput(car.color);
    this.updateButton = new UpdateCarButton(() => {
      void this.updateCar();
    });
    this.cancelButton = new CancelButton(() => {
      this.cancelCarUpdate();
    });
    this.render();
    this.addEventListeners();
  }

  private static createCarNameInput(carName: string): InputBuilder {
    const input = new InputBuilder({
      tag: 'input',
      className: ['input__field', 'input--update-name'],
      type: 'text',
      value: carName,
      placeholder: 'Add car brand',
      readonly: false,
    });

    return input;
  }

  private static createColorInput(carColor: string): InputBuilder {
    const input = new InputBuilder({
      tag: 'input',
      className: ['input__field', 'input--update-color'],
      type: 'color',
      value: carColor,
      readonly: false,
    });

    return input;
  }

  protected render(): void {
    this.container.append(
      this.carNameInput.getElement(),
      this.carColorInput.getElement(),
      this.updateButton.getElement(),
      this.cancelButton.getElement()
    );
  }

  private addEventListeners(): void {
    this.carNameInput.getElement().addEventListener('focus', () => {
      this.carNameInput.getElement().classList.remove('input--error');
    });
  }

  private async updateCar(): Promise<void> {
    const name = this.carNameInput.getValue().trim();
    const color = this.carColorInput.getValue();

    if (!name || name.length === 0 || !color) {
      this.carNameInput.getElement().classList.add('input--error');
      return;
    }

    try {
      await this.garageRequests.updateCar(this.car.id, { name, color });
      this.carNameInput.getElement().classList.remove('input--error');
      const garageUpdated = new CustomEvent('garageUpdated');
      globalThis.dispatchEvent(garageUpdated);
      this.onUpdate();
    } catch (error) {
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        globalThis.dispatchEvent(new CustomEvent('connectionLost'));
      }
      console.error('Error updating car:', error);
    }
  }

  private cancelCarUpdate(): void {
    this.onCancel();
  }
}
