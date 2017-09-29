import React from 'react';
import { observable, action, toJS } from 'mobx';
import { observer } from 'mobx-react';
import ReactDOM from 'react-dom';

import {
  CLAP_LIMIT,
  CLAP_BUTTON_SELECTOR,
  CLAP_UNDO_BUTTON_SELECTOR,
  CLAP_CONTAINER_SELECTOR,
  CLAP_TYPE,
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
    this.superClick = this.superClick.bind(this);
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
    const mousedownEvent = new Event('mousedown', { bubbles: true });
    const mouseupEvent = new Event('mouseup', { bubbles: true });

    let clickCounter = 0;
    const clickLimit = CLAP_LIMIT - store.clapCount;

    function click() {
      node.dispatchEvent(mousedownEvent);

      setTimeout(function() {
        node.dispatchEvent(mouseupEvent);
        clickCounter++;

        if (clickCounter < clickLimit) {
          window.requestAnimationFrame(click);
        }
      });
    }

    window.requestAnimationFrame(click);
  }

  install() {
    store.totalClapCount = this.getTotalClapCount();
    store.clapCount = this.getClapCount();

    const clappeContainers = document.querySelectorAll(CLAP_CONTAINER_SELECTOR);
    const clappeButtons = document.querySelectorAll(CLAP_BUTTON_SELECTOR);
    const clappeUndo = document.querySelectorAll(CLAP_UNDO_BUTTON_SELECTOR);

    [...clappeButtons].forEach(node =>
      node.addEventListener('mousedown', () => store.addClap())
    );

    [...clappeUndo].forEach(node =>
      node.addEventListener('click', () => store.undo())
    );

    [...clappeContainers].forEach(node => {
      const clappeButton = node.querySelector(CLAP_BUTTON_SELECTOR);
      ReactDOM.render(
        <Clappe
          type={this.determineType(clappeButton)}
          node={clappeButton}
          superClick={this.superClick}
        />,
        node.appendChild(document.createElement('div'))
      );
    });
  }
}
