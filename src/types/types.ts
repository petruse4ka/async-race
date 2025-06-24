import type { WinnersParameters } from './api';

export interface ElementParameters {
  tag: string;
  className?: string | string[];
  textContent?: string;
  callback?: (event: Event) => void;
  eventType?: string;
}

export interface InputParameters extends ElementParameters {
  type: 'text' | 'number' | 'color';
  value?: string;
  placeholder?: string;
  readonly?: boolean;
}

export interface LinkParameters extends ElementParameters {
  href: string;
  target: '_blank' | '_self';
}

export interface ImageParameters extends ElementParameters {
  source: string;
  alt: string;
}

export interface CarData {
  name: string;
  color: string;
}

export interface EngineData {
  velocity: number;
  distance: number;
}

export interface MenuItem {
  name: MenuItems;
  route: Route;
}

export enum Route {
  Garage = '#/',
  Winners = '#/winners',
  Error = '#/error',
}

export enum Paths {
  Garage = '/garage',
  Winners = '/winners',
  Engine = '/engine',
}

export enum MenuItems {
  Garage = 'Garage',
  Winners = 'Winners',
}

export enum ApiMethods {
  Get = 'GET',
  Post = 'POST',
  Delete = 'DELETE',
  Put = 'PUT',
  Patch = 'PATCH',
}

export type ActionHandler = () => void;

export type EngineStatus = 'started' | 'stopped';

export type WinnersCellsTitles = {
  text: string;
  sortBy: WinnersParameters['sort'] | undefined;
};
