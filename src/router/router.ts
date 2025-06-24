import type { ActionHandler } from '@/types/types';
import { Route } from '@/types/types';

export class Router {
  private routes: Map<Route, ActionHandler>;
  private garageRoute: Route;

  constructor(garageRoute: Route) {
    this.routes = new Map();
    this.garageRoute = garageRoute;

    this.setDefaultRoute();
    this.setEventListeners();
  }

  public static followRoute(route: Route): void {
    globalThis.location.hash = route;
  }

  private static checkRouteValidity(hash: string): hash is Route {
    const validRoutes = new Set<string>([Route.Garage, Route.Winners, Route.Error]);
    return validRoutes.has(hash);
  }

  public addRoute(route: Route, handler: ActionHandler): void {
    this.routes.set(route, handler);
  }

  private setDefaultRoute(): void {
    if (!globalThis.location.hash) {
      globalThis.location.hash = this.garageRoute;
    }
  }

  private setEventListeners(): void {
    globalThis.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  private handleRoute(): void {
    const currentHash = globalThis.location.hash || this.garageRoute;
    const route = Router.checkRouteValidity(currentHash) ? currentHash : Route.Error;
    const handler = this.routes.get(route);

    if (handler) {
      handler();
    } else {
      Router.followRoute(this.garageRoute);
    }
  }
}
