import { WinnerRequests } from '@/api/winner-requests';
import { RACING_QUOTES } from '@/constants/constants';
import { TEXT_COLORS } from '@/constants/constants';
import type { EngineData } from '@/types/types';
import { ElementBuilder } from '@/utils/element-builder';

import { Component } from '../base/component';
import { ResetRaceButton } from '../buttons/reset-race-button';
import { StartRaceButton } from '../buttons/start-race-button';
import type { CarItem } from '../items/car-item';

export class RaceSection extends Component {
  private startRaceButton: StartRaceButton;
  private resetRaceButton: ResetRaceButton;
  private defaultMessage: HTMLElement;
  private raceSectionContainer: HTMLElement;
  private abortController: AbortController | undefined = undefined;
  private carItems: CarItem[] = [];
  private winnerRequests: WinnerRequests;

  constructor(carItems: CarItem[]) {
    super({ tag: 'section', className: 'race-section' });

    this.carItems = carItems;
    this.winnerRequests = new WinnerRequests();

    this.raceSectionContainer = new ElementBuilder({
      tag: 'div',
      className: ['race-section__container'],
    }).getElement();

    this.defaultMessage = new ElementBuilder({
      tag: 'p',
      className: ['race-section__message'],
      textContent: RACING_QUOTES[Math.floor(Math.random() * RACING_QUOTES.length)],
    }).getElement();

    this.startRaceButton = new StartRaceButton(() => void this.startRace());
    this.resetRaceButton = new ResetRaceButton(() => void this.resetRace());

    this.render();
    this.updateButtonStates();
  }

  private static dispatchRaceEvent(name: string): void {
    const eventName = new CustomEvent(name);
    globalThis.dispatchEvent(eventName);
  }

  protected render(): void {
    const heading = new ElementBuilder({
      tag: 'h2',
      className: ['race-section__heading'],
      textContent: 'Find the fastest car',
    }).getElement();

    const buttonsContainer = new ElementBuilder({
      tag: 'div',
      className: ['race-section__buttons-container'],
    }).getElement();

    buttonsContainer.append(this.startRaceButton.getElement(), this.resetRaceButton.getElement());
    this.raceSectionContainer.append(heading, this.defaultMessage, buttonsContainer);
    this.container.append(this.raceSectionContainer);
  }

  private updateButtonStates(): void {
    if (this.carItems.length === 0) {
      this.startRaceButton.disable();
      this.resetRaceButton.disable();
      this.defaultMessage.textContent = 'No cars available for racing';
    } else {
      this.startRaceButton.enable();
      this.resetRaceButton.disable();
    }
  }

  private setTrueDrivingStates(stateDriving: boolean, stateRacing: boolean): void {
    for (const carItem of this.carItems) {
      if (carItem.animationControls !== undefined) {
        const carAnimationControls = carItem.animationControls;
        carAnimationControls.setDrivingState(stateDriving, stateRacing);
      }
    }
  }

  private setRacingStates(): void {
    this.startRaceButton.disable();
    this.setTrueDrivingStates(false, true);
    RaceSection.dispatchRaceEvent('raceStarted');
  }

  private finishRace(): void {
    RaceSection.dispatchRaceEvent('raceFinished');
    this.setTrueDrivingStates(true, false);
  }

  private updateRaceStatus(): void {
    this.resetRaceButton.enable();
    this.defaultMessage.textContent = 'Cars are racing...';
  }

  private async startRace(): Promise<void> {
    this.abortPreviousOperations();
    const { signal } = new AbortController();

    try {
      this.setRacingStates();
      this.defaultMessage.style.color = TEXT_COLORS.racePreparation;
      this.defaultMessage.textContent = 'Getting all the cars ready for a race...';
      const stopPromises = this.carItems.map((carItem) => {
        if (carItem.animationControls) {
          return carItem.animationControls.stopCar();
        }
        return Promise.resolve();
      });
      await Promise.all(stopPromises);

      const enginePromises = this.carItems.map((carItem) => {
        if (carItem.animationControls !== undefined) {
          const carAnimation = carItem.animationControls.getCarAnimation();
          return carAnimation.startEngine(signal);
        }
        return Promise.resolve();
      });

      this.defaultMessage.textContent = 'Engines are warming up...';
      const startedEngines = await Promise.all(enginePromises);
      this.updateRaceStatus();

      if (startedEngines.length > 0) {
        await this.runRace(startedEngines, signal);
      } else {
        this.updateButtonStates();
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        globalThis.dispatchEvent(new CustomEvent('connectionLost'));
      }
      console.error('Race failed to start:', error);
      this.defaultMessage.textContent = 'Race failed to start';
      this.updateButtonStates();
    } finally {
      this.finishRace();
    }
  }

  private async runRace(startedEngines: (EngineData | void)[], signal: AbortSignal): Promise<void> {
    globalThis.dispatchEvent(new CustomEvent('carsStartedRacing'));
    const carsPromises = startedEngines.map(async (engineData, index) => {
      const carItem = this.carItems[index];

      if (carItem.animationControls !== undefined && engineData) {
        const carAnimation = carItem.animationControls.getCarAnimation();
        await carAnimation.startCar(engineData.velocity, engineData.distance, signal);
        return index;
      }

      return -1;
    });

    if (carsPromises.length > 0) {
      const winnerIndex = await Promise.race(carsPromises);

      if (winnerIndex === -2) {
        this.defaultMessage.textContent = 'None of the cars finished the race';
      }
      if (winnerIndex >= 0 && startedEngines[winnerIndex]) {
        await this.processWinner(winnerIndex, startedEngines[winnerIndex]);
      }
    }
  }

  private async processWinner(
    winnerIndex: number,
    engineData: EngineData | undefined
  ): Promise<void> {
    if (!engineData) return;

    const winningCar = this.carItems[winnerIndex];
    const winningTime = Number.parseFloat(
      (engineData.distance / engineData.velocity / 1000).toFixed(2)
    );
    this.defaultMessage.style.color = TEXT_COLORS.raceFinished;
    this.defaultMessage.textContent = `The winner is: ${winningCar.getName()} (${winningTime}s)`;

    try {
      const winners = await this.winnerRequests.getWinners();
      const winnerID = winningCar.getId();
      const previousWinner = winners.find((winner) => winner.id === winnerID);

      await (previousWinner
        ? this.winnerRequests.updateWinner(winnerID, {
            wins: previousWinner.wins + 1,
            time: Math.min(previousWinner.time, winningTime),
          })
        : this.winnerRequests.createWinner({
            id: winningCar.getId(),
            wins: 1,
            time: winningTime,
          }));
    } catch (error) {
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        globalThis.dispatchEvent(new CustomEvent('connectionLost'));
      }
      console.error('Failed to save winner:', error);
    } finally {
      const winnersUpdated = new CustomEvent('winnersUpdated');
      globalThis.dispatchEvent(winnersUpdated);
    }
  }

  private async resetRace(): Promise<void> {
    this.abortPreviousOperations();
    this.resetRaceButton.disable();

    try {
      this.defaultMessage.style.color = TEXT_COLORS.racePreparation;
      this.defaultMessage.textContent = 'Race is resetting...';

      this.abortController = new AbortController();
      const { signal } = this.abortController;

      const carsResetPromises = this.carItems.map(async (carItem) => {
        if (carItem.animationControls !== undefined) {
          const carAnimation = carItem.animationControls.getCarAnimation();

          await carAnimation.stopCar(signal);

          carAnimation.returnCar();

          try {
            await carAnimation.stopEngine(signal);
          } catch (error) {
            if (error instanceof Error && error.message.includes('Failed to fetch')) {
              globalThis.dispatchEvent(new CustomEvent('connectionLost'));
            }
            console.error('Failed to stop engine:', error);
          }

          carItem.animationControls.setDrivingState(false, false);
        }
      });

      await Promise.all(carsResetPromises);

      this.abortController = undefined;
    } catch (error) {
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        globalThis.dispatchEvent(new CustomEvent('connectionLost'));
      }
      console.error('Failed to reset race:', error);
    } finally {
      this.updateButtonStates();
      this.defaultMessage.style.color = TEXT_COLORS.default;
      this.defaultMessage.textContent =
        RACING_QUOTES[Math.floor(Math.random() * RACING_QUOTES.length)];

      const raceFinishedEvent = new CustomEvent('raceFinished');
      globalThis.dispatchEvent(raceFinishedEvent);
    }
  }

  private abortPreviousOperations(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = undefined;
    }
  }
}
