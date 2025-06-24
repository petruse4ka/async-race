import { AUTHOR_NAME, COPYRIGHT_TEXT, GITHUB_URL } from '@/constants/constants';
import { ElementBuilder } from '@/utils/element-builder';
import { LinkBuilder } from '@/utils/link-builder';

import { Component } from '../base/component';

export class Copyright extends Component {
  constructor() {
    super({ tag: 'div', className: 'footer__copyright' });
    this.render();
  }

  protected render(): void {
    const copyrightText = new ElementBuilder({
      tag: 'p',
      className: 'copyright__text',
      textContent: `${COPYRIGHT_TEXT} `,
    }).getElement();

    const githubLink = new LinkBuilder({
      tag: 'a',
      className: 'footer__link',
      textContent: AUTHOR_NAME,
      href: GITHUB_URL,
      target: '_blank',
    }).getElement();

    this.container.append(githubLink, copyrightText);
  }
}
