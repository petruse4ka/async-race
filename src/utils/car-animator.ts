import { EngineRequests } from '@/api/engine-requests';
import { CAR_WIDTH, FLAG_WIDTH } from '@/constants/constants';
import type { ActionHandler } from '@/types/types';
import type { EngineData } from '@/types/types';

export class CarAnimation {
  private car: HTMLElement;
  private road: HTMLElement;
  private carId: number;
  private engineRequests: EngineRequests;
  private animationFrameId: number | undefined = undefined;
  private startTime: number | undefined = undefined;

  constructor(car: HTMLElement, road: HTMLElement, carId: number) {
    this.car = car;
    this.road = road;
    this.carId = carId;
    this.engineRequests = new EngineRequests();
  }

  public async startEngine(signal?: AbortSignal): Promise<EngineData | void> {
    try {
      const engineResponse = await this.engineRequests.startStopEngine(
        this.carId,
        'started',
        signal
      );
      if (signal?.aborted) return;
      return {
        velocity: engineResponse.velocity,
        distance: engineResponse.distance,
      };
    } catch (error) {
      if (signal?.aborted) return;
      console.error('Failed to start engine:', error);
      throw error;
    }
  }

  public async stopEngine(signal?: AbortSignal): Promise<void> {
    try {
      await this.engineRequests.startStopEngine(this.carId, 'stopped', signal);
      if (signal?.aborted) return;
    } catch (error) {
      if (signal?.aborted) return;
      console.error('Failed to stop engine:', error);
      throw error;
    }
  }

  public async startCar(velocity: number, distance: number, signal?: AbortSignal): Promise<void> {
    try {
      this.car.style.transform = 'translateX(0)';

      if (signal?.aborted) return;

      const carAnimation = this.animate(velocity, distance);

      void (async (): Promise<void> => {
        try {
          await this.engineRequests.switchEngine(this.carId, signal);
          if (signal?.aborted) return;
        } catch (error) {
          if (signal?.aborted) return;

          if (error instanceof Error && error.message.includes('500')) {
            console.error('Engine has broken down');
            const carBreakdownEvent = new CustomEvent('carBreakdown', {
              detail: { carId: this.carId },
            });
            globalThis.dispatchEvent(carBreakdownEvent);
            await this.stopCar();
          }
        }
      })();

      await carAnimation;
    } catch (error) {
      if (signal?.aborted) return;

      console.error('Failed to start car:', error);
      throw error;
    }
  }

  public async stopCar(signal?: AbortSignal): Promise<void> {
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = undefined;
    }

    await this.stopEngine(signal);
  }

  public returnCar(): void {
    this.car.style.transform = 'translateX(0)';
  }

  public getCarId(): number {
    return this.carId;
  }

  private animate(velocity: number, distance: number): Promise<void> {
    return new Promise<void>((resolve) => {
      this.startTime = performance.now();

      const roadLength = this.road.offsetWidth;
      if (roadLength === 0) {
        resolve();
        return;
      }

      const totalDistance = roadLength - CAR_WIDTH - FLAG_WIDTH;
      const animationDuration = distance / velocity;

      const animateCar: ActionHandler = () => {
        if (!this.startTime) {
          return;
        }

        const elapsedTime = performance.now() - this.startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);
        const position = progress * totalDistance;

        this.car.style.transform = `translateX(${position}px)`;

        if (progress < 1) {
          this.animationFrameId = requestAnimationFrame(animateCar);
        } else {
          void this.stopCar();
          resolve();
        }
      };

      this.animationFrameId = requestAnimationFrame(animateCar);
    });
  }
}
