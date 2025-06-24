import type { Car, Cars, Drive, Engine, Winner, Winners } from '@/types/api';

export function isCar(value: unknown): value is Car {
  return (
    typeof value === 'object' &&
    value !== null &&
    Object.prototype.hasOwnProperty.call(value, 'id') &&
    Object.prototype.hasOwnProperty.call(value, 'name') &&
    Object.prototype.hasOwnProperty.call(value, 'color')
  );
}

export function isCars(value: unknown): value is Cars {
  return Array.isArray(value) && value.length > 0 && value.every((item) => isCar(item));
}

export function isWinner(value: unknown): value is Winner {
  return (
    typeof value === 'object' &&
    value !== null &&
    Object.prototype.hasOwnProperty.call(value, 'id') &&
    Object.prototype.hasOwnProperty.call(value, 'wins') &&
    Object.prototype.hasOwnProperty.call(value, 'time')
  );
}

export function isWinners(value: unknown): value is Winners {
  return Array.isArray(value) && value.every((item) => isWinner(item));
}

export function isEngine(value: unknown): value is Engine {
  return (
    typeof value === 'object' &&
    value !== null &&
    Object.prototype.hasOwnProperty.call(value, 'velocity') &&
    Object.prototype.hasOwnProperty.call(value, 'distance')
  );
}

export function isDrive(value: unknown): value is Drive {
  return (
    typeof value === 'object' &&
    value !== null &&
    Object.prototype.hasOwnProperty.call(value, 'success')
  );
}
