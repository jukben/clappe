import React from 'react';
import { observable, action, toJS } from 'mobx';
import { observer } from 'mobx-react';
import ReactDOM from 'react-dom';

import {
  CLAP_LIMIT,
  CLAP_BUTTON_SELECTOR,
  CLAP_UNDO_BUTTON_SELECTOR,
  CLAP_CONTAINER_SELECTOR,
  CLAP_COMMENTS_SELECTOR,
  CLAP_TYPE,
  CLAP_SOUND,
} from './constants';

import Clappe from './Clappe';

export const store = observable({
  totalClapCount: null,
  clapCount: null,

  addClap: action(function addClap() {
    if (this.clapCount >= CLAP_LIMIT) return;

    this.totalClapCount++;
    this.clapCount++;
  }),

  undo: action(function undo() {
    this.totalClapCount = this.totalClapCount - this.clapCount;
    this.clapCount = 0;
  }),
});

export default class ClappeDriver {
  constructor(html) {
    this.html = document.body.innerHTML;
  }

  getTotalClapCount() {
    const totalClapCountRegex = /"totalClapCount":([0-9]*)/;
    return (
      this.html.match(totalClapCountRegex) &&
      +this.html.match(totalClapCountRegex)[1]
    );
  }

  getClapCount() {
    const clapCountRegex = /"clapCount":([0-9]*)/;
    return (
      this.html.match(clapCountRegex) && +this.html.match(clapCountRegex)[1]
    );
  }

  determineType(node) {
    const type = node.getAttribute('data-action-source').match(/^([a-z_]*)/);

    return type ? type[1] : CLAP_TYPE.DISABLED;
  }

  superClick(node) {
    const mouseDownEvent = new Event('mousedown', { bubbles: true });
    const clickEvent = new Event('click', { bubbles: true });
    const mouseUpEvent = new Event('mouseup', { bubbles: true });

    let clickCounter = 0;
    const clickLimit = CLAP_LIMIT - store.clapCount;

    function click() {
      node.dispatchEvent(clickEvent);
      node.dispatchEvent(mouseDownEvent);

      setTimeout(function() {
        node.dispatchEvent(mouseUpEvent);
        clickCounter++;

        if (clickCounter < clickLimit) {
          window.requestAnimationFrame(click);
        }
      });
    }

    chrome.runtime.sendMessage({ sound: CLAP_SOUND.SUPER });
    window.requestAnimationFrame(click);
  }

  install() {
    store.totalClapCount = this.getTotalClapCount();
    store.clapCount = this.getClapCount();

    document.body.addEventListener('click', event => {
      let target = event.target;

      const containsFactory = node => (...classNames) => {
        return classNames.some(
          name => node.classList && node.classList.contains(name)
        );
      };

      while (target) {
        const contain = containsFactory(target);

        if (contain(CLAP_COMMENTS_SELECTOR, CLAP_BUTTON_SELECTOR)) {
          return chrome.runtime.sendMessage({ sound: CLAP_SOUND.NORMAL });
        }

        if (contain(CLAP_UNDO_BUTTON_SELECTOR)) {
          return store.undo();
        }

        target = target.parentNode;
      }
    });

    const clappeContainers = document.getElementsByClassName(
      CLAP_CONTAINER_SELECTOR
    );
    const clappeButtons = document.getElementsByClassName(CLAP_BUTTON_SELECTOR);

    [...clappeButtons].forEach(node =>
      node.addEventListener('mousedown', () => store.addClap())
    );

    [...clappeContainers].forEach(node => {
      const clappeButton = node.querySelector(`.${CLAP_BUTTON_SELECTOR}`);

      const app = node.appendChild(document.createElement('div'));
      app.classList.add('clappe');

      ReactDOM.render(
        <Clappe
          type={this.determineType(clappeButton)}
          node={clappeButton}
          superClick={this.superClick}
        />,
        app
      );
    });
  }
}
