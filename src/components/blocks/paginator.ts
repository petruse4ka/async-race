import type { ActionHandler } from '@/types/types';
import { ElementBuilder } from '@/utils/element-builder';

import { Component } from '../base/component';
import { NextButton } from '../buttons/next-button';
import { PreviousButton } from '../buttons/previous-button';

export class Paginator extends Component {
  public readonly prevButton: PreviousButton;
  public readonly nextButton: NextButton;
  private pageNumber: HTMLElement;
  private onPrevPage: ActionHandler;
  private onNextPage: ActionHandler;

  constructor(onPreviousPage: ActionHandler, onNextPage: ActionHandler) {
    super({ tag: 'div', className: 'paginator' });
    this.onPrevPage = onPreviousPage;
    this.onNextPage = onNextPage;
    this.pageNumber = new ElementBuilder({
      tag: 'span',
      className: 'paginator__page',
      textContent: 'Page #1',
    }).getElement();

    this.prevButton = new PreviousButton(() => this.showPreviousPage());
    this.nextButton = new NextButton(() => this.showNextPage());

    this.render();
  }

  public updatePageNumber(page: number): void {
    this.pageNumber.textContent = `Page #${page}`;
  }

  protected render(): void {
    this.container.append(
      this.prevButton.getElement(),
      this.pageNumber,
      this.nextButton.getElement()
    );
  }

  private showPreviousPage(): void {
    this.onPrevPage();
  }

  private showNextPage(): void {
    this.onNextPage();
  }
}
