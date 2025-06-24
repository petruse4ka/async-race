import { GarageRequests } from '@/api/garage-requests';
import { WinnerRequests } from '@/api/winner-requests';
import { WINNERS_GRID_CELLS, WINNERS_PER_PAGE } from '@/constants/constants';
import type { Car, Winner, WinnersParameters } from '@/types/api';
import { ElementBuilder } from '@/utils/element-builder';

import { Component } from '../base/component';
import { WinnerItem } from '../items/winner-item';
import { Paginator } from './paginator';

export class WinnersList extends Component {
  private winners: Winner[] = [];
  private cars: Car[] = [];
  private winnerRequests: WinnerRequests;
  private garageRequests: GarageRequests;
  private winnersContainer: HTMLElement | undefined = undefined;
  private titleElement: HTMLElement | undefined = undefined;
  private gridContainer: HTMLElement | undefined = undefined;
  private paginator: Paginator;
  private currentPage: number = 1;
  private sortBy: WinnersParameters['sort'] = 'id';
  private sortOrder: WinnersParameters['order'] = 'ASC';

  constructor() {
    super({ tag: 'div', className: 'winners-list' });
    this.winnerRequests = new WinnerRequests();
    this.garageRequests = new GarageRequests();
    this.paginator = new Paginator(
      () => this.showPreviousPage(),
      () => this.showNextPage()
    );
    this.render();
    this.addEventListeners();
  }

  protected render(): void {
    this.createWinnersContainer();
    this.createGrid();
  }

  private createWinnersContainer(): void {
    const header = new ElementBuilder({
      tag: 'div',
      className: ['winners-list__header'],
    }).getElement();

    this.titleElement = new ElementBuilder({
      tag: 'h2',
      className: ['winners-list__title'],
      textContent: 'Winners are loading...',
    }).getElement();

    header.append(this.titleElement);

    this.winnersContainer = new ElementBuilder({
      tag: 'div',
      className: ['winners-list__container'],
    }).getElement();

    this.container.append(header, this.winnersContainer, this.paginator.getElement());
  }

  private createGrid(): void {
    this.gridContainer = new ElementBuilder({
      tag: 'div',
      className: ['winners-grid'],
    }).getElement();

    const gridHeader = new ElementBuilder({
      tag: 'div',
      className: ['winners-grid__header'],
    }).getElement();

    for (const { text, sortBy } of WINNERS_GRID_CELLS) {
      const cell = new ElementBuilder({
        tag: 'div',
        className: ['winners-grid__cell'],
        textContent: text,
      }).getElement();

      if (sortBy) {
        cell.classList.add('winners-grid__cell--sort');
        cell.addEventListener('click', () => {
          this.sortWinners(sortBy);
        });
      }

      gridHeader.append(cell);
    }

    this.gridContainer.append(gridHeader);

    if (this.winnersContainer !== undefined) this.winnersContainer.append(this.gridContainer);
  }

  private sortWinners(sortBy: WinnersParameters['sort']): void {
    if (sortBy === this.sortBy) {
      this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortBy = sortBy;
      this.sortOrder = 'ASC';
    }

    void this.loadWinners();
  }

  private addEventListeners(): void {
    globalThis.addEventListener('carsLoaded', () => {
      void this.loadWinners();
    });

    globalThis.addEventListener('winnersUpdated', () => {
      void this.loadWinners();
    });
  }

  private async loadWinners(): Promise<void> {
    try {
      await this.loadCars();

      this.winners = await this.winnerRequests.getWinners({
        sort: this.sortBy,
        order: this.sortOrder,
      });

      const totalPages = Math.ceil(this.winners.length / WINNERS_PER_PAGE);
      if (this.currentPage > totalPages && totalPages > 0) {
        this.currentPage = totalPages;
      } else if (totalPages === 0) {
        this.currentPage = 1;
      }
    } catch (error) {
      console.error('Failed to load winners:', error);
    } finally {
      this.updateWinnersList();
    }
  }

  private async loadCars(): Promise<void> {
    try {
      this.cars = await this.garageRequests.getCars();
    } catch (error) {
      console.error('Failed to load cars:', error);
    }
  }

  private findCar(id: number): Car | undefined {
    return this.cars.find((car) => car.id === id);
  }

  private updateWinnersList(): void {
    if (this.gridContainer !== undefined) {
      while (this.gridContainer.children.length > 1) {
        this.gridContainer.lastChild?.remove();
      }

      if (this.titleElement !== undefined) {
        this.titleElement.textContent = `All winners (${this.winners.length})`;
      }

      if (this.winners.length === 0) {
        const emptyMessage = new ElementBuilder({
          tag: 'p',
          className: ['winners-list__empty'],
          textContent: 'No winners yet',
        }).getElement();
        if (this.winnersContainer !== undefined) {
          while (this.winnersContainer.firstChild) {
            this.winnersContainer.firstChild.remove();
          }
          this.createGrid();
          this.winnersContainer.append(emptyMessage);
        }
      } else {
        const startIndex = (this.currentPage - 1) * WINNERS_PER_PAGE;
        const endIndex = Math.min(startIndex + WINNERS_PER_PAGE, this.winners.length);
        const winners = this.winners.slice(startIndex, endIndex);

        for (const [index, winner] of winners.entries()) {
          const car = this.findCar(winner.id);
          const winnerItem = new WinnerItem(winner, car, startIndex + index + 1);
          if (this.gridContainer !== undefined) {
            this.gridContainer.append(winnerItem.getElement());
          }
        }
      }

      this.updatePaginator();
    }
  }

  private showPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateWinnersList();
    }
  }

  private showNextPage(): void {
    const totalPages = Math.ceil(this.winners.length / WINNERS_PER_PAGE);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updateWinnersList();
    }
  }

  private updatePaginator(): void {
    const totalPages = Math.ceil(this.winners.length / WINNERS_PER_PAGE);
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
