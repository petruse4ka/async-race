import { Component } from '@/components/base/component';
import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header/header';
import { ConnectionLostModal } from '@/components/modals/connection-lost-modal';
import { ErrorPage } from '@/pages/errors-page';
import { Garage } from '@/pages/garage';
import { Winners } from '@/pages/winners';
import { Router } from '@/router/router';
import { Route } from '@/types/types';

export class App extends Component {
  private header: Header;
  private garagePage: Garage;
  private winnersPage: Winners | undefined = undefined;
  private errorPage: ErrorPage | undefined = undefined;
  private footer: Footer;
  private router: Router;
  private currentPage: Component;

  constructor() {
    super({ tag: 'div', className: 'app' });
    this.header = new Header();
    this.footer = new Footer();
    this.garagePage = new Garage();
    this.winnersPage = new Winners();
    this.currentPage = this.garagePage;
    new ConnectionLostModal();

    this.router = new Router(Route.Garage);
    this.setupRoutes();
    this.render();
  }

  protected render(): void {
    this.container.append(
      this.header.getElement(),
      this.currentPage.getElement(),
      this.footer.getElement()
    );
  }

  private setupRoutes(): void {
    this.router.addRoute(Route.Garage, () => this.showGaragePage());
    this.router.addRoute(Route.Winners, () => this.showWinnersPage());
    this.router.addRoute(Route.Error, () => this.showErrorPage());
  }

  private showGaragePage(): void {
    if (this.currentPage !== this.garagePage) {
      this.currentPage.getElement().remove();
      this.currentPage = this.garagePage;
      this.container.insertBefore(this.currentPage.getElement(), this.footer.getElement());
    }
  }

  private showWinnersPage(): void {
    if (this.currentPage !== this.winnersPage) {
      this.currentPage.getElement().remove();
      if (this.winnersPage !== undefined) {
        this.currentPage = this.winnersPage;
      }
      this.container.insertBefore(this.currentPage.getElement(), this.footer.getElement());
    }
  }

  private showErrorPage(): void {
    if (!this.errorPage) {
      this.errorPage = new ErrorPage();
    }

    if (this.currentPage !== this.errorPage) {
      this.currentPage.getElement().remove();
      this.currentPage = this.errorPage;
      this.container.insertBefore(this.currentPage.getElement(), this.footer.getElement());
    }
  }
}
