import { GarageRequests } from '@/api/garage-requests';
import { WinnerRequests } from '@/api/winner-requests';
import finishIcon from '@/assets/icons/finish.png';
import type { Car } from '@/types/api';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

import { Component } from '../base/component';
import { CarAnimationControls } from '../controls/car-animation-controls';
import { CarControls } from '../controls/car-controls';
import { UpdateCarOption } from '../inputs/update-car';

export class CarItem extends Component {
  private car: Car;
  private carControls: CarControls;
  private carAnimationControls: CarAnimationControls | undefined;
  private carHeader: HTMLElement;
  private isEditing: boolean = false;
  private garageRequests: GarageRequests;
  private winnerRequests: WinnerRequests;

  constructor(car: Car) {
    super({ tag: 'div', className: 'cars-list__item' });
    this.car = car;
    this.garageRequests = new GarageRequests();
    this.winnerRequests = new WinnerRequests();
    this.carControls = new CarControls(
      () => this.editCar(),
      () => void this.deleteCar()
    );
    this.carHeader = this.createHeader();
    this.render();
    this.addEventListeners();
  }

  public get animationControls(): CarAnimationControls | undefined {
    return this.carAnimationControls;
  }

  public getName(): string {
    return this.car.name;
  }

  public getId(): number {
    return this.car.id;
  }

  protected render(): void {
    const carElement = new ElementBuilder({
      tag: 'div',
      className: ['cars-list__car'],
    }).getElement();

    const carImage = new ElementBuilder({
      tag: 'span',
      className: ['cars-list__car-icon'],
    }).getElement();

    carImage.style.backgroundColor = this.car.color;

    const road = new ElementBuilder({
      tag: 'div',
      className: ['cars-list__road'],
    }).getElement();

    const finishFlag = new ImageBuilder({
      tag: 'img',
      className: ['cars-list__finish-flag'],
      source: finishIcon,
      alt: 'Finish line',
    }).getElement();

    road.append(finishFlag);

    this.carAnimationControls = new CarAnimationControls(carImage, road, this.car.id);

    carElement.append(this.carHeader, carImage, road, this.carAnimationControls.getElement());
    this.container.append(carElement);
  }

  private createHeader(): HTMLElement {
    const header = new ElementBuilder({
      tag: 'div',
      className: ['cars-list__car-header'],
    }).getElement();

    this.updateHeader(header);
    return header;
  }

  private updateHeader(header: HTMLElement): void {
    while (header.firstChild) {
      header.firstChild.remove();
    }

    if (this.isEditing) {
      const updateInputs = new UpdateCarOption(
        this.car,
        () => this.updateCar(),
        () => this.cancelCarUpdate()
      );
      header.append(updateInputs.getElement());
    } else {
      const carName = new ElementBuilder({
        tag: 'span',
        className: ['cars-list__car-name'],
        textContent: this.car.name,
      }).getElement();
      header.append(carName);
    }

    header.append(this.carControls.getElement());
  }

  private editCar(): void {
    this.isEditing = true;
    this.carControls.editButton.disable();
    this.updateHeader(this.carHeader);
  }

  private async deleteCar(): Promise<void> {
    try {
      await this.garageRequests.deleteCar(this.car.id);
      const garageUpdated = new CustomEvent('garageUpdated');
      globalThis.dispatchEvent(garageUpdated);

      try {
        const winners = await this.winnerRequests.getWinners();
        const isWinner = winners.some((winner) => winner.id === this.car.id);

        if (isWinner) {
          await this.winnerRequests.deleteWinner(this.car.id);
        }
      } catch (error) {
        if (error instanceof Error && error.message.includes('Failed to fetch')) {
          globalThis.dispatchEvent(new CustomEvent('connectionLost'));
        }
        console.error('Error deleting winner', error);
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        globalThis.dispatchEvent(new CustomEvent('connectionLost'));
      }
      console.error('Error deleting car:', error);
    }
  }

  private updateCar(): void {
    this.isEditing = false;
    this.carControls.editButton.enable();
    this.updateHeader(this.carHeader);
  }

  private cancelCarUpdate(): void {
    this.isEditing = false;
    this.carControls.editButton.enable();
    this.updateHeader(this.carHeader);
  }

  private addEventListeners(): void {
    globalThis.addEventListener('raceStarted', () => {
      if (this.isEditing) {
        this.isEditing = false;
        this.updateHeader(this.carHeader);
      }
    });
  }
}
