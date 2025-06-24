import { Component } from '@/components/base/component';
import { CarsList } from '@/components/blocks/cars-list';
import { RaceSection } from '@/components/blocks/race-section';
import { GarageControls } from '@/components/controls/garage-controls';
import { ElementBuilder } from '@/utils/element-builder';

export class Garage extends Component {
  private GarageControls: GarageControls;
  private carsList: CarsList;
  private raceSection: RaceSection;

  constructor() {
    super({ tag: 'main', className: 'garage' });
    this.GarageControls = new GarageControls();
    this.carsList = new CarsList();
    this.raceSection = new RaceSection(this.carsList.getCars());
    this.render();
    this.addEventListeners();
  }

  protected render(): void {
    const title = new ElementBuilder({
      tag: 'h1',
      className: 'garage__title',
      textContent: 'Garage',
    }).getElement();

    this.container.append(
      title,
      this.GarageControls.getElement(),
      this.raceSection.getElement(),
      this.carsList.getElement()
    );
  }

  private addEventListeners(): void {
    globalThis.addEventListener('carsLoaded', () => {
      this.updateRaceSection();
    });
  }

  private updateRaceSection(): void {
    const oldRaceSection = this.raceSection.getElement();
    this.raceSection = new RaceSection(this.carsList.getCars());
    oldRaceSection.replaceWith(this.raceSection.getElement());
  }
}
