import type { ActionHandler } from '@/types/types';

import { Component } from '../base/component';
import { DeleteCarButton } from '../buttons/delete-car-button';
import { EditCarButton } from '../buttons/edit-car-button';

export class CarControls extends Component {
  public readonly editButton: EditCarButton;
  private deleteButton: DeleteCarButton;
  private onEdit: ActionHandler;
  private onDelete: ActionHandler;

  constructor(onEdit: ActionHandler, onDelete: ActionHandler) {
    super({ tag: 'div', className: 'cars__list-controls' });
    this.onEdit = onEdit;
    this.onDelete = onDelete;
    this.editButton = new EditCarButton(() => this.editCar());
    this.deleteButton = new DeleteCarButton(() => this.deleteCar());
    this.render();
  }

  public disableButtons(): void {
    this.editButton.disable();
    this.deleteButton.disable();
  }

  public enableButtons(): void {
    this.editButton.enable();
    this.deleteButton.enable();
  }

  protected render(): void {
    this.container.append(this.editButton.getElement(), this.deleteButton.getElement());
  }

  private deleteCar(): void {
    this.onDelete();
  }

  private editCar(): void {
    this.onEdit();
  }
}
