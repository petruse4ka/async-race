import { CarAnimation } from '@/utils/car-animator';

import { Component } from '../base/component';
import { StartCarButton } from '../buttons/car-start-button';
import { StopCarButton } from '../buttons/car-stop-button';

export class CarAnimationControls extends Component {
  private startButton: StartCarButton;
  private stopButton: StopCarButton;
  private carAnimation: CarAnimation;
  private abortController: AbortController | undefined = undefined;
  private isDriving: boolean = false;
  private isRacing: boolean = false;

  constructor(carIcon: HTMLElement, road: HTMLElement, carId: number) {
    super({ tag: 'div', className: 'cars__list--animation-controls' });
    this.carAnimation = new CarAnimation(carIcon, road, carId);
    this.startButton = new StartCarButton(() => void this.startCar());
    this.stopButton = new StopCarButton(() => void this.stopCar());
    this.render();
    this.updateAnimateButtonStates();
  }

  public async startCar(signal?: AbortSignal): Promise<void> {
    this.abortPreviousOperations();
    globalThis.dispatchEvent(new CustomEvent('carStarted'));

    if (!signal) {
      this.abortController = new AbortController();
      signal = this.abortController.signal;
    }

    try {
      this.isDriving = true;
      this.updateAnimateButtonStates();
      const engineData = await this.carAnimation.startEngine(signal);
      if (engineData) {
        globalThis.dispatchEvent(new CustomEvent('carStartedDriving'));
        await this.carAnimation.startCar(engineData.velocity, engineData.distance, signal);
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        globalThis.dispatchEvent(new CustomEvent('connectionLost'));
      }
      console.error('Failed to start car:', error);
    }
  }

  public async stopCar(): Promise<void> {
    this.abortPreviousOperations();

    this.abortController = new AbortController();
    const { signal } = this.abortController;

    try {
      this.isDriving = false;
      this.updateAnimateButtonStates();
      this.carAnimation.returnCar();

      await this.carAnimation.stopCar(signal);
    } catch (error) {
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        globalThis.dispatchEvent(new CustomEvent('connectionLost'));
      }
      console.error('Failed to stop car:', error);
    }
  }

  public getCarAnimation(): CarAnimation {
    return this.carAnimation;
  }

  public setDrivingState(stateDriving: boolean, stateRacing: boolean): void {
    this.isDriving = stateDriving;
    this.isRacing = stateRacing;
    this.updateAnimateButtonStates();
  }

  protected render(): void {
    this.container.append(this.startButton.getElement(), this.stopButton.getElement());
  }

  private updateAnimateButtonStates(): void {
    if (this.isDriving && !this.isRacing) {
      this.startButton.disable();
      this.stopButton.enable();
    } else if (!this.isDriving && this.isRacing) {
      this.startButton.disable();
      this.stopButton.disable();
    } else {
      this.startButton.enable();
      this.stopButton.disable();
    }
  }

  private abortPreviousOperations(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = undefined;
    }
  }
}
