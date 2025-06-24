import type { Winner, Winners, WinnersParameters } from '@/types/api';
import { isWinner, isWinners } from '@/types/guards';
import { Paths } from '@/types/types';

import { ApiRequest } from './requests';

export class WinnerRequests extends ApiRequest {
  constructor() {
    super();
  }

  public async getWinners(parameters?: WinnersParameters): Promise<Winners> {
    let url = `${Paths.Winners}`;

    if (parameters) {
      const queryParameters = new URLSearchParams();

      if (parameters.sort) {
        queryParameters.append('_sort', parameters.sort);
      }

      if (parameters.order) {
        queryParameters.append('_order', parameters.order);
      }

      const queryString = queryParameters.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    return this.get(url, isWinners);
  }

  public async createWinner(winner: Winner): Promise<Winner> {
    return this.post(Paths.Winners, winner, isWinner);
  }

  public async deleteWinner(id: number): Promise<void> {
    return this.delete(`${Paths.Winners}/${id}`);
  }

  public async updateWinner(id: number, winner: Omit<Winner, 'id'>): Promise<Winner> {
    return this.put(`${Paths.Winners}/${id}`, winner, isWinner);
  }
}
