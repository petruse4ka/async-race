var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
class ElementBuilder {
  constructor(parameters) {
    __publicField(this, "element");
    this.element = document.createElement(parameters.tag);
    this.applyCssClasses(parameters.className);
    this.applyTextContent(parameters.textContent);
    this.applyCallback(parameters.callback, parameters.eventType);
  }
  getElement() {
    return this.element;
  }
  removeElement() {
    this.element.remove();
  }
  applyCssClasses(className) {
    if (className) {
      if (Array.isArray(className)) {
        this.element.classList.add(...className);
      } else {
        this.element.classList.add(className);
      }
    }
  }
  applyTextContent(text) {
    if (text) {
      this.element.textContent = text;
    }
  }
  applyCallback(callback, eventType = "click") {
    if (callback) {
      this.element.addEventListener(eventType, callback);
    }
  }
}
class Component {
  constructor(parameters) {
    __publicField(this, "container");
    this.container = new ElementBuilder(parameters).getElement();
  }
  getElement() {
    return this.container;
  }
  remove() {
    this.container.remove();
  }
}
var Route = /* @__PURE__ */ ((Route2) => {
  Route2["Garage"] = "#/";
  Route2["Winners"] = "#/winners";
  Route2["Error"] = "#/error";
  return Route2;
})(Route || {});
var Paths = /* @__PURE__ */ ((Paths2) => {
  Paths2["Garage"] = "/garage";
  Paths2["Winners"] = "/winners";
  Paths2["Engine"] = "/engine";
  return Paths2;
})(Paths || {});
var MenuItems = /* @__PURE__ */ ((MenuItems2) => {
  MenuItems2["Garage"] = "Garage";
  MenuItems2["Winners"] = "Winners";
  return MenuItems2;
})(MenuItems || {});
var ApiMethods = /* @__PURE__ */ ((ApiMethods2) => {
  ApiMethods2["Get"] = "GET";
  ApiMethods2["Post"] = "POST";
  ApiMethods2["Delete"] = "DELETE";
  ApiMethods2["Put"] = "PUT";
  ApiMethods2["Patch"] = "PATCH";
  return ApiMethods2;
})(ApiMethods || {});
const APP_TITLE = "Async Race";
const GITHUB_URL = "https://github.com/petruse4ka";
const AUTHOR_NAME = "Konstantin Petrov";
const COPYRIGHT_TEXT = "© 2025";
const MENU_ITEMS = [
  { name: MenuItems.Garage, route: Route.Garage },
  { name: MenuItems.Winners, route: Route.Winners }
];
const API_BASE_URL = "http://127.0.0.1:3000";
const DEFAULT_COLOR = "#8c5dbb";
const CAR_BRANDS = [
  "Subaru",
  "Mitsubishi",
  "Toyota",
  "BMW",
  "Nissan",
  "Audi",
  "Porsche",
  "Ferrari",
  "Lamborghini",
  "Mazda"
];
const CAR_MODELS = [
  "Imprezza",
  "Evolution XI",
  "Supra",
  "M3",
  "Skyline",
  "R8",
  "911 GTR-3",
  "Testarossa",
  "Huracan",
  "RX-7"
];
const COLOR_PARAMETERS = {
  maxColorLength: 6,
  colorCodes: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
};
const CARS_PER_PAGE = 7;
const WINNERS_PER_PAGE = 10;
const FLAG_WIDTH = 40;
const CAR_WIDTH = 100;
const RACING_QUOTES = [
  "It doesn`t matter whether you win by an inch or a mile, winning is winning",
  "Aerodynamics are for people who can`t build engines",
  "I live my life a quarter-mile at a time",
  "Nobody remembers the guy who finished second but the guy who finished second",
  "Faster, faster, faster, until the thrill of speed overcomes the fear of death."
];
const WINNERS_GRID_CELLS = [
  { text: "#", sortBy: void 0 },
  { text: "ID ⇵", sortBy: "id" },
  { text: "Car", sortBy: void 0 },
  { text: "Name", sortBy: void 0 },
  { text: "Wins ⇵", sortBy: "wins" },
  { text: "Time ⇵", sortBy: "time" }
];
const TEXT_COLORS = {
  default: "#9494a6",
  racePreparation: "#feb236",
  raceFinished: "#58b368"
};
class LinkBuilder extends ElementBuilder {
  constructor(parameters) {
    super({ ...parameters });
    this.applyURL(parameters.href);
    this.applyTarget(parameters.target);
  }
  applyURL(url) {
    if (url && this.element instanceof HTMLAnchorElement) {
      this.element.href = url;
    }
  }
  applyTarget(target) {
    if (target && this.element instanceof HTMLAnchorElement) {
      this.element.target = target;
    }
  }
}
class Copyright extends Component {
  constructor() {
    super({ tag: "div", className: "footer__copyright" });
    this.render();
  }
  render() {
    const copyrightText = new ElementBuilder({
      tag: "p",
      className: "copyright__text",
      textContent: `${COPYRIGHT_TEXT} `
    }).getElement();
    const githubLink = new LinkBuilder({
      tag: "a",
      className: "footer__link",
      textContent: AUTHOR_NAME,
      href: GITHUB_URL,
      target: "_blank"
    }).getElement();
    this.container.append(githubLink, copyrightText);
  }
}
class Footer extends Component {
  constructor() {
    super({ tag: "footer", className: "footer" });
    __publicField(this, "copyright");
    this.copyright = new Copyright();
    this.render();
  }
  render() {
    this.container.append(this.copyright.getElement());
  }
}
class HeaderMenu extends Component {
  constructor() {
    super({ tag: "ul", className: "header__menu" });
    this.render();
  }
  render() {
    for (const item of MENU_ITEMS) {
      const menuItem = new ElementBuilder({
        tag: "li",
        className: "menu__item",
        textContent: item.name
      }).getElement();
      menuItem.addEventListener("click", () => {
        globalThis.location.hash = item.route;
      });
      globalThis.addEventListener("raceStarted", () => {
        menuItem.classList.add("menu__item--disabled");
      });
      globalThis.addEventListener("carStarted", () => {
        menuItem.classList.add("menu__item--disabled");
      });
      globalThis.addEventListener("raceFinished", () => {
        menuItem.classList.remove("menu__item--disabled");
      });
      globalThis.addEventListener("carFinished", () => {
        menuItem.classList.remove("menu__item--disabled");
      });
      globalThis.addEventListener("carsStartedRacing", () => {
        menuItem.classList.remove("menu__item--disabled");
      });
      globalThis.addEventListener("carStartedDriving", () => {
        menuItem.classList.remove("menu__item--disabled");
      });
      this.container.append(menuItem);
    }
  }
}
class Header extends Component {
  constructor() {
    super({ tag: "header", className: "header" });
    __publicField(this, "menu");
    this.menu = new HeaderMenu();
    this.render();
  }
  render() {
    const container = new ElementBuilder({
      tag: "div",
      className: "header__container"
    }).getElement();
    const logo = new ElementBuilder({
      tag: "h1",
      className: "header__logo",
      textContent: APP_TITLE
    }).getElement();
    container.append(logo, this.menu.getElement());
    this.container.append(container);
  }
}
const carIcon = "" + new URL("no-connection-7TADfF__.png", import.meta.url).href;
class ImageBuilder extends ElementBuilder {
  constructor(parameters) {
    super({ ...parameters });
    this.applySource(parameters.source);
    this.applyAlt(parameters.alt);
  }
  applySource(source) {
    if (source && this.element instanceof HTMLImageElement) {
      this.element.src = source;
    }
  }
  applyAlt(alt) {
    if (alt && this.element instanceof HTMLImageElement) {
      this.element.alt = alt;
    }
  }
}
class ButtonBuilder extends ElementBuilder {
  constructor(parameters) {
    super({ ...parameters });
    this.setButtonType(parameters.type);
  }
  disableButton() {
    this.element.classList.add("button--disabled");
    if (this.element instanceof HTMLButtonElement) {
      this.element.disabled = true;
    }
  }
  enableButton() {
    this.element.classList.remove("button--disabled");
    if (this.element instanceof HTMLButtonElement) {
      this.element.disabled = false;
    }
  }
  setButtonType(type) {
    if (type && this.element instanceof HTMLInputElement) {
      this.element.type = type;
    }
  }
}
class Modal extends Component {
  constructor(className) {
    super({ tag: "dialog", className: ["modal", ...className] });
    __publicField(this, "modalContent");
    __publicField(this, "isOpen", false);
    __publicField(this, "closeButton");
    this.modalContent = new ElementBuilder({
      tag: "div",
      className: "modal__content"
    }).getElement();
    this.closeButton = new ButtonBuilder({
      type: "button",
      tag: "button",
      className: "modal__close-button",
      textContent: "×",
      callback: () => this.close()
    }).getElement();
    this.container.addEventListener("click", (event) => {
      if (event.target === this.container) {
        this.close();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && this.isOpen) {
        this.close();
      }
    });
    this.render();
  }
  open() {
    if (!this.isOpen) {
      document.body.append(this.container);
      document.body.style.overflow = "hidden";
      if (this.container instanceof HTMLDialogElement) {
        this.container.showModal();
      }
      this.isOpen = true;
    }
  }
  close() {
    if (this.isOpen) {
      if (this.container instanceof HTMLDialogElement) {
        this.container.close();
      }
      document.body.style.overflow = "";
      this.container.remove();
      this.isOpen = false;
    }
  }
  render() {
    this.modalContent.append(this.closeButton);
    this.container.append(this.modalContent);
    this.renderChildren();
  }
}
class ConnectionLostModal extends Modal {
  constructor() {
    super(["connection-lost-modal"]);
    this.addEventListeners();
  }
  renderChildren() {
    const messageContainer = new ElementBuilder({
      tag: "div",
      className: "connection-lost-modal__message"
    }).getElement();
    const heading = new ElementBuilder({
      tag: "h2",
      className: "connection-lost-modal__heading",
      textContent: "Connection Lost"
    }).getElement();
    const image = new ImageBuilder({
      tag: "img",
      className: "connection-lost-modal__image",
      source: carIcon,
      alt: "Broken down car"
    }).getElement();
    const message = new ElementBuilder({
      tag: "p",
      className: "connection-lost-modal__text",
      textContent: "Unfortunately, connection to the remote server has been lost or cannot be established"
    }).getElement();
    messageContainer.append(heading, image, message);
    this.modalContent.append(messageContainer);
  }
  addEventListeners() {
    globalThis.addEventListener("connectionLost", () => {
      if (!this.isOpen) {
        this.open();
      }
    });
  }
}
class Button extends Component {
  constructor(parameters) {
    super({ tag: "div", className: "button-container" });
    __publicField(this, "button");
    this.button = new ButtonBuilder({
      tag: "button",
      type: "button",
      className: ["button", ...parameters.className],
      textContent: parameters.textContent,
      callback: parameters.callback
    });
    this.render();
  }
  disable() {
    this.button.disableButton();
  }
  enable() {
    this.button.enableButton();
  }
  render() {
    this.container.append(this.button.getElement());
  }
}
class HomepageButton extends Button {
  constructor(callback) {
    super({
      className: ["button--homepage"],
      textContent: "Go to Homepage",
      callback
    });
  }
}
class Router {
  constructor(garageRoute) {
    __publicField(this, "routes");
    __publicField(this, "garageRoute");
    this.routes = /* @__PURE__ */ new Map();
    this.garageRoute = garageRoute;
    this.setDefaultRoute();
    this.setEventListeners();
  }
  static followRoute(route) {
    globalThis.location.hash = route;
  }
  static checkRouteValidity(hash) {
    const validRoutes = /* @__PURE__ */ new Set([Route.Garage, Route.Winners, Route.Error]);
    return validRoutes.has(hash);
  }
  addRoute(route, handler) {
    this.routes.set(route, handler);
  }
  setDefaultRoute() {
    if (!globalThis.location.hash) {
      globalThis.location.hash = this.garageRoute;
    }
  }
  setEventListeners() {
    globalThis.addEventListener("hashchange", () => this.handleRoute());
    window.addEventListener("load", () => this.handleRoute());
  }
  handleRoute() {
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
class ErrorPage extends Component {
  constructor() {
    super({ tag: "main", className: "error" });
    this.render();
  }
  render() {
    const errorSection = new ElementBuilder({
      tag: "div",
      className: ["error__container"]
    }).getElement();
    const heading = new ElementBuilder({
      tag: "h2",
      className: ["error__heading"],
      textContent: "Page Not Found"
    }).getElement();
    const message = new ElementBuilder({
      tag: "p",
      className: ["error__message"],
      textContent: "Something went wrong! The page does not exist."
    }).getElement();
    const homeButton = new HomepageButton(() => Router.followRoute(Route.Garage));
    errorSection.append(heading, message, homeButton.getElement());
    this.container.append(errorSection);
  }
}
function isCar(value) {
  return typeof value === "object" && value !== null && Object.prototype.hasOwnProperty.call(value, "id") && Object.prototype.hasOwnProperty.call(value, "name") && Object.prototype.hasOwnProperty.call(value, "color");
}
function isCars(value) {
  return Array.isArray(value) && value.length > 0 && value.every((item) => isCar(item));
}
function isWinner(value) {
  return typeof value === "object" && value !== null && Object.prototype.hasOwnProperty.call(value, "id") && Object.prototype.hasOwnProperty.call(value, "wins") && Object.prototype.hasOwnProperty.call(value, "time");
}
function isWinners(value) {
  return Array.isArray(value) && value.every((item) => isWinner(item));
}
function isEngine(value) {
  return typeof value === "object" && value !== null && Object.prototype.hasOwnProperty.call(value, "velocity") && Object.prototype.hasOwnProperty.call(value, "distance");
}
function isDrive(value) {
  return typeof value === "object" && value !== null && Object.prototype.hasOwnProperty.call(value, "success");
}
class ApiRequest {
  constructor() {
    __publicField(this, "baseUrl");
    this.baseUrl = API_BASE_URL;
  }
  async get(path, typeGuard, signal) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: ApiMethods.Get,
      signal
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    if (typeGuard(data)) {
      return data;
    }
    throw new Error("Invalid response format");
  }
  async post(path, data, typeGuard, signal) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: ApiMethods.Post,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      signal
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const responseData = await response.json();
    if (typeGuard(responseData)) {
      return responseData;
    }
    throw new Error("Invalid response format");
  }
  async delete(path, signal) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: ApiMethods.Delete,
      signal
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
  }
  async put(path, data, typeGuard, signal) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: ApiMethods.Put,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      signal
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const responseData = await response.json();
    if (typeGuard(responseData)) {
      return responseData;
    }
    throw new Error("Invalid response format");
  }
  async patch(path, data, typeGuard, signal) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: ApiMethods.Patch,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      signal
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const responseData = await response.json();
    if (typeGuard(responseData)) {
      return responseData;
    }
    throw new Error("Invalid response format");
  }
}
class GarageRequests extends ApiRequest {
  constructor() {
    super();
  }
  async getCars() {
    return this.get(`${Paths.Garage}`, isCars);
  }
  async createCar(car) {
    return this.post(Paths.Garage, car, isCar);
  }
  async deleteCar(id) {
    return this.delete(`${Paths.Garage}/${id}`);
  }
  async updateCar(id, car) {
    return this.put(`${Paths.Garage}/${id}`, car, isCar);
  }
}
class CarGenerator {
  constructor() {
  }
  static generateRandomCars(count) {
    return Array.from({ length: count }, () => this.generateRandomCar());
  }
  static getRandomIndex(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
  static getRandomColor() {
    let color = "#";
    for (let index = 0; index < COLOR_PARAMETERS.maxColorLength; index += 1) {
      color += this.getRandomIndex(COLOR_PARAMETERS.colorCodes);
    }
    return color;
  }
  static generateRandomCar() {
    const randomBrand = this.getRandomIndex(CAR_BRANDS);
    const randomModel = this.getRandomIndex(CAR_MODELS);
    const randomColor = this.getRandomColor();
    return {
      name: `${randomBrand} ${randomModel}`,
      color: randomColor
    };
  }
}
class NextButton extends Button {
  constructor(callback) {
    super({
      className: ["button--next"],
      textContent: "→",
      callback
    });
  }
}
class PreviousButton extends Button {
  constructor(callback) {
    super({
      className: ["button--prev"],
      textContent: "←",
      callback
    });
  }
}
class Paginator extends Component {
  constructor(onPreviousPage, onNextPage) {
    super({ tag: "div", className: "paginator" });
    __publicField(this, "prevButton");
    __publicField(this, "nextButton");
    __publicField(this, "pageNumber");
    __publicField(this, "onPrevPage");
    __publicField(this, "onNextPage");
    this.onPrevPage = onPreviousPage;
    this.onNextPage = onNextPage;
    this.pageNumber = new ElementBuilder({
      tag: "span",
      className: "paginator__page",
      textContent: "Page #1"
    }).getElement();
    this.prevButton = new PreviousButton(() => this.showPreviousPage());
    this.nextButton = new NextButton(() => this.showNextPage());
    this.render();
  }
  updatePageNumber(page) {
    this.pageNumber.textContent = `Page #${page}`;
  }
  render() {
    this.container.append(
      this.prevButton.getElement(),
      this.pageNumber,
      this.nextButton.getElement()
    );
  }
  showPreviousPage() {
    this.onPrevPage();
  }
  showNextPage() {
    this.onNextPage();
  }
}
class GenerateCarsButton extends Button {
  constructor(callback) {
    super({
      className: ["button--generate-cars"],
      textContent: "Generate Cars",
      callback
    });
    this.addEventListeners();
  }
  addEventListeners() {
    globalThis.addEventListener("raceStarted", () => {
      this.disable();
    });
    globalThis.addEventListener("raceFinished", () => {
      this.enable();
    });
  }
}
class WinnerRequests extends ApiRequest {
  constructor() {
    super();
  }
  async getWinners(parameters) {
    let url = `${Paths.Winners}`;
    if (parameters) {
      const queryParameters = new URLSearchParams();
      if (parameters.sort) {
        queryParameters.append("_sort", parameters.sort);
      }
      if (parameters.order) {
        queryParameters.append("_order", parameters.order);
      }
      const queryString = queryParameters.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    return this.get(url, isWinners);
  }
  async createWinner(winner) {
    return this.post(Paths.Winners, winner, isWinner);
  }
  async deleteWinner(id) {
    return this.delete(`${Paths.Winners}/${id}`);
  }
  async updateWinner(id, winner) {
    return this.put(`${Paths.Winners}/${id}`, winner, isWinner);
  }
}
const finishIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADyQAAA8kB9RSRGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAdGSURBVHic7Z17iB1XHcc/Z8/e3aptYxsbK4otRTE6tvZlaBuDYivIQqVCTLBiRE9FTDQiDYhYKoKWqlmhpk/jxGoTlF1CKDQVC8VGu0naPDCmx9bUaPPSxGQTbdKku9lzxz/mrjTNTcncnTtnZs7vA4dlGeZ3vpfz2bPzumdUkiR0wkfmLZrfhG8q+ACwgyS5b2T4/l90VEzwhupEgBvmL1qiEn7cZtMPRobuu2PqsYSiyCzAtfO+Mq2f3v3AOW02TyQ0L10/9MC+XNIJXacn6w59SeNa2g8+QK9SvddNLZJQJJkFUHDRG293b7hdKBeZBRDqRW+nO14y3fHhd5/kPTMmOOkU4xPw1wMNtuzp6cszoNBdMgtw66wTM2++/FUuOrfZZusY9DWWuue+9A2U6iWdYdo1BewCNgGbWz+f01F8ssPPIXRIZgEuPs9d2H7wWwV7VQOlLjuLUhcAVwJfbv0+5qzZRirDRmCNjuJXsuYTslGmY4B+YBawCHgE2OusWeqsudRrqppTJgFez1uB24Gdzpo1zpqPec5TSzo+CCyQHuAW4BZnzZ+BnwK/kuOFfCjzDNCOK4CfAxucNe/3HaYOVE2ASa4BtjhrFjtrlO8wVaaqAgC8CbgHeMJZ8y7fYapKlQWY5CZgu7PmVt9BqkgdBID0jGGVs+Y3zpppvsNUiboIMMl8YJuzZrbvIFWhbgIAXAKsc9bc6azRvsOUnToKAKCB7wG/d9bM9B2mzNRVgEnmANZZM+ysucp3mDJSdwEg/Yxzga3OmrVyfHAqVbgUnCcDwICzZh2wDHhCR/FRz5m8EpoAk3y01cZbMjwGbACsjuLjXpMVTKgCTNIHfKLVAJrOmp3AdmAf8EqrHQfGSa83vK3Vprfa+cC5wDFgFDjcaqOtGhuBzTqKx4r5SNkIXYDX0wO8t9XyZNxZsxVYAzyio/hfOdfvGBGgGPqA61rtLmfN74CY9Kmnzr6alRMhnAWUDU16MLoa2OismeUzjAjgl1mkEqxw1szwEUAE8I8Cvkh6D+PKojsXAcrDxcAfnDU3FdmpCFAuzgMeL/LZBhGgfDSAlc6arxXRmQhQThSwzFlze7c7EgHKzVJnzXe62YEIUH6+76xZ7qx5czeKiwDV4DbSx+BzP00UAarDTOAZZ8238pwNRIBq0QfcDexx1tzlrHnHVAuKANXkQuDbwEvOml86az7UaSG5G1ht+oAFwAJnzZPAz4CndBT/+2wLiAD14cZWw1nzArAOeBY4BBwB/gPs1VF85LU7iQD1YxR44TXt/wK0+0q9CFAPjgMPAw8B27M8ZCICVJsDwL3AAzqKRzspIAJUk+eBQWDlVB82FQGqxWHgq8BwXs8SigDV4Sng8zqK9+ZZVC4ElZ8mcAdwY96DDzIDlB0HfEFH8apudSAClJeTwGd1FK/uZiciQDk5AczVUfx4tzsSAcrHEeBmHcUjRXQmApSLvcAndRTbojqUs4Dy8BfghiIHH0SAMnAC+C5wjY7iPUV3Lv8C/DIMLNFRvNtXABGgeI4AvwZW6Cje4juMCFAMu4H1pAtEPFqm1UJEgFPZT7o8zHbSI/KjpEu/HAXGOHWJmMllYi4AppEuJdN2iRgdxaV9kWboAvwTWEtrkSgdxQc95ymcEAWYAFaRLhO31fcSLb4JSYBXgRXAj3QU7/IdpiyEIMAx4EFgUEfxft9hykbdBVgFLNZRfNh3kLJSVwFeBhZ28z56XaijABuAz+ko/ofvIFWgTvcCJkjfETBHBv/sqcsM8CLpA5PP+A5SNeowAzwEXCWD3xlVngEOALfpKH7Md5AqU9UZ4FHgchn8qVOlGaBJet3+Hh3FT/oOUxeqIMDLpJdw79VRvNN3mLpRZgF2kN6weVhH8THfYepKxwIcOtbDpt0N/nZQ0+iB/t6E973dMeeDJKQrXWbl78BmYBPpa1ZGQr9TVwSZBXh6Z/+O1dvOYddo+5dyLmF85aeudtNRqpf05QhnartIB3sz6Tt15Hq9BzIL8OxLjUOoM/9hDq5trP/0guUPTimVUBhVPQ0UckIECBwRIHBEgMARAQJHBAgcESBwRIDAEQECRwQIHBEgcESAwBEBAkcECBwRIHBEgMARAQJHBAgcESBwRIDAEQECRwQIHBEgcESAwBEBAkcECBwRIHBEgMARAQJHBAgcESBwRIDAEQECRwQIHBEgcESAwBEBAkcECBwRIHBEgMARAQJHBAgcESBwVJKced3fgYHF/f89311BU82ERKc7cFmC+vgZC6pkJIHnAZKEplLqxYS+P60f+smJ3NMLU6atAEopNfszCxc14W4Fb8mhnzES7nynOjg4NDTkcqgn5ETbfwHXz104mMCynAYfoB/FD/epGctzqifkxGkzwPXzvz67J2n+kc5e+nA2HQ48PXz/b7tRW8jOaTOAxs2lS4MPkCg1r1u1heycJkCSqKu72aGCrtYXstHmGCCZ1s0OE+hqfSEb/wOAjOx3hPqJ1gAAAABJRU5ErkJggg==";
class EngineRequests extends ApiRequest {
  constructor() {
    super();
  }
  async startStopEngine(id, status, signal) {
    return this.patch(`${Paths.Engine}?id=${id}&status=${status}`, {}, isEngine, signal);
  }
  async switchEngine(id, signal) {
    return this.patch(`${Paths.Engine}?id=${id}&status=drive`, {}, isDrive, signal);
  }
}
class CarAnimation {
  constructor(car, road, carId) {
    __publicField(this, "car");
    __publicField(this, "road");
    __publicField(this, "carId");
    __publicField(this, "engineRequests");
    __publicField(this, "animationFrameId");
    __publicField(this, "startTime");
    this.car = car;
    this.road = road;
    this.carId = carId;
    this.engineRequests = new EngineRequests();
  }
  async startEngine(signal) {
    try {
      const engineResponse = await this.engineRequests.startStopEngine(
        this.carId,
        "started",
        signal
      );
      if (signal == null ? void 0 : signal.aborted) return;
      return {
        velocity: engineResponse.velocity,
        distance: engineResponse.distance
      };
    } catch (error) {
      if (signal == null ? void 0 : signal.aborted) return;
      console.error("Failed to start engine:", error);
      throw error;
    }
  }
  async stopEngine(signal) {
    try {
      await this.engineRequests.startStopEngine(this.carId, "stopped", signal);
      if (signal == null ? void 0 : signal.aborted) return;
    } catch (error) {
      if (signal == null ? void 0 : signal.aborted) return;
      console.error("Failed to stop engine:", error);
      throw error;
    }
  }
  async startCar(velocity, distance, signal) {
    try {
      this.car.style.transform = "translateX(0)";
      if (signal == null ? void 0 : signal.aborted) return;
      const carAnimation = this.animate(velocity, distance);
      void (async () => {
        try {
          await this.engineRequests.switchEngine(this.carId, signal);
          if (signal == null ? void 0 : signal.aborted) return;
        } catch (error) {
          if (signal == null ? void 0 : signal.aborted) return;
          if (error instanceof Error && error.message.includes("500")) {
            console.error("Engine has broken down");
            const carBreakdownEvent = new CustomEvent("carBreakdown", {
              detail: { carId: this.carId }
            });
            globalThis.dispatchEvent(carBreakdownEvent);
            await this.stopCar();
          }
        }
      })();
      await carAnimation;
    } catch (error) {
      if (signal == null ? void 0 : signal.aborted) return;
      console.error("Failed to start car:", error);
      throw error;
    }
  }
  async stopCar(signal) {
    if (this.animationFrameId !== void 0) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = void 0;
    }
    await this.stopEngine(signal);
  }
  returnCar() {
    this.car.style.transform = "translateX(0)";
  }
  getCarId() {
    return this.carId;
  }
  animate(velocity, distance) {
    return new Promise((resolve) => {
      this.startTime = performance.now();
      const roadLength = this.road.offsetWidth;
      if (roadLength === 0) {
        resolve();
        return;
      }
      const totalDistance = roadLength - CAR_WIDTH - FLAG_WIDTH;
      const animationDuration = distance / velocity;
      const animateCar = () => {
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
class StartCarButton extends Button {
  constructor(callback) {
    super({
      className: ["button--start-car"],
      textContent: "Start",
      callback
    });
  }
}
class StopCarButton extends Button {
  constructor(callback) {
    super({
      className: ["button--stop-car"],
      textContent: "Stop",
      callback
    });
  }
}
class CarAnimationControls extends Component {
  constructor(carIcon2, road, carId) {
    super({ tag: "div", className: "cars__list--animation-controls" });
    __publicField(this, "startButton");
    __publicField(this, "stopButton");
    __publicField(this, "carAnimation");
    __publicField(this, "abortController");
    __publicField(this, "isDriving", false);
    __publicField(this, "isRacing", false);
    this.carAnimation = new CarAnimation(carIcon2, road, carId);
    this.startButton = new StartCarButton(() => void this.startCar());
    this.stopButton = new StopCarButton(() => void this.stopCar());
    this.render();
    this.updateAnimateButtonStates();
  }
  async startCar(signal) {
    this.abortPreviousOperations();
    globalThis.dispatchEvent(new CustomEvent("carStarted"));
    if (!signal) {
      this.abortController = new AbortController();
      signal = this.abortController.signal;
    }
    try {
      this.isDriving = true;
      this.updateAnimateButtonStates();
      const engineData = await this.carAnimation.startEngine(signal);
      if (engineData) {
        globalThis.dispatchEvent(new CustomEvent("carStartedDriving"));
        await this.carAnimation.startCar(engineData.velocity, engineData.distance, signal);
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        globalThis.dispatchEvent(new CustomEvent("connectionLost"));
      }
      console.error("Failed to start car:", error);
    }
  }
  async stopCar() {
    this.abortPreviousOperations();
    this.abortController = new AbortController();
    const { signal } = this.abortController;
    try {
      this.isDriving = false;
      this.updateAnimateButtonStates();
      this.carAnimation.returnCar();
      await this.carAnimation.stopCar(signal);
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        globalThis.dispatchEvent(new CustomEvent("connectionLost"));
      }
      console.error("Failed to stop car:", error);
    }
  }
  getCarAnimation() {
    return this.carAnimation;
  }
  setDrivingState(stateDriving, stateRacing) {
    this.isDriving = stateDriving;
    this.isRacing = stateRacing;
    this.updateAnimateButtonStates();
  }
  render() {
    this.container.append(this.startButton.getElement(), this.stopButton.getElement());
  }
  updateAnimateButtonStates() {
    if (this.isDriving && !this.isRacing) {
      this.startButton.disable();
      this.stopButton.enable();
    } else if (!this.isDriving && this.isRacing) {
      this.startButton.disable();
      this.stopButton.disable();
    } else {
      this.startButton.enable();
      this.stopButton.disable();
    }
  }
  abortPreviousOperations() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = void 0;
    }
  }
}
class DeleteCarButton extends Button {
  constructor(callback) {
    super({
      className: ["button--delete-car"],
      textContent: "✖",
      callback
    });
    this.addEventListeners();
  }
  addEventListeners() {
    globalThis.addEventListener("raceStarted", () => {
      this.disable();
    });
    globalThis.addEventListener("raceFinished", () => {
      this.enable();
    });
  }
}
class EditCarButton extends Button {
  constructor(callback) {
    super({
      className: ["button--edit-car"],
      textContent: "⚙",
      callback
    });
    this.addEventListeners();
  }
  addEventListeners() {
    globalThis.addEventListener("raceStarted", () => {
      this.disable();
    });
    globalThis.addEventListener("raceFinished", () => {
      this.enable();
    });
  }
}
class CarControls extends Component {
  constructor(onEdit, onDelete) {
    super({ tag: "div", className: "cars__list-controls" });
    __publicField(this, "editButton");
    __publicField(this, "deleteButton");
    __publicField(this, "onEdit");
    __publicField(this, "onDelete");
    this.onEdit = onEdit;
    this.onDelete = onDelete;
    this.editButton = new EditCarButton(() => this.editCar());
    this.deleteButton = new DeleteCarButton(() => this.deleteCar());
    this.render();
  }
  disableButtons() {
    this.editButton.disable();
    this.deleteButton.disable();
  }
  enableButtons() {
    this.editButton.enable();
    this.deleteButton.enable();
  }
  render() {
    this.container.append(this.editButton.getElement(), this.deleteButton.getElement());
  }
  deleteCar() {
    this.onDelete();
  }
  editCar() {
    this.onEdit();
  }
}
class CancelButton extends Button {
  constructor(callback) {
    super({
      className: ["button--cancel"],
      textContent: "✖",
      callback
    });
    this.addEventListeners();
  }
  addEventListeners() {
    globalThis.addEventListener("raceStarted", () => {
      this.disable();
    });
    globalThis.addEventListener("raceFinished", () => {
      this.enable();
    });
  }
}
class UpdateCarButton extends Button {
  constructor(callback) {
    super({
      className: ["button--update-car"],
      textContent: "✓",
      callback
    });
    this.addEventListeners();
  }
  addEventListeners() {
    globalThis.addEventListener("raceStarted", () => {
      this.disable();
    });
    globalThis.addEventListener("raceFinished", () => {
      this.enable();
    });
  }
}
class InputBuilder extends ElementBuilder {
  constructor(parameters) {
    super({ ...parameters });
    this.setInputProperties(
      parameters.type,
      parameters.value,
      parameters.placeholder,
      parameters.readonly
    );
  }
  getValue() {
    if (this.element instanceof HTMLInputElement) {
      return this.element.value;
    }
    return "";
  }
  setValue(value) {
    if (this.element instanceof HTMLInputElement) {
      this.element.value = value;
    }
  }
  setInputProperties(type, value, placeholder, readonly) {
    if (this.element instanceof HTMLInputElement) {
      this.element.type = type;
    }
    if (value && this.element instanceof HTMLInputElement) {
      this.element.value = value;
    }
    if (placeholder && this.element instanceof HTMLInputElement) {
      this.element.placeholder = placeholder;
    }
    if (readonly && this.element instanceof HTMLInputElement) {
      this.element.readOnly = true;
    }
  }
}
class UpdateCarOption extends Component {
  constructor(car, onUpdate, onCancel) {
    super({ tag: "div", className: "update-car" });
    __publicField(this, "carNameInput");
    __publicField(this, "carColorInput");
    __publicField(this, "updateButton");
    __publicField(this, "cancelButton");
    __publicField(this, "garageRequests");
    __publicField(this, "car");
    __publicField(this, "onUpdate");
    __publicField(this, "onCancel");
    this.car = car;
    this.onUpdate = onUpdate;
    this.onCancel = onCancel;
    this.garageRequests = new GarageRequests();
    this.carNameInput = UpdateCarOption.createCarNameInput(car.name);
    this.carColorInput = UpdateCarOption.createColorInput(car.color);
    this.updateButton = new UpdateCarButton(() => {
      void this.updateCar();
    });
    this.cancelButton = new CancelButton(() => {
      this.cancelCarUpdate();
    });
    this.render();
    this.addEventListeners();
  }
  static createCarNameInput(carName) {
    const input = new InputBuilder({
      tag: "input",
      className: ["input__field", "input--update-name"],
      type: "text",
      value: carName,
      placeholder: "Add car brand",
      readonly: false
    });
    return input;
  }
  static createColorInput(carColor) {
    const input = new InputBuilder({
      tag: "input",
      className: ["input__field", "input--update-color"],
      type: "color",
      value: carColor,
      readonly: false
    });
    return input;
  }
  render() {
    this.container.append(
      this.carNameInput.getElement(),
      this.carColorInput.getElement(),
      this.updateButton.getElement(),
      this.cancelButton.getElement()
    );
  }
  addEventListeners() {
    this.carNameInput.getElement().addEventListener("focus", () => {
      this.carNameInput.getElement().classList.remove("input--error");
    });
  }
  async updateCar() {
    const name = this.carNameInput.getValue().trim();
    const color = this.carColorInput.getValue();
    if (!name || name.length === 0 || !color) {
      this.carNameInput.getElement().classList.add("input--error");
      return;
    }
    try {
      await this.garageRequests.updateCar(this.car.id, { name, color });
      this.carNameInput.getElement().classList.remove("input--error");
      const garageUpdated = new CustomEvent("garageUpdated");
      globalThis.dispatchEvent(garageUpdated);
      this.onUpdate();
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        globalThis.dispatchEvent(new CustomEvent("connectionLost"));
      }
      console.error("Error updating car:", error);
    }
  }
  cancelCarUpdate() {
    this.onCancel();
  }
}
class CarItem extends Component {
  constructor(car) {
    super({ tag: "div", className: "cars-list__item" });
    __publicField(this, "car");
    __publicField(this, "carControls");
    __publicField(this, "carAnimationControls");
    __publicField(this, "carHeader");
    __publicField(this, "isEditing", false);
    __publicField(this, "garageRequests");
    __publicField(this, "winnerRequests");
    this.car = car;
    this.garageRequests = new GarageRequests();
    this.winnerRequests = new WinnerRequests();
    this.carControls = new CarControls(
      () => this.editCar(),
      () => void this.deleteCar()
    );
    this.carHeader = this.createHeader();
    this.render();
    this.addEventListeners();
  }
  get animationControls() {
    return this.carAnimationControls;
  }
  getName() {
    return this.car.name;
  }
  getId() {
    return this.car.id;
  }
  render() {
    const carElement = new ElementBuilder({
      tag: "div",
      className: ["cars-list__car"]
    }).getElement();
    const carImage = new ElementBuilder({
      tag: "span",
      className: ["cars-list__car-icon"]
    }).getElement();
    carImage.style.backgroundColor = this.car.color;
    const road = new ElementBuilder({
      tag: "div",
      className: ["cars-list__road"]
    }).getElement();
    const finishFlag = new ImageBuilder({
      tag: "img",
      className: ["cars-list__finish-flag"],
      source: finishIcon,
      alt: "Finish line"
    }).getElement();
    road.append(finishFlag);
    this.carAnimationControls = new CarAnimationControls(carImage, road, this.car.id);
    carElement.append(this.carHeader, carImage, road, this.carAnimationControls.getElement());
    this.container.append(carElement);
  }
  createHeader() {
    const header = new ElementBuilder({
      tag: "div",
      className: ["cars-list__car-header"]
    }).getElement();
    this.updateHeader(header);
    return header;
  }
  updateHeader(header) {
    while (header.firstChild) {
      header.firstChild.remove();
    }
    if (this.isEditing) {
      const updateInputs = new UpdateCarOption(
        this.car,
        () => this.updateCar(),
        () => this.cancelCarUpdate()
      );
      header.append(updateInputs.getElement());
    } else {
      const carName = new ElementBuilder({
        tag: "span",
        className: ["cars-list__car-name"],
        textContent: this.car.name
      }).getElement();
      header.append(carName);
    }
    header.append(this.carControls.getElement());
  }
  editCar() {
    this.isEditing = true;
    this.carControls.editButton.disable();
    this.updateHeader(this.carHeader);
  }
  async deleteCar() {
    try {
      await this.garageRequests.deleteCar(this.car.id);
      const garageUpdated = new CustomEvent("garageUpdated");
      globalThis.dispatchEvent(garageUpdated);
      try {
        const winners = await this.winnerRequests.getWinners();
        const isWinner2 = winners.some((winner) => winner.id === this.car.id);
        if (isWinner2) {
          await this.winnerRequests.deleteWinner(this.car.id);
        }
      } catch (error) {
        if (error instanceof Error && error.message.includes("Failed to fetch")) {
          globalThis.dispatchEvent(new CustomEvent("connectionLost"));
        }
        console.error("Error deleting winner", error);
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        globalThis.dispatchEvent(new CustomEvent("connectionLost"));
      }
      console.error("Error deleting car:", error);
    }
  }
  updateCar() {
    this.isEditing = false;
    this.carControls.editButton.enable();
    this.updateHeader(this.carHeader);
  }
  cancelCarUpdate() {
    this.isEditing = false;
    this.carControls.editButton.enable();
    this.updateHeader(this.carHeader);
  }
  addEventListeners() {
    globalThis.addEventListener("raceStarted", () => {
      if (this.isEditing) {
        this.isEditing = false;
        this.updateHeader(this.carHeader);
      }
    });
  }
}
class CarsList extends Component {
  constructor() {
    super({ tag: "div", className: "cars-list" });
    __publicField(this, "cars", []);
    __publicField(this, "garageRequests");
    __publicField(this, "carsContainer");
    __publicField(this, "titleElement");
    __publicField(this, "paginator");
    __publicField(this, "currentPage", 1);
    __publicField(this, "carItems", []);
    this.garageRequests = new GarageRequests();
    this.paginator = new Paginator(
      () => this.showPreviousPage(),
      () => this.showNextPage()
    );
    this.render();
    this.addEventListeners();
  }
  getCars() {
    return this.carItems;
  }
  render() {
    this.createGarageContainer();
    void this.loadCars();
  }
  createGarageContainer() {
    const header = new ElementBuilder({
      tag: "div",
      className: ["cars-list__header"]
    }).getElement();
    this.titleElement = new ElementBuilder({
      tag: "h2",
      className: ["cars-list__title"],
      textContent: "Cars are loading..."
    }).getElement();
    const generateButton = new GenerateCarsButton(() => void this.generateCars());
    header.append(this.titleElement, generateButton.getElement());
    this.carsContainer = new ElementBuilder({
      tag: "div",
      className: ["cars-list__container"]
    }).getElement();
    this.container.append(header, this.carsContainer, this.paginator.getElement());
  }
  addEventListeners() {
    globalThis.addEventListener("garageUpdated", () => {
      void this.loadCars();
    });
    globalThis.addEventListener("raceStarted", () => {
      this.paginator.prevButton.disable();
      this.paginator.nextButton.disable();
    });
    globalThis.addEventListener("raceFinished", () => {
      this.paginator.prevButton.enable();
      this.paginator.nextButton.enable();
      this.updatePaginator();
    });
  }
  async loadCars() {
    try {
      this.cars = await this.garageRequests.getCars();
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        globalThis.dispatchEvent(new CustomEvent("connectionLost"));
      }
      console.error("Failed to load cars:", error);
      this.cars = [];
    } finally {
      if (this.cars.length === 0) {
        this.currentPage = 1;
      } else {
        const totalPages = Math.ceil(this.cars.length / CARS_PER_PAGE);
        if (this.currentPage > totalPages && totalPages > 0) {
          this.currentPage = totalPages;
        }
      }
      this.updateCarsList();
      const carsLoaded = new CustomEvent("carsLoaded");
      globalThis.dispatchEvent(carsLoaded);
    }
  }
  updateCarsList() {
    if (this.carsContainer !== void 0) {
      while (this.carsContainer.firstChild) {
        this.carsContainer.firstChild.remove();
      }
      if (this.titleElement) {
        this.titleElement.textContent = `All cars (${this.cars.length})`;
        this.carItems = [];
      }
      if (this.cars.length === 0) {
        const emptyMessage = new ElementBuilder({
          tag: "p",
          className: ["cars-list__empty"],
          textContent: "No cars in the garage yet"
        }).getElement();
        this.carsContainer.append(emptyMessage);
      } else {
        const startIndex = (this.currentPage - 1) * CARS_PER_PAGE;
        const endIndex = Math.min(startIndex + CARS_PER_PAGE, this.cars.length);
        const cars = this.cars.slice(startIndex, endIndex);
        for (const car of cars) {
          const carItem = new CarItem(car);
          this.carItems.push(carItem);
          this.carsContainer.append(carItem.getElement());
        }
      }
      this.updatePaginator();
    }
  }
  async generateCars() {
    try {
      const randomCars = CarGenerator.generateRandomCars(100);
      await Promise.all(randomCars.map((car) => this.garageRequests.createCar(car)));
      const garageUpdated = new CustomEvent("garageUpdated");
      globalThis.dispatchEvent(garageUpdated);
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        globalThis.dispatchEvent(new CustomEvent("connectionLost"));
      }
      console.error("Failed to generate cars:", error);
    }
  }
  showPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateCarsList();
      const carsLoaded = new CustomEvent("carsLoaded");
      globalThis.dispatchEvent(carsLoaded);
    }
  }
  showNextPage() {
    const totalPages = Math.ceil(this.cars.length / CARS_PER_PAGE);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updateCarsList();
      const carsLoaded = new CustomEvent("carsLoaded");
      globalThis.dispatchEvent(carsLoaded);
    }
  }
  updatePaginator() {
    const totalPages = Math.ceil(this.cars.length / CARS_PER_PAGE);
    this.paginator.updatePageNumber(this.currentPage);
    if (this.currentPage === 1 || totalPages === 0) {
      this.paginator.prevButton.disable();
    } else {
      this.paginator.prevButton.enable();
    }
    if (this.currentPage === totalPages || totalPages === 0) {
      this.paginator.nextButton.disable();
    } else {
      this.paginator.nextButton.enable();
    }
  }
}
class ResetRaceButton extends Button {
  constructor(callback) {
    super({
      className: ["button--reset-race"],
      textContent: "Reset Race",
      callback
    });
  }
}
class StartRaceButton extends Button {
  constructor(callback) {
    super({
      className: ["button--start-race"],
      textContent: "Start Race",
      callback
    });
  }
}
class RaceSection extends Component {
  constructor(carItems) {
    super({ tag: "section", className: "race-section" });
    __publicField(this, "startRaceButton");
    __publicField(this, "resetRaceButton");
    __publicField(this, "defaultMessage");
    __publicField(this, "raceSectionContainer");
    __publicField(this, "abortController");
    __publicField(this, "carItems", []);
    __publicField(this, "winnerRequests");
    this.carItems = carItems;
    this.winnerRequests = new WinnerRequests();
    this.raceSectionContainer = new ElementBuilder({
      tag: "div",
      className: ["race-section__container"]
    }).getElement();
    this.defaultMessage = new ElementBuilder({
      tag: "p",
      className: ["race-section__message"],
      textContent: RACING_QUOTES[Math.floor(Math.random() * RACING_QUOTES.length)]
    }).getElement();
    this.startRaceButton = new StartRaceButton(() => void this.startRace());
    this.resetRaceButton = new ResetRaceButton(() => void this.resetRace());
    this.render();
    this.updateButtonStates();
  }
  static dispatchRaceEvent(name) {
    const eventName = new CustomEvent(name);
    globalThis.dispatchEvent(eventName);
  }
  render() {
    const heading = new ElementBuilder({
      tag: "h2",
      className: ["race-section__heading"],
      textContent: "Find the fastest car"
    }).getElement();
    const buttonsContainer = new ElementBuilder({
      tag: "div",
      className: ["race-section__buttons-container"]
    }).getElement();
    buttonsContainer.append(this.startRaceButton.getElement(), this.resetRaceButton.getElement());
    this.raceSectionContainer.append(heading, this.defaultMessage, buttonsContainer);
    this.container.append(this.raceSectionContainer);
  }
  updateButtonStates() {
    if (this.carItems.length === 0) {
      this.startRaceButton.disable();
      this.resetRaceButton.disable();
      this.defaultMessage.textContent = "No cars available for racing";
    } else {
      this.startRaceButton.enable();
      this.resetRaceButton.disable();
    }
  }
  setTrueDrivingStates(stateDriving, stateRacing) {
    for (const carItem of this.carItems) {
      if (carItem.animationControls !== void 0) {
        const carAnimationControls = carItem.animationControls;
        carAnimationControls.setDrivingState(stateDriving, stateRacing);
      }
    }
  }
  setRacingStates() {
    this.startRaceButton.disable();
    this.setTrueDrivingStates(false, true);
    RaceSection.dispatchRaceEvent("raceStarted");
  }
  finishRace() {
    RaceSection.dispatchRaceEvent("raceFinished");
    this.setTrueDrivingStates(true, false);
  }
  updateRaceStatus() {
    this.resetRaceButton.enable();
    this.defaultMessage.textContent = "Cars are racing...";
  }
  async startRace() {
    this.abortPreviousOperations();
    const { signal } = new AbortController();
    try {
      this.setRacingStates();
      this.defaultMessage.style.color = TEXT_COLORS.racePreparation;
      this.defaultMessage.textContent = "Getting all the cars ready for a race...";
      const stopPromises = this.carItems.map((carItem) => {
        if (carItem.animationControls) {
          return carItem.animationControls.stopCar();
        }
        return Promise.resolve();
      });
      await Promise.all(stopPromises);
      const enginePromises = this.carItems.map((carItem) => {
        if (carItem.animationControls !== void 0) {
          const carAnimation = carItem.animationControls.getCarAnimation();
          return carAnimation.startEngine(signal);
        }
        return Promise.resolve();
      });
      this.defaultMessage.textContent = "Engines are warming up...";
      const startedEngines = await Promise.all(enginePromises);
      this.updateRaceStatus();
      if (startedEngines.length > 0) {
        await this.runRace(startedEngines, signal);
      } else {
        this.updateButtonStates();
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        globalThis.dispatchEvent(new CustomEvent("connectionLost"));
      }
      console.error("Race failed to start:", error);
      this.defaultMessage.textContent = "Race failed to start";
      this.updateButtonStates();
    } finally {
      this.finishRace();
    }
  }
  async runRace(startedEngines, signal) {
    globalThis.dispatchEvent(new CustomEvent("carsStartedRacing"));
    const carsPromises = startedEngines.map(async (engineData, index) => {
      const carItem = this.carItems[index];
      if (carItem.animationControls !== void 0 && engineData) {
        const carAnimation = carItem.animationControls.getCarAnimation();
        await carAnimation.startCar(engineData.velocity, engineData.distance, signal);
        return index;
      }
      return -1;
    });
    if (carsPromises.length > 0) {
      const winnerIndex = await Promise.race(carsPromises);
      if (winnerIndex === -2) {
        this.defaultMessage.textContent = "None of the cars finished the race";
      }
      if (winnerIndex >= 0 && startedEngines[winnerIndex]) {
        await this.processWinner(winnerIndex, startedEngines[winnerIndex]);
      }
    }
  }
  async processWinner(winnerIndex, engineData) {
    if (!engineData) return;
    const winningCar = this.carItems[winnerIndex];
    const winningTime = Number.parseFloat(
      (engineData.distance / engineData.velocity / 1e3).toFixed(2)
    );
    this.defaultMessage.style.color = TEXT_COLORS.raceFinished;
    this.defaultMessage.textContent = `The winner is: ${winningCar.getName()} (${winningTime}s)`;
    try {
      const winners = await this.winnerRequests.getWinners();
      const winnerID = winningCar.getId();
      const previousWinner = winners.find((winner) => winner.id === winnerID);
      await (previousWinner ? this.winnerRequests.updateWinner(winnerID, {
        wins: previousWinner.wins + 1,
        time: Math.min(previousWinner.time, winningTime)
      }) : this.winnerRequests.createWinner({
        id: winningCar.getId(),
        wins: 1,
        time: winningTime
      }));
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        globalThis.dispatchEvent(new CustomEvent("connectionLost"));
      }
      console.error("Failed to save winner:", error);
    } finally {
      const winnersUpdated = new CustomEvent("winnersUpdated");
      globalThis.dispatchEvent(winnersUpdated);
    }
  }
  async resetRace() {
    this.abortPreviousOperations();
    this.resetRaceButton.disable();
    try {
      this.defaultMessage.style.color = TEXT_COLORS.racePreparation;
      this.defaultMessage.textContent = "Race is resetting...";
      this.abortController = new AbortController();
      const { signal } = this.abortController;
      const carsResetPromises = this.carItems.map(async (carItem) => {
        if (carItem.animationControls !== void 0) {
          const carAnimation = carItem.animationControls.getCarAnimation();
          await carAnimation.stopCar(signal);
          carAnimation.returnCar();
          try {
            await carAnimation.stopEngine(signal);
          } catch (error) {
            if (error instanceof Error && error.message.includes("Failed to fetch")) {
              globalThis.dispatchEvent(new CustomEvent("connectionLost"));
            }
            console.error("Failed to stop engine:", error);
          }
          carItem.animationControls.setDrivingState(false, false);
        }
      });
      await Promise.all(carsResetPromises);
      this.abortController = void 0;
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        globalThis.dispatchEvent(new CustomEvent("connectionLost"));
      }
      console.error("Failed to reset race:", error);
    } finally {
      this.updateButtonStates();
      this.defaultMessage.style.color = TEXT_COLORS.default;
      this.defaultMessage.textContent = RACING_QUOTES[Math.floor(Math.random() * RACING_QUOTES.length)];
      const raceFinishedEvent = new CustomEvent("raceFinished");
      globalThis.dispatchEvent(raceFinishedEvent);
    }
  }
  abortPreviousOperations() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = void 0;
    }
  }
}
class CreateCarButton extends Button {
  constructor(callback) {
    super({
      className: ["button--create-car"],
      textContent: "Create",
      callback
    });
    this.addEventListeners();
  }
  addEventListeners() {
    globalThis.addEventListener("raceStarted", () => {
      this.disable();
    });
    globalThis.addEventListener("raceFinished", () => {
      this.enable();
    });
  }
}
class AddNewCarOption extends Component {
  constructor() {
    super({ tag: "div", className: "add-new-car" });
    __publicField(this, "carNameInput");
    __publicField(this, "carColorInput");
    __publicField(this, "createButton");
    __publicField(this, "garageRequests");
    this.garageRequests = new GarageRequests();
    this.carNameInput = AddNewCarOption.createCarNameInput();
    this.carColorInput = AddNewCarOption.createColorInput();
    this.createButton = new CreateCarButton(() => {
      void this.createCar();
    });
    this.render();
    this.addEventListeners();
  }
  static createCarNameInput() {
    const input = new InputBuilder({
      tag: "input",
      className: ["input__field", "input--add-new"],
      type: "text",
      value: "",
      placeholder: "Add car brand",
      readonly: false
    });
    return input;
  }
  static createColorInput() {
    const input = new InputBuilder({
      tag: "input",
      className: ["input__field", "input--color"],
      type: "color",
      value: DEFAULT_COLOR,
      readonly: false
    });
    return input;
  }
  render() {
    this.container.append(
      this.carNameInput.getElement(),
      this.carColorInput.getElement(),
      this.createButton.getElement()
    );
  }
  addEventListeners() {
    this.carNameInput.getElement().addEventListener("focus", () => {
      this.carNameInput.getElement().classList.remove("input--error");
    });
  }
  async createCar() {
    const name = this.carNameInput.getValue().trim();
    const color = this.carColorInput.getValue();
    if (!name || name.length === 0 || !color) {
      this.carNameInput.getElement().classList.add("input--error");
      return;
    }
    try {
      await this.garageRequests.createCar({ name, color });
      this.carNameInput.getElement().classList.remove("input--error");
      this.carNameInput.setValue("");
      this.carColorInput.setValue(DEFAULT_COLOR);
      const garageUpdated = new CustomEvent("garageUpdated");
      globalThis.dispatchEvent(garageUpdated);
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        globalThis.dispatchEvent(new CustomEvent("connectionLost"));
      }
      console.error("Error creating car:", error);
    }
  }
}
class GarageControls extends Component {
  constructor() {
    super({ tag: "div", className: "garage-controls" });
    __publicField(this, "newCarOption");
    this.newCarOption = new AddNewCarOption();
    this.render();
  }
  render() {
    this.container.append(this.newCarOption.getElement());
  }
}
class Garage extends Component {
  constructor() {
    super({ tag: "main", className: "garage" });
    __publicField(this, "GarageControls");
    __publicField(this, "carsList");
    __publicField(this, "raceSection");
    this.GarageControls = new GarageControls();
    this.carsList = new CarsList();
    this.raceSection = new RaceSection(this.carsList.getCars());
    this.render();
    this.addEventListeners();
  }
  render() {
    const title = new ElementBuilder({
      tag: "h1",
      className: "garage__title",
      textContent: "Garage"
    }).getElement();
    this.container.append(
      title,
      this.GarageControls.getElement(),
      this.raceSection.getElement(),
      this.carsList.getElement()
    );
  }
  addEventListeners() {
    globalThis.addEventListener("carsLoaded", () => {
      this.updateRaceSection();
    });
  }
  updateRaceSection() {
    const oldRaceSection = this.raceSection.getElement();
    this.raceSection = new RaceSection(this.carsList.getCars());
    oldRaceSection.replaceWith(this.raceSection.getElement());
  }
}
class WinnerItem extends Component {
  constructor(winner, car, index) {
    super({ tag: "div", className: "winners-grid__row" });
    __publicField(this, "winner");
    __publicField(this, "car");
    __publicField(this, "index");
    this.winner = winner;
    this.car = car;
    this.index = index;
    this.render();
  }
  render() {
    this.createIndexCell();
    this.createIDCell();
    this.createCarCell();
    this.createCarNameCell();
    this.createWinsCell();
    this.createTimeCell();
  }
  createIndexCell() {
    const indexCell = new ElementBuilder({
      tag: "div",
      className: ["winners-grid__cell"],
      textContent: this.index.toString()
    }).getElement();
    this.container.append(indexCell);
  }
  createIDCell() {
    const IDCell = new ElementBuilder({
      tag: "div",
      className: ["winners-grid__cell"],
      textContent: this.winner.id.toString()
    }).getElement();
    this.container.append(IDCell);
  }
  createCarCell() {
    const carCell = new ElementBuilder({
      tag: "div",
      className: ["winners-grid__cell"]
    }).getElement();
    if (this.car) {
      const carIcon2 = new ElementBuilder({
        tag: "span",
        className: ["winners-grid__car-icon"]
      }).getElement();
      carIcon2.style.backgroundColor = this.car.color;
      carCell.append(carIcon2);
    }
    this.container.append(carCell);
  }
  createCarNameCell() {
    const carNameCell = new ElementBuilder({
      tag: "div",
      className: ["winners-grid__cell", "winners-grid__cell--name"],
      textContent: this.car ? this.car.name : "Nameless car"
    }).getElement();
    this.container.append(carNameCell);
  }
  createWinsCell() {
    const winsCell = new ElementBuilder({
      tag: "div",
      className: ["winners-grid__cell"],
      textContent: this.winner.wins.toString()
    }).getElement();
    this.container.append(winsCell);
  }
  createTimeCell() {
    const timeCell = new ElementBuilder({
      tag: "div",
      className: ["winners-grid__cell"],
      textContent: `${this.winner.time.toString()} s`
    }).getElement();
    this.container.append(timeCell);
  }
}
class WinnersList extends Component {
  constructor() {
    super({ tag: "div", className: "winners-list" });
    __publicField(this, "winners", []);
    __publicField(this, "cars", []);
    __publicField(this, "winnerRequests");
    __publicField(this, "garageRequests");
    __publicField(this, "winnersContainer");
    __publicField(this, "titleElement");
    __publicField(this, "gridContainer");
    __publicField(this, "paginator");
    __publicField(this, "currentPage", 1);
    __publicField(this, "sortBy", "id");
    __publicField(this, "sortOrder", "ASC");
    this.winnerRequests = new WinnerRequests();
    this.garageRequests = new GarageRequests();
    this.paginator = new Paginator(
      () => this.showPreviousPage(),
      () => this.showNextPage()
    );
    this.render();
    this.addEventListeners();
  }
  render() {
    this.createWinnersContainer();
    this.createGrid();
  }
  createWinnersContainer() {
    const header = new ElementBuilder({
      tag: "div",
      className: ["winners-list__header"]
    }).getElement();
    this.titleElement = new ElementBuilder({
      tag: "h2",
      className: ["winners-list__title"],
      textContent: "Winners are loading..."
    }).getElement();
    header.append(this.titleElement);
    this.winnersContainer = new ElementBuilder({
      tag: "div",
      className: ["winners-list__container"]
    }).getElement();
    this.container.append(header, this.winnersContainer, this.paginator.getElement());
  }
  createGrid() {
    this.gridContainer = new ElementBuilder({
      tag: "div",
      className: ["winners-grid"]
    }).getElement();
    const gridHeader = new ElementBuilder({
      tag: "div",
      className: ["winners-grid__header"]
    }).getElement();
    for (const { text, sortBy } of WINNERS_GRID_CELLS) {
      const cell = new ElementBuilder({
        tag: "div",
        className: ["winners-grid__cell"],
        textContent: text
      }).getElement();
      if (sortBy) {
        cell.classList.add("winners-grid__cell--sort");
        cell.addEventListener("click", () => {
          this.sortWinners(sortBy);
        });
      }
      gridHeader.append(cell);
    }
    this.gridContainer.append(gridHeader);
    if (this.winnersContainer !== void 0) this.winnersContainer.append(this.gridContainer);
  }
  sortWinners(sortBy) {
    if (sortBy === this.sortBy) {
      this.sortOrder = this.sortOrder === "ASC" ? "DESC" : "ASC";
    } else {
      this.sortBy = sortBy;
      this.sortOrder = "ASC";
    }
    void this.loadWinners();
  }
  addEventListeners() {
    globalThis.addEventListener("carsLoaded", () => {
      void this.loadWinners();
    });
    globalThis.addEventListener("winnersUpdated", () => {
      void this.loadWinners();
    });
  }
  async loadWinners() {
    try {
      await this.loadCars();
      this.winners = await this.winnerRequests.getWinners({
        sort: this.sortBy,
        order: this.sortOrder
      });
      const totalPages = Math.ceil(this.winners.length / WINNERS_PER_PAGE);
      if (this.currentPage > totalPages && totalPages > 0) {
        this.currentPage = totalPages;
      } else if (totalPages === 0) {
        this.currentPage = 1;
      }
    } catch (error) {
      console.error("Failed to load winners:", error);
    } finally {
      this.updateWinnersList();
    }
  }
  async loadCars() {
    try {
      this.cars = await this.garageRequests.getCars();
    } catch (error) {
      console.error("Failed to load cars:", error);
    }
  }
  findCar(id) {
    return this.cars.find((car) => car.id === id);
  }
  updateWinnersList() {
    var _a;
    if (this.gridContainer !== void 0) {
      while (this.gridContainer.children.length > 1) {
        (_a = this.gridContainer.lastChild) == null ? void 0 : _a.remove();
      }
      if (this.titleElement !== void 0) {
        this.titleElement.textContent = `All winners (${this.winners.length})`;
      }
      if (this.winners.length === 0) {
        const emptyMessage = new ElementBuilder({
          tag: "p",
          className: ["winners-list__empty"],
          textContent: "No winners yet"
        }).getElement();
        if (this.winnersContainer !== void 0) {
          while (this.winnersContainer.firstChild) {
            this.winnersContainer.firstChild.remove();
          }
          this.createGrid();
          this.winnersContainer.append(emptyMessage);
        }
      } else {
        const startIndex = (this.currentPage - 1) * WINNERS_PER_PAGE;
        const endIndex = Math.min(startIndex + WINNERS_PER_PAGE, this.winners.length);
        const winners = this.winners.slice(startIndex, endIndex);
        for (const [index, winner] of winners.entries()) {
          const car = this.findCar(winner.id);
          const winnerItem = new WinnerItem(winner, car, startIndex + index + 1);
          if (this.gridContainer !== void 0) {
            this.gridContainer.append(winnerItem.getElement());
          }
        }
      }
      this.updatePaginator();
    }
  }
  showPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateWinnersList();
    }
  }
  showNextPage() {
    const totalPages = Math.ceil(this.winners.length / WINNERS_PER_PAGE);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updateWinnersList();
    }
  }
  updatePaginator() {
    const totalPages = Math.ceil(this.winners.length / WINNERS_PER_PAGE);
    this.paginator.updatePageNumber(this.currentPage);
    if (this.currentPage === 1 || totalPages === 0) {
      this.paginator.prevButton.disable();
    } else {
      this.paginator.prevButton.enable();
    }
    if (this.currentPage === totalPages || totalPages === 0) {
      this.paginator.nextButton.disable();
    } else {
      this.paginator.nextButton.enable();
    }
  }
}
class Winners extends Component {
  constructor() {
    super({ tag: "main", className: "winners" });
    __publicField(this, "winnersList");
    this.winnersList = new WinnersList();
    this.render();
  }
  render() {
    const title = new ElementBuilder({
      tag: "h1",
      className: ["winners__title"],
      textContent: "Winners"
    }).getElement();
    this.container.append(title, this.winnersList.getElement());
  }
}
class App extends Component {
  constructor() {
    super({ tag: "div", className: "app" });
    __publicField(this, "header");
    __publicField(this, "garagePage");
    __publicField(this, "winnersPage");
    __publicField(this, "errorPage");
    __publicField(this, "footer");
    __publicField(this, "router");
    __publicField(this, "currentPage");
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
  render() {
    this.container.append(
      this.header.getElement(),
      this.currentPage.getElement(),
      this.footer.getElement()
    );
  }
  setupRoutes() {
    this.router.addRoute(Route.Garage, () => this.showGaragePage());
    this.router.addRoute(Route.Winners, () => this.showWinnersPage());
    this.router.addRoute(Route.Error, () => this.showErrorPage());
  }
  showGaragePage() {
    if (this.currentPage !== this.garagePage) {
      this.currentPage.getElement().remove();
      this.currentPage = this.garagePage;
      this.container.insertBefore(this.currentPage.getElement(), this.footer.getElement());
    }
  }
  showWinnersPage() {
    if (this.currentPage !== this.winnersPage) {
      this.currentPage.getElement().remove();
      if (this.winnersPage !== void 0) {
        this.currentPage = this.winnersPage;
      }
      this.container.insertBefore(this.currentPage.getElement(), this.footer.getElement());
    }
  }
  showErrorPage() {
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
const app = new App();
document.body.append(app.getElement());
//# sourceMappingURL=main-jDPIx3Cm.js.map
