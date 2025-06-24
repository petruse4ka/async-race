import { GarageRequests } from '@/api/garage-requests';
import { CARS_PER_PAGE } from '@/constants/constants';
import type { Car } from '@/types/api';
import type { CarData } from '@/types/types';
import { CarGenerator } from '@/utils/car-generator';
import { ElementBuilder } from '@/utils/element-builder';

import { Component } from '../base/component';
import { Paginator } from '../blocks/paginator';
import { GenerateCarsButton } from '../buttons/generate-cars-button';
import { CarItem } from '../items/car-item';

export class CarsList extends Component {
  private cars: Car[] = [];
  private garageRequests: GarageRequests;
  private carsContainer: HTMLElement | undefined = undefined;
  private titleElement: HTMLElement | undefined = undefined;
  private paginator: Paginator;
  private currentPage: number = 1;
  private carItems: CarItem[] = [];

  constructor() {
    super({ tag: 'div', className: 'cars-list' });
    this.garageRequests = new GarageRequests();
    this.paginator = new Paginator(
      () => this.showPreviousPage(),
      () => this.showNextPage()
    );
    this.render();
    this.addEventListeners();
  }

  public getCars(): CarItem[] {
    return this.carItems;
  }

  protected render(): void {
    this.createGarageContainer();
    void this.loadCars();
  }

  private createGarageContainer(): void {
    const header = new ElementBuilder({
      tag: 'div',
      className: ['cars-list__header'],
    }).getElement();

    this.titleElement = new ElementBuilder({
      tag: 'h2',
      className: ['cars-list__title'],
      textContent: 'Cars are loading...',
    }).getElement();

    const generateButton = new GenerateCarsButton(() => void this.generateCars());

    header.append(this.titleElement, generateButton.getElement());

    this.carsContainer = new ElementBuilder({
      tag: 'div',
      className: ['cars-list__container'],
    }).getElement();

    this.container.append(header, this.carsContainer, this.paginator.getElement());
  }

  private addEventListeners(): void {
    globalThis.addEventListener('garageUpdated', () => {
      void this.loadCars();
    });

    globalThis.addEventListener('raceStarted', () => {
      this.paginator.prevButton.disable();
      this.paginator.nextButton.disable();
    });

    globalThis.addEventListener('raceFinished', () => {
      this.paginator.prevButton.enable();
      this.paginator.nextButton.enable();
      this.updatePaginator();
    });
  }

  private async loadCars(): Promise<void> {
    try {
      this.cars = await this.garageRequests.getCars();
    } catch (error) {
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        globalThis.dispatchEvent(new CustomEvent('connectionLost'));
      }
      console.error('Failed to load cars:', error);
      this.cars = [];
    } finally {
      if (this.cars.length === 0) {
        this.currentPage = 1;
      } else {
        const totalPages = Math.ceil(this.cars.length / CARS_PER_PAGE);

        if (this.currentPage > totalPages && totalPages > 0) {
          this.currentPage = totalPages;
        }
      }

      this.updateCarsList();
      const carsLoaded = new CustomEvent('carsLoaded');
      globalThis.dispatchEvent(carsLoaded);
    }
  }

  private updateCarsList(): void {
    if (this.carsContainer !== undefined) {
      while (this.carsContainer.firstChild) {
        this.carsContainer.firstChild.remove();
      }

      if (this.titleElement) {
        this.titleElement.textContent = `All cars (${this.cars.length})`;
        this.carItems = [];
      }

      if (this.cars.length === 0) {
        const emptyMessage = new ElementBuilder({
          tag: 'p',
          className: ['cars-list__empty'],
          textContent: 'No cars in the garage yet',
        }).getElement();
        this.carsContainer.append(emptyMessage);
      } else {
        const startIndex = (this.currentPage - 1) * CARS_PER_PAGE;
        const endIndex = Math.min(startIndex + CARS_PER_PAGE, this.cars.length);
        const cars = this.cars.slice(startIndex, endIndex);

        for (const car of cars) {
          const carItem = new CarItem(car);
          this.carItems.push(carItem);
          this.carsContainer.append(carItem.getElement());
        }
      }

      this.updatePaginator();
    }
  }

  private async generateCars(): Promise<void> {
    try {
      const randomCars = CarGenerator.generateRandomCars(100);
      await Promise.all(randomCars.map((car: CarData) => this.garageRequests.createCar(car)));
      const garageUpdated = new CustomEvent('garageUpdated');
      globalThis.dispatchEvent(garageUpdated);
    } catch (error) {
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        globalThis.dispatchEvent(new CustomEvent('connectionLost'));
      }
      console.error('Failed to generate cars:', error);
    }
  }

  private showPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateCarsList();
      const carsLoaded = new CustomEvent('carsLoaded');
      globalThis.dispatchEvent(carsLoaded);
    }
  }

  private showNextPage(): void {
    const totalPages = Math.ceil(this.cars.length / CARS_PER_PAGE);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updateCarsList();
      const carsLoaded = new CustomEvent('carsLoaded');
      globalThis.dispatchEvent(carsLoaded);
    }
  }

  private updatePaginator(): void {
    const totalPages = Math.ceil(this.cars.length / CARS_PER_PAGE);
    this.paginator.updatePageNumber(this.currentPage);
    if (this.currentPage === 1 || totalPages === 0) {
      this.paginator.prevButton.disable();
    } else {
      this.paginator.prevButton.enable();
    }
    if (this.currentPage === totalPages || totalPages === 0) {
      this.paginator.nextButton.disable();
    } else {
      this.paginator.nextButton.enable();
    }
  }
}
