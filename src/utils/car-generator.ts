import { CAR_BRANDS, CAR_MODELS, COLOR_PARAMETERS } from '@/constants/constants';

export class CarGenerator {
  private constructor() {}

  public static generateRandomCars(count: number): Array<{ name: string; color: string }> {
    return Array.from({ length: count }, () => this.generateRandomCar());
  }

  private static getRandomIndex(array: string[]): string {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  private static getRandomColor(): string {
    let color = '#';
    for (let index = 0; index < COLOR_PARAMETERS.maxColorLength; index += 1) {
      color += this.getRandomIndex(COLOR_PARAMETERS.colorCodes);
    }
    return color;
  }

  private static generateRandomCar(): { name: string; color: string } {
    const randomBrand = this.getRandomIndex(CAR_BRANDS);
    const randomModel = this.getRandomIndex(CAR_MODELS);
    const randomColor = this.getRandomColor();

    return {
      name: `${randomBrand} ${randomModel}`,
      color: randomColor,
    };
  }
}
