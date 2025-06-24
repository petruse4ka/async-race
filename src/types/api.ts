export interface Car {
  id: number;
  name: string;
  color: string;
}

export type Cars = Car[];

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export type Winners = Winner[];

export interface WinnersParameters {
  sort?: 'id' | 'wins' | 'time';
  order?: 'ASC' | 'DESC';
}

export interface Engine {
  velocity: number;
  distance: number;
}

export interface Drive {
  success: boolean;
}
