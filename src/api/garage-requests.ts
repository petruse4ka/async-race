import type { Car, Cars } from '@/types/api';
import { isCar, isCars } from '@/types/guards';
import { Paths } from '@/types/types';

import { ApiRequest } from './requests';

export class GarageRequests extends ApiRequest {
  constructor() {
    super();
  }

  public async getCars(): Promise<Cars> {
    return this.get(`${Paths.Garage}`, isCars);
  }

  public async createCar(car: Omit<Car, 'id'>): Promise<Car> {
    return this.post(Paths.Garage, car, isCar);
  }

  public async deleteCar(id: number): Promise<void> {
    return this.delete(`${Paths.Garage}/${id}`);
  }

  public async updateCar(id: number, car: Omit<Car, 'id'>): Promise<Car> {
    return this.put(`${Paths.Garage}/${id}`, car, isCar);
  }
}
