import React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import ReactDOM from 'react-dom';

import ClappeContainer from './ClappeContainer';

export const store = observable({
  totalClapCount: null,
  clapCount: null,

  addClap: action(function addClap() {
    this.totalClapCount++;
    this.clapCount++;
  }),

  addSuperClap: action(function addSuperClap() {
    this.totalClapCount = this.totalClapCount + 50;
    this.clapCount = 50;
  }),

  undo: action(function undo() {
    this.totalClapCount = this.totalClapCount - 50;
    this.clapCount = 0;
  }),
});

export default class Clappe {
  constructor(html) {
    this.html = document.body.innerHTML;
  }

  getXsfrToken() {
    const tokenRegex = /"xsrfToken":"([a-zA-Z0-9]*)"/;
    return this.html.match(tokenRegex) && this.html.match(tokenRegex)[1];
  }

  getTotalClapCount() {
    const totalClapCountRegex = /"totalClapCount":([0-9]*)/;
    return (
      this.html.match(totalClapCountRegex) &&
      this.html.match(totalClapCountRegex)[1]
    );
  }

  getClapCount() {
    const clapCountRegex = /"clapCount":([0-9]*)/;
    return (
      this.html.match(clapCountRegex) && this.html.match(clapCountRegex)[1]
    );
  }

  getUserId() {
    const userIdRegex = /"userId":"([a-zA-Z0-9]*)"/;
    return this.html.match(userIdRegex) && this.html.match(userIdRegex)[1];
  }

  install() {
    store.totalClapCount = this.getTotalClapCount();
    store.clapCount = this.getClapCount();

    const clappeContainers = document.querySelectorAll(
      '.js-actionMultirecommend'
    );

    const clappeButtons = document.querySelectorAll(
      '.js-actionMultirecommendButton'
    );

    const clappeUndo = document.querySelectorAll('.js-clapUndo');
    [...clappeButtons].forEach(node =>
      node.addEventListener('click', () => store.addClap())
    );

    [...clappeUndo].forEach(node =>
      node.addEventListener('click', () => store.undo())
    );

    [...clappeContainers].map(node =>
      ReactDOM.render(
        <ClappeContainer
          xsfrToken={this.getXsfrToken()}
          userId={this.getUserId()}
          dataPostId={node.getAttribute('data-post-id')}
        />,
        node.appendChild(document.createElement('div'))
      )
    );
  }
}
