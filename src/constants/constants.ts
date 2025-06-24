import type { MenuItem, WinnersCellsTitles } from '@/types/types';
import { MenuItems, Route } from '@/types/types';

export const APP_TITLE: string = 'Async Race';

export const GITHUB_URL: string = 'https://github.com/petruse4ka';

export const AUTHOR_NAME: string = 'Konstantin Petrov';

export const COPYRIGHT_TEXT: string = '© 2025';

export const MENU_ITEMS: MenuItem[] = [
  { name: MenuItems.Garage, route: Route.Garage },
  { name: MenuItems.Winners, route: Route.Winners },
];

export const API_BASE_URL: string = 'http://127.0.0.1:3000';

export const DEFAULT_COLOR: string = '#8c5dbb';

export const CAR_BRANDS: string[] = [
  'Subaru',
  'Mitsubishi',
  'Toyota',
  'BMW',
  'Nissan',
  'Audi',
  'Porsche',
  'Ferrari',
  'Lamborghini',
  'Mazda',
];

export const CAR_MODELS: string[] = [
  'Imprezza',
  'Evolution XI',
  'Supra',
  'M3',
  'Skyline',
  'R8',
  '911 GTR-3',
  'Testarossa',
  'Huracan',
  'RX-7',
];

export const COLOR_PARAMETERS: {
  maxColorLength: number;
  colorCodes: string[];
} = {
  maxColorLength: 6,
  colorCodes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
};

export const CARS_PER_PAGE = 7;

export const WINNERS_PER_PAGE = 10;

export const FLAG_WIDTH = 40;

export const CAR_WIDTH = 100;

export const RACING_QUOTES: string[] = [
  'It doesn`t matter whether you win by an inch or a mile, winning is winning',
  'Aerodynamics are for people who can`t build engines',
  'I live my life a quarter-mile at a time',
  'Nobody remembers the guy who finished second but the guy who finished second',
  'Faster, faster, faster, until the thrill of speed overcomes the fear of death.',
];

export const WINNERS_GRID_CELLS: WinnersCellsTitles[] = [
  { text: '#', sortBy: undefined },
  { text: 'ID ⇵', sortBy: 'id' },
  { text: 'Car', sortBy: undefined },
  { text: 'Name', sortBy: undefined },
  { text: 'Wins ⇵', sortBy: 'wins' },
  { text: 'Time ⇵', sortBy: 'time' },
];
export const TEXT_COLORS: { default: string; racePreparation: string; raceFinished: string } = {
  default: '#9494a6',
  racePreparation: '#feb236',
  raceFinished: '#58b368',
};
