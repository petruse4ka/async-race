import type { Car, Winner } from '@/types/api';
import { ElementBuilder } from '@/utils/element-builder';

import { Component } from '../base/component';

export class WinnerItem extends Component {
  private winner: Winner;
  private car: Car | undefined;
  private index: number;
  constructor(winner: Winner, car: Car | undefined, index: number) {
    super({ tag: 'div', className: 'winners-grid__row' });
    this.winner = winner;
    this.car = car;
    this.index = index;
    this.render();
  }

  protected render(): void {
    this.createIndexCell();
    this.createIDCell();
    this.createCarCell();
    this.createCarNameCell();
    this.createWinsCell();
    this.createTimeCell();
  }

  private createIndexCell(): void {
    const indexCell = new ElementBuilder({
      tag: 'div',
      className: ['winners-grid__cell'],
      textContent: this.index.toString(),
    }).getElement();
    this.container.append(indexCell);
  }

  private createIDCell(): void {
    const IDCell = new ElementBuilder({
      tag: 'div',
      className: ['winners-grid__cell'],
      textContent: this.winner.id.toString(),
    }).getElement();
    this.container.append(IDCell);
  }

  private createCarCell(): void {
    const carCell = new ElementBuilder({
      tag: 'div',
      className: ['winners-grid__cell'],
    }).getElement();

    if (this.car) {
      const carIcon = new ElementBuilder({
        tag: 'span',
        className: ['winners-grid__car-icon'],
      }).getElement();

      carIcon.style.backgroundColor = this.car.color;

      carCell.append(carIcon);
    }
    this.container.append(carCell);
  }

  private createCarNameCell(): void {
    const carNameCell = new ElementBuilder({
      tag: 'div',
      className: ['winners-grid__cell', 'winners-grid__cell--name'],
      textContent: this.car ? this.car.name : 'Nameless car',
    }).getElement();
    this.container.append(carNameCell);
  }

  private createWinsCell(): void {
    const winsCell = new ElementBuilder({
      tag: 'div',
      className: ['winners-grid__cell'],
      textContent: this.winner.wins.toString(),
    }).getElement();
    this.container.append(winsCell);
  }

  private createTimeCell(): void {
    const timeCell = new ElementBuilder({
      tag: 'div',
      className: ['winners-grid__cell'],
      textContent: `${this.winner.time.toString()} s`,
    }).getElement();
    this.container.append(timeCell);
  }
}
